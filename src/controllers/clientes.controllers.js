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
    const result = await pool.query("SELECT * FROM clientes WHERE id = ?", [id]);
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
        'INSERT INTO clientes (id, nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [id, nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia]
      );

      res.status(201).json({
          id,
          nombre,
          apellido,
          correo,
          celular,
          direccion,
          ciudad,
          pais,
          distrito,
          provincia
      });
  } catch (error) {
      console.error("Error al crear cliente:", error);
      return res.status(500).json({ message: 'Something goes wrong', error: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);

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
          "UPDATE clientes SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), correo = IFNULL(?, correo), celular = IFNULL(?, celular), direccion = IFNULL(?, direccion), ciudad = IFNULL(?, ciudad), pais = IFNULL(?, pais), distrito = IFNULL(?, distrito), provincia = IFNULL(?, provincia) WHERE id = ?",
          [nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia, id]
      );

      if (result.rowCount === 0) {
          return res.status(404).json({ message: "Cliente no encontrado" });
      }

      const updatedResult = await pool.query("SELECT * FROM clientes WHERE id = ?", [id]);
      const updatedCliente = updatedResult.rows[0];
      res.json(updatedCliente);

  } catch (error) {
      console.error("Error al actualizar cliente:", error);
      res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};