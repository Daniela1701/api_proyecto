import { Router } from "express";
import { getVentas, getVentaByDocAndDate, createVenta } from "../controllers/ventas.controllers.js";

const router = Router();

router.get("/", getVentas);
router.get("/buscar", getVentaByDocAndDate);
router.post("/", createVenta);

export default router;
