document.addEventListener('DOMContentLoaded', () => {
    const pedidosRetiradaContainer = document.getElementById('pedidos-retirada-container');
    const pedidosEmRotaContainer = document.getElementById('pedidos-em-rota-container');
    const logoutBtn = document.getElementById('logout-btn');

    // Dados de pedidos simulados para o entregador
    let pedidos = [
        {
            id: 1,
            status: 'pronto',
            endereco: 'Rua das Flores, 123',
            cliente: 'João Silva',
            itens: [{ nome: "Hambúrguer Clássico", quantidade: 2 }, { nome: "Batata Frita", quantidade: 1 }]
        },
        {
            id: 2,
            status: 'em-rota',
            endereco: 'Avenida Principal, 456',
            cliente: 'Maria Oliveira',
            itens: [{ nome: "Hambúrguer BBQ", quantidade: 1 }, { nome: "Suco de Laranja", quantidade: 1 }]
        }
    ];

    // Função para renderizar os pedidos nas colunas corretas
    function renderPedidos() {
        pedidosRetiradaContainer.innerHTML = '';
        pedidosEmRotaContainer.innerHTML = '';

        pedidos.forEach(pedido => {
            const pedidoCard = document.createElement('div');
            pedidoCard.className = 'bg-gray-50 p-4 rounded-lg shadow-sm';
            pedidoCard.innerHTML = `
                        <h3 class="text-xl font-bold text-gray-800">Pedido #${pedido.id}</h3>
                        <p class="text-gray-600 mt-2">Cliente: ${pedido.cliente}</p>
                        <p class="text-gray-600">Endereço: ${pedido.endereco}</p>
                        <div class="mt-4">
                            <h4 class="font-semibold text-gray-700">Itens:</h4>
                            <ul class="list-disc list-inside text-gray-600 pl-4">
                                ${pedido.itens.map(item => `<li>${item.quantidade}x ${item.nome}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="mt-4">
                            ${pedido.status === 'pronto' ?
                    `<button class="action-btn bg-green-500 text-white py-2 px-4 rounded-lg text-sm transition duration-150 hover:bg-green-600" data-pedido-id="${pedido.id}" data-action="pegar-pedido">
                                    <i class="fa-solid fa-truck-fast mr-2"></i>Pegar Pedido
                                </button>` :
                    `<button class="action-btn bg-red-500 text-white py-2 px-4 rounded-lg text-sm transition duration-150 hover:bg-red-600" data-pedido-id="${pedido.id}" data-action="entregar-pedido">
                                    <i class="fa-solid fa-check mr-2"></i>Marcar como Entregue
                                </button>`
                }
                        </div>
                    `;

            if (pedido.status === 'pronto') {
                pedidosRetiradaContainer.appendChild(pedidoCard);
            } else if (pedido.status === 'em-rota') {
                pedidosEmRotaContainer.appendChild(pedidoCard);
            }
        });
    }

    // Lógica para lidar com as ações do entregador
    function handleAction(pedidoId, action) {
        const pedido = pedidos.find(p => p.id === pedidoId);
        if (!pedido) return;

        if (action === 'pegar-pedido') {
            pedido.status = 'em-rota';
            alert(`Pedido #${pedido.id} marcado como em rota.`);
        } else if (action === 'entregar-pedido') {
            // O cliente informa o código do pedido, e a aplicação finaliza-o
            const codigoPedido = prompt(`Por favor, insira o código de entrega para o Pedido #${pedido.id}:`);
            if (codigoPedido === '12345') { // Simulação de um código correto
                pedido.status = 'entregue'; // Altera o status para entregue
                // Em um projeto real, faria uma chamada PATCH para a API
                alert(`Pedido #${pedido.id} entregue com sucesso!`);
            } else {
                alert('Código de entrega inválido.');
            }
        }

        pedidos = pedidos.filter(p => p.status !== 'entregue');
        renderPedidos();
    }

    // Adiciona o evento de click aos botões de ação
    document.querySelector('main').addEventListener('click', (event) => {
        const button = event.target.closest('.action-btn');
        if (button) {
            const pedidoId = parseInt(button.dataset.pedidoId);
            const action = button.dataset.action;
            handleAction(pedidoId, action);
        }
    });

    // Evento para o botão de sair
    logoutBtn.addEventListener('click', () => {
        alert('A sair do painel do entregador...');
        window.location.href = 'login_unificado.html';
    });

    // Chamada inicial para renderizar os pedidos
    renderPedidos();
});