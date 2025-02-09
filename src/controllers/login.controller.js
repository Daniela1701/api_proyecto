const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const config = require('../config');

const login = async (req, res) => {
    const { usuario, contraseña } = req.body;

    // Buscar el usuario en la base de datos
    const [rows] = await db.execute('SELECT * FROM administradores WHERE usuario = ?', [usuario]);

    if (rows.length === 0) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const usuarioEncontrado = rows[0];
    const esValida = await bcrypt.compare(contraseña, usuarioEncontrado.contraseña);

    if (!esValida) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: usuarioEncontrado.id }, config.secretKey, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
};

module.exports = { login };
