function fazerPizzas(sabor) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Pizza de ${sabor} pronta`)
        }, 5000);
    }
    )
}
export async function pedirPizza() {
    console.log(`Pedido enviado para a cozinha`);
    try{
        const pedidoDaPizza = await fazerPizzas(`Frango`)
        console.log(`Chegou a ${pedidoDaPizza}`);
    }catch(error){
        console.log(`Sem ingredientes`);
        
    }
}