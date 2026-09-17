import db from '../db/db.js';

export const findAll = async (idProduto, nomeProduto, tipo) => {
    let sql = 'SELECT * FROM produto';

    const conditions = [];
    const values = [];

    if(idProduto){
        conditions.push('idProduto = ?');
        values.push(idProduto);
    }

    if(nomeProduto){
        conditions.push('LOWER(nomeProduto) LIKE ?');
        values.push(`%${nomeProduto.toLowerCase()}%`);
    }

    if(tipo){
        conditions.push('tipo = ?');
        values.push(tipo);
    }

    if(conditions.length > 0){
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows;
}

export const criar = async (produtoData) => {
    const [result] = await db.query('INSERT INTO produto SET ?', produtoData);
    return produtoData;
}

export const update = async (produtoData, idProduto) => {
    const [result] = await db.query('UPDATE produto SET ? WHERE idProduto = ?', [produtoData, idProduto]);
    return result.affectedRows > 0;
}

export const remover = async (idProduto) => {
    const [result] = await db.query('DELETE FROM produto WHERE idProduto = ?', [idProduto]);
    return result.affectedRows > 0;
}