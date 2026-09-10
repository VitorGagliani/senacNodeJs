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
}).min(1)


export const listarClientes = async (req, res) => {
try{
    const {cpf, nome, email } = req.query;

    const clientes = await clienteService.findAll(cpf, nome, email);

    res.json(clientes)
} catch(err){
    console.log(`Erro ao buscar clientes: `, err);
    
}
}