import express from 'express';
import * as clienteController from '../controllers/clienteController.js';
import validate from '../middlewares/validate.js';
import {clienteCreateSchema, clienteUpdateSchema} from '../controllers/clienteController.js';
//import authMiddleware from '../middlewares/authMiddlewares.js';

const router = express.Router();

//rota de criar cliente

router.post('/', validate(clienteCreateSchema), clienteController.adicionarCliente);


//rotas privadas
//

//router.use(authMiddleware); --- //tudo abaixo dessa linha se torna rota privada

router.get('/', clienteController.listarClientes);


//PUT cliente/:cpf
router.put('/:cpf', validate(clienteUpdateSchema), clienteController.atualizarCliente);

router.delete('/:cpf', clienteController.deletarCliente);

export default router;