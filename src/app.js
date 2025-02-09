import express from "express";
import cors from "cors";
import clientesRoutes from "./routes/clientes.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import reporteRoutes from "./routes/reporte.routes.js"
import loginRoutes from "./routes/login.routes.js";


const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/login', loginRoutes);

app.use("/api/clientes", clientesRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/reporte", reporteRoutes);


export default app;
