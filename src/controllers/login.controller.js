import { pool } from "../db.js"; 


export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(" Error en el servidor:", error.stack);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
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
      res.status(200).json({ success: true, redirect: "/inicio" }); 
  } else {
      res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
  }
  
  } catch (error) {
    console.error("Error en el servidor:", error.stack);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
