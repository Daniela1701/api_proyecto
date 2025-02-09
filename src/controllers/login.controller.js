import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js'; // Asegúrate de importar correctamente la conexión a la DB
import { SECRET_KEY } from '../config.js'; // Importar tu clave secreta desde el archivo config.js

const login = async (req, res) => {
  const { username, passwword } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const usuarioEncontrado = rows[0];
    const esValida = await bcrypt.compare(passwword, usuarioEncontrado.passwword);

    if (!esValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: usuarioEncontrado.id }, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    return res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};

export { login };
