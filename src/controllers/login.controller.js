import { pool } from "../db.js";

export const login = async (req, res) => {
  console.log("📌 Datos recibidos:", req.body); // 👀 Verifica los datos

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      return res.status(200).json({ message: "Inicio de sesión exitoso", redirect: "/inicio" });
    } else {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
  } catch (err) {
    console.error("❌ Error en el servidor:", err);
    return res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
};
