import express from 'express';
import * as pedidoController from '../controllers/pedidoController.js';
import validate from '../middlewares/validate.js';
import {pedidoCreateSchema, pedidoUpdateSchema} from '../controllers/pedidoController.js';

const router = express.Router();


//rota de criar pedido

router.post('/', validate(pedidoCreateSchema), pedidoController.adicionarPedido);

//rota lista pedidos
router.get('/', pedidoController.listarPedidos);

//rota att pedido
router.put('/:idPedido', validate(pedidoUpdateSchema), pedidoController.atualizarPedido);

//rota deletar pedido
router.delete('/:idPedido', pedidoController.deletarPedido);

export default router;