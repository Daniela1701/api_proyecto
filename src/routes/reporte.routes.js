import { Router } from "express";
import { getReporteByDocumento} from "../controller/reporte.controller.js";

const router = Router();

router.get('/:documento/:anio',getReporteByDocumento)

export default router;
