import fs from 'fs/promises';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/roommates.json');

export const getRoommates = async (req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const roommates = JSON.parse(data);
        res.status(200).json(roommates);
    } catch (error) {
        res.status(500).json({ error: 'Error reading roommates file' });
    }
};

export const addRoommate = async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api');
        const newUser = response.data.results[0];
        const newRoommate = {
            id: uuidv4(),
            nombre: `${newUser.name.first} ${newUser.name.last}`,
            debe: 0,
            recibe: 0
        };

        const data = await fs.readFile(filePath, 'utf8');
        const roommates = JSON.parse(data);
        roommates.push(newRoommate);

        await fs.writeFile(filePath, JSON.stringify(roommates, null, 2), 'utf8');
        res.status(201).json(newRoommate);
    } catch (error) {
        res.status(500).json({ error: 'Error adding new roommate' });
    }
};
