import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT username, password FROM usuarios");
    res.json(result.rows); 
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length > 0) {
      res.status(200).json({ message: "Inicio de sesión exitoso", redirect: "/inicio" });
    } else {
      res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
