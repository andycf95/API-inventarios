import 'dotenv/config';     
import express from 'express';
import cors from 'cors';
import connectDB from './middleware/db.js';
import itemRoutes from './routes/itemroutes.js';

// ── Conectar a MongoDB ──────────────────────────────────
connectDB();

// ── Crear la app Express ────────────────────────────────
const app = express();

// ── Middleware global ───────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Rutas de la API ─────────────────────────────────────
app.use('/api/items', itemRoutes);

// ── Ruta raíz informativa ───────────────────────────────
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

// ── Ruta no encontrada ──────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ ok: false, error: `Ruta ${req.originalUrl} no existe` });
});

// ── Iniciar servidor ────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});