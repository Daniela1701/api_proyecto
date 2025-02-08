import { pool } from "../db.js";  


export const getClientes = async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT * FROM clientes');
      res.json(rows);
  } catch (error) {
      return res.status(500).json({
          message: 'Something goes wrong'
      });
  }
};

export const getClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const [cliente] = await pool.query("SELECT * FROM clientes WHERE id = ?", [id]);

    if (cliente.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(200).json(cliente[0]); 
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente" });
  }
};

export const createCliente = async (req, res) => {
  const { numero_documento, nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia } = req.body;

  try {
      const [rows] = await pool.query('INSERT INTO clientes (numero_doc, nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [numero_documento, nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia]);

      res.status(201).json({
          id: rows.insertId,
          numero_documento,
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
      return res.status(500).json({
          message: 'Something goes wrong'
      });
  }
};


export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'Cliente not found',
      });

    res.sendStatus(204); // No Content
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};

export const updateCliente = async (req, res) => {
  const { numero_doc } = req.params;
  const { nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia } = req.body;

  try {
      const [result] = await pool.query('UPDATE clientes SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), correo = IFNULL(?, correo), celular = IFNULL(?, celular), direccion = IFNULL(?, direccion), ciudad = IFNULL(?, ciudad), pais = IFNULL(?, pais), distrito = IFNULL(?, distrito), provincia = IFNULL(?, provincia) WHERE numero_doc = ?',
      [nombre, apellido, correo, celular, direccion, ciudad, pais, distrito, provincia, numero_doc]);

      if (result.affectedRows === 0) return res.status(404).json({
          message: 'Cliente no encontrado'
      });

      const [rows] = await pool.query('SELECT * FROM clientes WHERE numero_doc = ?', [numero_doc]);

      res.json(rows[0]);
  } catch (error) {
      return res.status(500).json({
          message: 'Something goes wrong'
      });
  }
};