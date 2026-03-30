import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: [true, 'El nombre es obligatorio'], trim: true },
        precio: { type: Number, required: [true, 'El precio es obligatorio'], min: 0 },
        stock:  { type: Number, default: 0, min: 0 },
        activo: { type: Boolean, default: true },
    },
    { timestamps: true, versionKey: false }
    );

const Item = mongoose.model('Item', itemSchema);

export default Item;
