document.addEventListener('DOMContentLoaded', () => {
    const pedidosEmAndamentoContainer = document.getElementById('pedidos-em-andamento-container');
    const pedidosProntosContainer = document.getElementById('pedidos-prontos-container');
    const logoutBtn = document.getElementById('logout-btn');

    // Dados de pedidos simulados
    // Em um projeto real, estes dados seriam obtidos de uma API
    let pedidos = [
        {
            id: 1,
            status: 'preparando',
            itens: [
                { id: 1, nome: "Hambúrguer Clássico", quantidade: 2, status: 'pendente' },
                { id: 4, nome: "Batata Frita", quantidade: 1, status: 'pronto' }
            ]
        },
        {
            id: 2,
            status: 'preparando',
            itens: [
                { id: 7, nome: "Hambúrguer BBQ", quantidade: 1, status: 'pendente' },
                { id: 9, nome: "Suco de Laranja", quantidade: 1, status: 'pendente' }
            ]
        }
    ];

    // Função para renderizar os pedidos
    function renderPedidos() {
        pedidosEmAndamentoContainer.innerHTML = '';
        pedidosProntosContainer.innerHTML = '';

        pedidos.forEach(pedido => {
            const pedidoCard = document.createElement('div');
            pedidoCard.className = 'bg-gray-50 p-4 rounded-lg shadow-sm';
            pedidoCard.innerHTML = `
                        <h3 class="text-xl font-bold text-gray-800">Pedido #${pedido.id}</h3>
                        <ul class="mt-2 space-y-2" id="itens-pedido-${pedido.id}"></ul>
                    `;

            const itensList = pedidoCard.querySelector(`#itens-pedido-${pedido.id}`);
            let todosItensProntos = true;

            pedido.itens.forEach(item => {
                const itemLi = document.createElement('li');
                itemLi.className = 'flex items-center justify-between text-gray-600';
                itemLi.innerHTML = `
                            <span>${item.quantidade}x ${item.nome}</span>
                            <button class="status-btn bg-yellow-500 text-white py-1 px-3 rounded-lg text-sm transition duration-150" data-pedido-id="${pedido.id}" data-item-id="${item.id}" data-status="${item.status}">
                                ${item.status === 'pronto' ? 'Pronto' : 'Marcar como Pronto'}
                            </button>
                        `;
                itensList.appendChild(itemLi);

                if (item.status !== 'pronto') {
                    todosItensProntos = false;
                    itemLi.querySelector('.status-btn').classList.replace('bg-yellow-500', 'bg-green-500');
                } else {
                    itemLi.querySelector('.status-btn').classList.replace('bg-yellow-500', 'bg-gray-400');
                    itemLi.querySelector('.status-btn').disabled = true;
                }
            });

            if (todosItensProntos) {
                pedidosProntosContainer.appendChild(pedidoCard);
            } else {
                pedidosEmAndamentoContainer.appendChild(pedidoCard);
            }
        });
    }

    // Lógica para marcar um item como pronto
    function marcarItemComoPronto(pedidoId, itemId) {
        const pedido = pedidos.find(p => p.id === pedidoId);
        if (pedido) {
            const item = pedido.itens.find(i => i.id === itemId);
            if (item && item.status !== 'pronto') {
                item.status = 'pronto';
                // Em um projeto real, faria uma chamada PATCH para a API
                alert(`Item '${item.nome}' do Pedido #${pedido.id} marcado como pronto.`);
                renderPedidos();
            }
        }
    }

    // Adiciona o evento de click para os botões de status
    pedidosEmAndamentoContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.status-btn');
        if (button) {
            const pedidoId = parseInt(button.dataset.pedidoId);
            const itemId = parseInt(button.dataset.itemId);
            marcarItemComoPronto(pedidoId, itemId);
        }
    });

    // Evento para o botão de sair
    logoutBtn.addEventListener('click', () => {
        alert('A sair do painel do cozinheiro...');
        window.location.href = 'login.html'; // Redireciona para a tela de login unificada
    });

    // Chamada inicial para renderizar os pedidos
    renderPedidos();
});