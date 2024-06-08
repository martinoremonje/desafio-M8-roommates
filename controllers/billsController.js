import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gastosPath = path.join(__dirname, '../data/gastos.json');
const roommatesPath = path.join(__dirname, '../data/roommates.json');

export const getGastos = async (req, res) => {
    try {
        const data = await fs.readFile(gastosPath, 'utf8');
        const gastos = JSON.parse(data);
        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ error: 'Error reading gastos file' });
    }
};

export const addGasto = async (req, res) => {
    try {
        const { roommate, descripcion, monto } = req.body;
        const newGasto = {
            id: uuidv4(),
            roommate,
            descripcion,
            monto
        };

        const gastosData = await fs.readFile(gastosPath, 'utf8');
        const gastos = JSON.parse(gastosData);
        gastos.push(newGasto);

        await fs.writeFile(gastosPath, JSON.stringify(gastos, null, 2), 'utf8');
        await updateRoommatesBalances(roommate, monto, 'add');

        

        res.status(201).json(newGasto);
    } catch (error) {
        res.status(500).json({ error: 'Error adding new gasto' });
    }
};

export const updateGasto = async (req, res) => {
    try {
        const { id, roommate, descripcion, monto } = req.body;
        const gastosData = await fs.readFile(gastosPath, 'utf8');
        const gastos = JSON.parse(gastosData);

        const gastoIndex = gastos.findIndex(g => g.id === id);
        if (gastoIndex !== -1) {
            const oldMonto = gastos[gastoIndex].monto;
            gastos[gastoIndex] = { id, roommate, descripcion, monto };

            await fs.writeFile(gastosPath, JSON.stringify(gastos, null, 2), 'utf8');
            await updateRoommatesBalances(roommate, oldMonto, 'subtract');
            await updateRoommatesBalances(roommate, monto, 'add');

            res.status(200).json(gastos[gastoIndex]);
        } else {
            res.status(404).json({ error: 'Gasto not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating gasto' });
    }
};

export const deleteGasto = async (req, res) => {
    try {
        const { id } = req.query;
        const gastosData = await fs.readFile(gastosPath, 'utf8');
        const gastos = JSON.parse(gastosData);

        const gastoIndex = gastos.findIndex(g => g.id === id);
        if (gastoIndex !== -1) {
            const { roommate, monto } = gastos[gastoIndex];
            gastos.splice(gastoIndex, 1);

            await fs.writeFile(gastosPath, JSON.stringify(gastos, null, 2), 'utf8');
            await updateRoommatesBalances(roommate, monto, 'subtract');

            res.status(200).json({ message: 'Gasto deleted' });
        } else {
            res.status(404).json({ error: 'Gasto not found' });
        }
    } catch (error) {
        res.status500().json({ error: 'Error deleting gasto' });
    }
};

const updateRoommatesBalances = async (roommate, monto, action) => {
    const roommatesData = await fs.readFile(roommatesPath, 'utf8');
    const roommates = JSON.parse(roommatesData);

    const roommateIndex = roommates.findIndex(r => r.nombre === roommate);
    if (roommateIndex !== -1) {
        if (action === 'add') {
            roommates[roommateIndex].debe = Math.round(roommates[roommateIndex].debe + monto);
            roommates.forEach((r, index) => {
                if (index !== roommateIndex) {
                    r.recibe = Math.round(r.recibe + monto / (roommates.length - 1));
                }
            });
        } else if (action === 'subtract') {
            roommates[roommateIndex].debe = Math.round(roommates[roommateIndex].debe - monto);
            roommates.forEach((r, index) => {
                if (index !== roommateIndex) {
                    r.recibe = Math.round(r.recibe - monto / (roommates.length - 1));
                }
            });
        }
        await fs.writeFile(roommatesPath, JSON.stringify(roommates, null, 2), 'utf8');

        
    }
};
