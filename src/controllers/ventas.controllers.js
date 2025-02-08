import { pool } from "../db.js";

// Obtener todas las ventas
export const getVentas = async (req, res) => {
  const [ventas] = await pool.query("SELECT * FROM ventas");
  res.json(ventas);
};

// Obtener una venta por número de documento y fecha
export const getVentaByDocAndDate = async (req, res) => {
  const { numero_documento, fecha } = req.query;
  const [ventas] = await pool.query("SELECT * FROM ventas WHERE numero_documento = ? AND DATE(fecha) = ?", [numero_documento, fecha]);

  if (ventas.length === 0) return res.status(404).json({ message: "Venta no encontrada" });

  res.json(ventas);
};

// Crear una venta
export const createVenta = async (req, res) => {
  const { numero_documento, email, telefono, tipo_servicio, turno, tipo_sesion, horario, estado } = req.body;
  const query = `INSERT INTO ventas (numero_documento, email, telefono, tipo_servicio, turno, tipo_sesion, horario, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  await pool.query(query, [numero_documento, email, telefono, tipo_servicio, turno, tipo_sesion, horario, estado]);

  res.status(201).json({ message: "Venta registrada" });
};
