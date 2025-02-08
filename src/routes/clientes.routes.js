import { Router } from "express";
import { 
  getClientes, 
  getCliente, 
  createCliente, 
  deleteCliente, 
  updateCliente
} from "../controllers/clientes.controllers.js";

const router = Router();

router.get("/:id", getClientes);

router.get("/:id", getCliente);

router.post("/", createCliente);

router.delete("/:id", deleteCliente);

router.put( "/:id", updateCliente);

export default router;
