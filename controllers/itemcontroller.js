import Item from "../models/item.js";

// Listar todos
export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ activo: true }).sort({ createdAt: -1 });
    res.json({ ok: true, data: items, total: items.length });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error al obtener los items" });
  }
};

// Obtener uno
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item || !item.activo) {
      return res.status(404).json({ ok: false, error: "Item no encontrado" });
    }
    res.json({ ok: true, data: item });
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ ok: false, error: "ID con formato inválido" });
    }
    res.status(500).json({ ok: false, error: "Error al obtener el item" });
  }
};

// Crear
export const createItem = async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;
    const nuevoItem = await Item.create({ nombre, precio, stock });
    res.status(201).json({ ok: true, data: nuevoItem });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errores = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ ok: false, errores });
    }
    res.status(500).json({ ok: false, error: "Error al crear el item" });
  }
};

//  Actualizar
export const updateItem = async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { nombre, precio, stock },
      { new: true, runValidators: true },
    );
    if (!item) {
      return res.status(404).json({ ok: false, error: "Item no encontrado" });
    }
    res.json({ ok: true, data: item });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errores = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ ok: false, errores });
    }
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ ok: false, error: "ID con formato inválido" });
    }
    res.status(500).json({ ok: false, error: "Error al actualizar el item" });
  }
};

// ──  Eliminar 
export const deleteItem = async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ ok: false, error: 'No encontrado' });
  res.json({ ok: true, mensaje: 'Item eliminado' });
};
