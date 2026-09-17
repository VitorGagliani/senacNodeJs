import db from '../db/db.js';

export const findAll = async (idPedido, cpf, idEntregador, statusPedido ) => {
    let sql = 'SELECT * FROM pedido';

    const conditions = [];
    const values = [];

    if (idPedido) {
        conditions.push('idPedido = ?');
        values.push(idPedido);
    }

    if (cpf) {
        conditions.push('cpf = ?');
        values.push(cpf);
    }

    if (idEntregador) {
        conditions.push('idEntregador = ?');
        values.push(idEntregador);
    }

    if (statusPedido) {
        conditions.push('statusPedido = ?');
        values.push(statusPedido);
    }

    if(conditions.length > 0){
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows;

}

export const create = async (pedidoData) => {
    const [result] = await db.query('INSERT INTO pedido SET ?', pedidoData);
    return pedidoData;
}

export const update = async (pedidoData, idPedido) => {
    const [result] = await db.query('UPDATE pedido SET ? WHERE idPedido = ?', [pedidoData, idPedido]);
    return result.affectedRows > 0;
}

export const remove = async (idPedido) => {
    const [result] = await db.query('DELETE FROM pedido WHERE idPedido = ?', [idPedido]);
    return result.affectedRows > 0;
}