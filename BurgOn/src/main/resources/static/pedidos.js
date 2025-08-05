document.addEventListener('DOMContentLoaded', () => {
    const pedidoAtualCard = document.getElementById('pedido-atual-card');
    const historicoPedidosContainer = document.getElementById('historico-pedidos-container');
    const pedidoEmAndamentoSection = document.getElementById('pedido-em-andamento-section');

    // Simulação de dados (em um projeto real, viriam de uma API)
    const pedidoAtual = {
        id: 12345,
        status: 'preparando',
        data: '21/07/2024',
        total: 48.50,
        itens: [
            { nome: 'Hambúrguer Bacon', quantidade: 2 },
            { nome: 'Batata Frita', quantidade: 1 }
        ]
    };

    const historicoPedidos = [
        { id: 98765, data: '20/07/2024', total: 35.50, status: 'Entregue' },
        { id: 98764, data: '15/07/2024', total: 24.00, status: 'Entregue' }
    ];

    // Renderiza o pedido em andamento
    function renderPedidoAtual() {
        if (pedidoAtual && pedidoAtual.status !== 'entregue') {
            pedidoEmAndamentoSection.classList.remove('hidden');
            let statusText = '';
            let progress = 0;
            if (pedidoAtual.status === 'preparando') {
                statusText = 'Em Preparação';
                progress = 33;
            } else if (pedidoAtual.status === 'em-rota') {
                statusText = 'Em Rota de Entrega';
                progress = 66;
            }

            const pedidoAtualHtml = `
                        <h3 class="text-xl font-bold text-gray-800">Pedido #${pedidoAtual.id}</h3>
                        <p class="text-gray-600 mt-1">Status: <span class="font-bold">${statusText}</span></p>
                        <div class="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                            <div class="bg-red-500 h-2.5 rounded-full" style="width: ${progress}%"></div>
                        </div>
                        <ul class="mt-4 text-sm text-gray-600">
                            ${pedidoAtual.itens.map(item => `<li>${item.quantidade}x ${item.nome}</li>`).join('')}
                        </ul>
                    `;
            pedidoAtualCard.innerHTML = pedidoAtualHtml;
        } else {
            pedidoEmAndamentoSection.classList.add('hidden');
        }
    }

    // Renderiza o histórico de pedidos
    function renderHistoricoPedidos() {
        historicoPedidosContainer.innerHTML = '';
        if (historicoPedidos.length > 0) {
            historicoPedidos.forEach(pedido => {
                const pedidoCard = document.createElement('div');
                pedidoCard.className = 'bg-gray-50 p-4 rounded-lg shadow-sm';
                pedidoCard.innerHTML = `
                            <p class="font-bold text-gray-800">Pedido #${pedido.id} - <span class="text-sm text-gray-600">${pedido.data}</span></p>
                            <p class="text-gray-600">Total: R$ ${pedido.total.toFixed(2)}</p>
                            <p class="text-gray-600">Status: <span class="font-bold text-green-500">${pedido.status}</span></p>
                        `;
                historicoPedidosContainer.appendChild(pedidoCard);
            });
        } else {
            historicoPedidosContainer.innerHTML = '<p class="text-gray-500 text-center">Nenhum pedido anterior encontrado.</p>';
        }
    }

    // Chama as funções de renderização
    renderPedidoAtual();
    renderHistoricoPedidos();
});