const filaDePedidos = require('./fila');

// Adicione pedidos à fila
filaDePedidos.add({
  numero: 1001,
  itens: ['Produto A', 'Produto B', 'Produto C']
});

filaDePedidos.add({
  numero: 1002,
  itens: ['Produto X', 'Produto Y']
});

filaDePedidos.add({
  numero: 1003,
  itens: ['Produto Z']
});

// Escute o evento 'completed' para lidar com tarefas concluídas
filaDePedidos.on('completed', (job, resultado) => {
  console.log(`Pedido ${job.data.numero} concluído. Resultado:`, resultado);
});

// Escute o evento 'failed' para lidar com falhas
filaDePedidos.on('failed', (job, erro) => {
  console.error(`Pedido ${job.data.numero} falhou:`, erro);
});
