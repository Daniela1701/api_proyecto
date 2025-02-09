import { pool } from "../db.js";  // Importamos la conexión a la base de datos

// Función que maneja la solicitud GET para obtener el reporte del cliente
export const obtenerReporteCliente = async (req, res) => {
  const { clienteId, fechaVenta } = req.query;  // Obtenemos los parámetros de la consulta (ID del cliente y fecha de la venta)

  // Verificamos que se hayan recibido ambos parámetros
  if (!clienteId || !fechaVenta) {
    return res.status(400).json({ message: "Faltan parámetros: clienteId y fechaVenta" });
  }

  try {
    // Realizamos la consulta a la base de datos para obtener los detalles del cliente y la venta
    const result = await pool.query(`
      SELECT 
        c.numero_documento, 
        CONCAT(c.nombre, ' ', c.apellido) AS cliente,
        c.email,
        c.telefono,
        v.servicio, 
        v.turno, 
        v.tipo_sesion AS tipo,
        v.horario,
        v.estado,
        v.monto,
        v.fecha_pago,
        v.medio_pago
      FROM clientes c
      JOIN ventas v ON c.numero_documento = v.numero_documento
      WHERE c.numero_documento = $1 AND v.fecha_venta = $2
    `, [clienteId, fechaVenta]);

    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron datos para el cliente y la fecha proporcionados." });
    }

    // Respondemos con los datos obtenidos
    res.json(rows); 
  } catch (error) {
    // Si hay un error en la consulta, respondemos con un error 500
    console.error("Error al obtener el reporte del cliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};