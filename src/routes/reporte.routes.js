import { Router } from "express";
import { getReporteByDocumento} from "../controller/reporte.controller.js";

const router = Router();

router.get('/reporte/:documento/:anio',getReporteByDocumento)

export default router;
