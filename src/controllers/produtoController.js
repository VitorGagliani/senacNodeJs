import * as produtoService from '../services/produtoService.js'
import Joi from 'joi'


export const produtoCreateSchema = Joi.object({
    idProduto: Joi.number().required(),
    nomeProduto: Joi.string().required().max(30),
    descricao: Joi.string().required().max(100),
    tipo: Joi.string().required().max(20),
    valor: Joi.number().required(),
    imagem: Joi.string().required().max(200)
})
 
export const produtoUpdateSchema = Joi.object({
    nomeProduto: Joi.string().max(30),
    descricao: Joi.string().max(100),
    tipo: Joi.string().max(20),
    valor: Joi.number(),
    imagem: Joi.string().max(200)
}).min(1);
 
export const listarProdutos = async (req, res) => {
    try {
        const { idProduto, nomeProduto, tipo } = req.query;

        const produtos = await produtoService.findAll(idProduto, nomeProduto, tipo);

        res.json(produtos);
    }
    catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
}

export const adicionarProduto = async (req, res) => {
    try {
        const novoProduto = await produtoService.criar(req.body);
        res.status(201).json({ message: 'Produto adicionado com sucesso', produto: novoProduto });
    } catch (err) {
        console.error('Erro ao adicionar produto:', err);
        res.status(500).json({ message: 'Erro ao adicionar produto' });
    }
}

export const atualizarProduto = async (req, res) => {
    try {
        const { idProduto } = req.params;
        const updated = await produtoService.update(req.body, idProduto);
        if (!updated){
            res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
}

export const removerProduto = async (req, res) => {
    try {
        const { idProduto } = req.params;
        const removed = await produtoService.remover(idProduto);
        if (!removed){
            res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto removido com sucesso' });
    } catch (err) {
        console.error('Erro ao remover produto:', err);
        res.status(500).json({ message: 'Erro ao remover produto' });
    }
}