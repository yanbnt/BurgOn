document.addEventListener('DOMContentLoaded', () => {
    const carrinhoItensContainer = document.getElementById('carrinho-itens-container');
    const subtotalSpan = document.getElementById('subtotal');
    const totalSpan = document.getElementById('total');
    const finalizarPedidoBtn = document.getElementById('finalizar-pedido-btn');

    // Simulação de itens no carrinho
    let carrinho = [
        { id: 1, nome: "Hambúrguer Clássico", preco: 15.00, quantidade: 2 },
        { id: 4, nome: "Batata Frita", preco: 8.00, quantidade: 1 }
    ];

    // Função para renderizar os itens do carrinho e calcular o total
    function renderCarrinho() {
        carrinhoItensContainer.innerHTML = '';
        let subtotal = 0;

        carrinho.forEach(item => {
            const itemHtml = `
                        <div class="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                            <div class="flex-grow">
                                <h3 class="text-lg font-bold text-gray-800">${item.nome}</h3>
                                <p class="text-gray-600">R$ ${item.preco.toFixed(2)}</p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button class="btn-quantidade-menos bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold w-8 h-8 rounded-full transition duration-150" data-item-id="${item.id}">-</button>
                                <span class="text-lg font-bold text-gray-800 w-6 text-center">${item.quantidade}</span>
                                <button class="btn-quantidade-mais bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold w-8 h-8 rounded-full transition duration-150" data-item-id="${item.id}">+</button>
                            </div>
                            <button class="btn-remover bg-red-500 hover:bg-red-600 text-white font-bold w-8 h-8 rounded-full ml-4 transition duration-150" data-item-id="${item.id}">
                                <i class="fa-solid fa-trash-alt"></i>
                            </button>
                        </div>
                    `;
            carrinhoItensContainer.innerHTML += itemHtml;
            subtotal += item.preco * item.quantidade;
        });

        subtotalSpan.textContent = `R$ ${subtotal.toFixed(2)}`;
        totalSpan.textContent = `R$ ${subtotal.toFixed(2)}`; // Sem frete ou taxas por enquanto
    }

    // Lógica para lidar com os botões de quantidade e remoção
    carrinhoItensContainer.addEventListener('click', (event) => {
        const target = event.target;
        const itemId = target.closest('[data-item-id]').dataset.itemId;
        const item = carrinho.find(i => i.id === parseInt(itemId));

        if (!item) return;

        if (target.closest('.btn-quantidade-mais')) {
            item.quantidade++;
        } else if (target.closest('.btn-quantidade-menos')) {
            if (item.quantidade > 1) {
                item.quantidade--;
            }
        } else if (target.closest('.btn-remover')) {
            carrinho = carrinho.filter(i => i.id !== parseInt(itemId));
        }

        renderCarrinho();
    });

    // Lógica para finalizar o pedido
    finalizarPedidoBtn.addEventListener('click', () => {
        alert("A sua próxima tela será o ecrã de pagamento!");
        // Aqui você faria uma chamada POST para a API de backend para finalizar o pedido
    });

    // Chamada inicial para renderizar a tela
    renderCarrinho();
});