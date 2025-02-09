import express from "express";
import clientesRoutes from "./routes/clientes.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import reporteRoutes from "./routes/reporte.routes.js"
import dotenv from "dotenv";

dotenv.config();


const app = express();

app.use(express.json()); 

app.use("/api/clientes", clientesRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/reporte", reporteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


export default app;
