import { Router } from "express";
import { 
  getClientes, 
  getClienteById,
  createCliente, 
  deleteCliente, 
  updateCliente
} from "../controllers/clientes.controllers.js";

const router = Router();

router.get("/", getClientes);

router.get("/:id", getClienteById );

router.post("/", createCliente);

router.delete("/:id", deleteCliente);

router.put( "/:id", updateCliente);

export default router;
