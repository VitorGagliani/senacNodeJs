import express from 'express';
import * as produtoController from '../controllers/produtoController.js';
import validate from '../middlewares/validate.js';
import {produtoCreateSchema, produtoUpdateSchema} from '../controllers/produtoController.js';

const router = express.Router();


//rota de criar produto
router.post('/', validate(produtoCreateSchema), produtoController.adicionarProduto);

//rota lista produtos
router.get('/', produtoController.listarProdutos);

//rota att produto
router.put('/:idProduto', validate(produtoUpdateSchema), produtoController.atualizarProduto);

//rota deletar produto
router.delete('/:idProduto', produtoController.removerProduto);

export default router;