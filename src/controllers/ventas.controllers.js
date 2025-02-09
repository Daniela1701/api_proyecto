import { pool } from "../db.js";

export const getVentas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ventas");
    const rows = result.rows;
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    res.status(500).json({ message: "Error al obtener las ventas", error: error.message });
  }
};

export const getVentaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM ventas WHERE id = $1", [id]);
    const rows = result.rows;
    if (rows.length === 0) return res.status(404).json({ message: "Venta no encontrada" });
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener la venta:", error);
    res.status(500).json({ message: "Error al obtener la venta", error: error.message });
  }
};

export const createVenta = async (req, res) => {
  const { cliente_id, tipo_servicio, turno, tipo_sesion, horario, estado, monto_pago, fecha_pago, medio_pago } = req.body;
  
  try {
    const result = await pool.query(
      "INSERT INTO ventas (cliente_id, tipo_servicio, turno, tipo_sesion, horario, estado, monto_pago, fecha_pago, medio_pago) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [cliente_id, tipo_servicio, turno, tipo_sesion, horario, estado, monto_pago, fecha_pago, medio_pago]
    );

    const newVenta = result.rows[0];
    res.status(201).json(newVenta);
  } catch (error) {
    console.error("Error al registrar la venta:", error);
    res.status(500).json({ message: "Error al registrar la venta", error: error.message });
  }
};

export const updateVenta = async (req, res) => {
  const { id } = req.params;
  const { cliente_id, tipo_servicio, turno, tipo_sesion, horario, estado, monto_pago, fecha_pago, medio_pago } = req.body;

  try {
    const result = await pool.query(
      "UPDATE ventas SET cliente_id = COALESCE($1, cliente_id), tipo_servicio = COALESCE($2, tipo_servicio), turno = COALESCE($3, turno), tipo_sesion = COALESCE($4, tipo_sesion), horario = COALESCE($5, horario), estado = COALESCE($6, estado), monto_pago = COALESCE($7, monto_pago), fecha_pago = COALESCE($8, fecha_pago), medio_pago = COALESCE($9, medio_pago) WHERE id = $10 RETURNING *",
      [cliente_id, tipo_servicio, turno, tipo_sesion, horario, estado, monto_pago, fecha_pago, medio_pago, id]
    );

    if (result.rowCount === 0) return res.status(404).json({ message: "Venta no encontrada" });

    const updatedVenta = result.rows[0];
    res.json(updatedVenta);
  } catch (error) {
    console.error("Error al actualizar la venta:", error);
    res.status(500).json({ message: "Error al actualizar la venta", error: error.message });
  }
};

export const deleteVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM ventas WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: "Venta no encontrada" });
    res.sendStatus(204); 
  } catch (error) {
    console.error("Error al eliminar la venta:", error);
    res.status(500).json({ message: "Error al eliminar la venta", error: error.message });
  }
};