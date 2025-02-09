import express from "express";
import cors from "cors";
import clientesRoutes from "./routes/clientes.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import reporteRoutes from "./routes/reporte.routes.js"
import bcrypt from "bcrypt";
import { pool } from "./db.js"; 
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

app.post('/login', async (req, res) => {
    const { usuario, contraseña } = req.body;
  
    if (!usuario || !contraseña) {
        return res.status(400).json({ message: 'Por favor ingrese ambos campos.' });
    }
  
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
  
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });
        }
  
        const usuarioEncontrado = result.rows[0];
        const esValido = await bcrypt.compare(contraseña, usuarioEncontrado.contraseña);
  
        if (esValido) {
            return res.json({ message: '¡Bienvenido!', redirectTo: '/inicio' }); // Indicar que el inicio de sesión fue exitoso
        } else {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
  });

app.use("/api/clientes", clientesRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/reporte", reporteRoutes);


export default app;
