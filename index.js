import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

import roommatesRoutes from './routes/roommatesRoutes.js';
import gastosRoutes from './routes/billsRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/roommates', roommatesRoutes);
app.use('/gastos', gastosRoutes);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});



app.listen(PORT, console.log(`Servidor corriendo en: http://localhost:${PORT}`));