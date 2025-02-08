import express from "express";
import clientesRoutes from "./routes/clientes.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";

const app = express();

app.use(express.json()); 
app.use("/api/clientes", clientesRoutes);
app.use("/api/ventas", ventasRoutes);

export default app;
