const Queue = require('bull');

// Crie uma nova fila chamada "processamento-de-pedidos"
const filaDePedidos = new Queue('processamento-de-pedidos', {
  redis: {
    port: 6379,
    host: 'localhost',
  }
});

// Adicione um processador para a fila
filaDePedidos.process(async (job) => {
  console.log(`Processando pedido ${job.data.numero}:`, job.data.itens);
  // Simule um processamento assíncrono
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { resultado: 'Pedido processado com sucesso' };
});

module.exports = filaDePedidos;
