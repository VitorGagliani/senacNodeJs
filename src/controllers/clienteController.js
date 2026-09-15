import * as clienteService from '../services/clienteService.js'
import Joi from 'joi'

export const clienteCreateSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    nome: Joi.string().required().max(100),
    endereco: Joi.string().required().max(100),
    bairro: Joi.string().max(30),
    cidade: Joi.string().max(30),
    cep: Joi.string().length(8).required(),
    telefone: Joi.number().required(),
    email: Joi.string().required().max(50),
    senha: Joi.string().required().max(100),
    tipo: Joi.string().required().max(10)
});
 
export const clienteUpdateSchema = Joi.object({
    nome: Joi.string().max(100),
    endereco: Joi.string().max(100),
    bairro: Joi.string().max(30),
    cidade: Joi.string().max(30),
    cep: Joi.string().length(8),
    telefone: Joi.number(),
    email: Joi.string().max(50),
    senha: Joi.string().max(100)
}).min(1);
 


export const listarClientes = async (req, res) => {
try{
    const {cpf, nome, email } = req.query;

    const clientes = await clienteService.findAll(cpf, nome, email);

    res.json(clientes)
} catch(err){
    console.log(`Erro ao buscar clientes: `, err);
    
}
}

export const adicionarCliente = async (req, res) => {
    try {
        const novoCliente = await clienteService.create(req.body);
        res.status(201).json({message: 'Cliente adicionado com sucesso', cliente: novoCliente});
    } catch (err) {
        console.error('Erro ao adicionar cliente:', err);
        if(err.code === 'ER_DUP_ENTRY'){
            res.status(409).json({message: 'Cliente já cadastrado'});
        }
    }
        res.status(500).json({message: 'Erro ao adicionar cliente'});
}

export const atualizarCliente = async (req, res) => {
    try {
        const { cpf } = req.params;
        const updated = await clienteService.update(cpf, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(200).json({ message: 'Cliente atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
}

export const deletarCliente = async (req, res) => {
    try {
        const { cpf } = req.params;
        const deleted = await clienteService.remove(cpf);
        if (!deleted) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(200).json({ message: 'Cliente deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
}

