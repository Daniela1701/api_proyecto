import { pool } from "../db.js";

export const getClientes = async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM clientes');
      const rows = result.rows;
      res.json(rows);
  } catch (error) {
      console.error("Error al obtener clientes:", error);
      return res.status(500).json({
          message: 'Something goes wrong',
          error: error.message
      });
  }
};

export const getClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
    const rows = result.rows;

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    res.status(500).json({ message: "Error al obtener el cliente", error: error.message });
  }
};

export const createCliente = async (req, res) => {
  const { id, nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia } = req.body;

  try {
      const result = await pool.query(
        'INSERT INTO clientes (id, nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', 
        [id, nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia]
      );

      const newCliente = result.rows[0];
      res.status(201).json(newCliente);
  } catch (error) {
      console.error("Error al crear cliente:", error);
      return res.status(500).json({ message: 'Something goes wrong', error: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: 'Cliente not found',
      });

    res.sendStatus(204); 
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return res.status(500).json({
      message: 'Something goes wrong',
      error: error.message
    });
  }
};

export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia } = req.body;

  try {
      const result = await pool.query(
          "UPDATE clientes SET nombre = COALESCE($1, nombre), apellido = COALESCE($2, apellido), correo = COALESCE($3, correo), celular = COALESCE($4, celular), direccion = COALESCE($5, direccion), ciudad = COALESCE($6, ciudad), pais = COALESCE($7, pais), distrito = COALESCE($8, distrito), provincia = COALESCE($9, provincia) WHERE id = $10 RETURNING *",
          [nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia, id]
      );

      if (result.rowCount === 0) {
          return res.status(404).json({ message: "Cliente no encontrado" });
      }

      const updatedCliente = result.rows[0];
      res.json(updatedCliente);

  } catch (error) {
      console.error("Error al actualizar cliente:", error);
      res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};