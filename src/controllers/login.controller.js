const bcrypt = require('bcrypt');
const db = require('../db');

const login = async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  try {
    // Verificar si el usuario existe
    const query = 'SELECT * FROM administradores WHERE user = ?';
    const [rows] = await db.execute(query, [user]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const admin = rows[0];

    // Comparar la contraseña con bcrypt
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si la autenticación es exitosa
    res.status(200).json({ message: 'Autenticación exitosa' });

  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

module.exports = { login };
