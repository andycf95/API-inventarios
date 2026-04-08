import 'dotenv/config';     
import express from 'express';
import connectDB from './middleware/db.js';
import itemRoutes from './routes/itemroutes.js';

//Conectar a MongoDB
connectDB();

//Crear la app Express
export const app = express();

app.use(express.json());

//Ruta de appis
app.use('/api/items', itemRoutes);

//Ruta raiz - informacion basica
app.get('/', (req, res) => {
    res.json({
    servicio: 'CRUD API — Node.js + Express + MongoDB (ESM)',
    version: '1.0',
    endpoints: {
        'GET    /api/items':     'Listar todos',
        'GET    /api/items/:id': 'Obtener uno',
        'POST   /api/items':     'Crear',
        'PUT    /api/items/:id': 'Actualizar',
        'DELETE /api/items/:id': 'Eliminar',
    },
    });
});

//Si la rut ano existe
app.use((req, res) => {
    res.status(404).json({ ok: false, error: `Ruta ${req.originalUrl} no existe` });
});

//para iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});