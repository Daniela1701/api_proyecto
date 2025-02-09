import { Router } from "express";
import { getReporteByDocumento} from "../controllers/reporte.controller.js";

const router = Router();

router.get('/:documento/:anio',getReporteByDocumento)

export default router;
