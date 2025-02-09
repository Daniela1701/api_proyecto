import { pool } from "../db.js";

export const getVentas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ventas");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las ventas" });
  }
};

export const getVentaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM ventas WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Venta no encontrada" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la venta" });
  }
};

export const createVenta = async (req, res) => {
  const { cliente_id, tipo_servicio, turno, tipo_sesion, horario, estado, monto_pago, fecha_pago, medio_pago } = req.body;
  
  try {
    const [result] = await pool.query(
      "INSERT INTO ventas (cliente_id, tipo_servicio, turno, tipo_sesion, horario, estado, monto_pago, fecha_pago, medio_pago) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [cliente_id, tipo_servicio, turno, tipo_sesion, horario, estado, monto_pago, fecha_pago, medio_pago]
    );

    res.status(201).json({ id: result.insertId, message: "Venta registrada correctamente" });

  } catch (error) {
    console.error("Error al registrar la venta:", error);
    res.status(500).json({ message: "Error al registrar la venta" });
  }
};


export const updateVenta = async (req, res) => {
  const { id } = req.params;
  const { tipo_servicio, turno, tipo_sesion, horario, estado, monto_pago, fecha_pago, medio_pago } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE ventas SET tipo_servicio = IFNULL(?, tipo_servicio), turno = IFNULL(?, turno), tipo_sesion = IFNULL(?, tipo_sesion), horario = IFNULL(?, horario), estado = IFNULL(?, estado), monto_pago = IFNULL(?, monto_pago), fecha_pago = IFNULL(?, fecha_pago), medio_pago = IFNULL(?, medio_pago) WHERE id = ?",
      [tipo_servicio, turno, tipo_sesion, horario, estado, monto_pago, fecha_pago, medio_pago, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Venta no encontrada" });

    const [venta] = await pool.query("SELECT * FROM ventas WHERE id = ?", [id]);
    res.json(venta[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la venta" });
  }
};


export const deleteVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM ventas WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Venta no encontrada" });
    res.sendStatus(204); 
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la venta" });
  }
};
