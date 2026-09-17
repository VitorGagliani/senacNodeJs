import * as pedidoService from '../services/pedidoService.js';
import Joi from 'joi'


export const pedidoCreateSchema = Joi.object({
    idPedido: Joi.number().required(),
    formaPagto: Joi.string().required().max(10),
    valorTotal: Joi.number().required(),
    idEntregador: Joi.number().required(),
    cpf: Joi.string().length(11).required(),
    statusPedido: Joi.string().required().max(20),
    formaEntrega: Joi.string().required().max(15)
});

export const pedidoUpdateSchema = Joi.object({
    formaPagto: Joi.string().max(10),
    valorTotal: Joi.number(),
    idEntregador: Joi.number(),
    cpf: Joi.string().length(11),
    statusPedido: Joi.string().max(20),
    formaEntrega: Joi.string().max(15)
}).min(1);


export const listarPedidos = async (req, res) => {
    try {
        const { idPedido, cpf, idEntregador, statusPedido } = req.query;

        const pedidos = await pedidoService.findAll(idPedido, cpf, idEntregador, statusPedido);

        res.json(pedidos);
    } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
        res.status(500).json({ message: 'Erro ao buscar pedidos' });
    }
}

export const adicionarPedido = async (req, res) => {
    try {
        const novoPedido = await pedidoService.create(req.body);
        res.status(201).json({ message: 'Pedido adicionado com sucesso', pedido: novoPedido });
    } catch (err) {
        console.error('Erro ao adicionar pedido:', err);
        res.status(500).json({ message: 'Erro ao adicionar pedido' });
    }
}

export const atualizarPedido = async (req, res) => {
    try {
        const { idPedido } = req.params;
        const updated = await pedidoService.update(idPedido, req.body);
        if (!updated){
            res.status(404).json({ message: 'Pedido não encontrado' });
        }

        res.status(200).json({ message: 'Pedido atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar pedido:', err);
        res.status(500).json({ message: 'Erro ao atualizar pedido' }); 
    }
}

export const deletarPedido = async (req, res) => {
    try {
        const { idPedido } = req.params;
        const deleted = await pedidoService.remove(idPedido);
        if (!deleted){
            res.status(404).json({ message: 'Pedido não encontrado' });
        }

        res.status(200).json({ message: 'Pedido deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar pedido:', err);
        res.status(500).json({ message: 'Erro ao deletar pedido' }); 
    }
}