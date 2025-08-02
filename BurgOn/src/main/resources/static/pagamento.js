document.addEventListener('DOMContentLoaded', () => {
    const resumoPedidoContainer = document.getElementById('resumo-pedido-container');
    const paymentOptions = document.querySelectorAll('.payment-option');
    const formPagamentoContainer = document.getElementById('form-pagamento-container');
    const formPagamento = document.getElementById('form-pagamento');
    const finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
    const messageBox = document.getElementById('message-box');

    // Dados simulados do carrinho
    const carrinho = [
        { nome: "Hambúrguer Clássico", preco: 15.00, quantidade: 2 },
        { nome: "Batata Frita", preco: 8.00, quantidade: 1 }
    ];

    // Função para mostrar mensagens de alerta
    function showMessage(text, type) {
        messageBox.textContent = text;
        messageBox.className = `mb-4 px-4 py-2 rounded-lg text-sm text-center ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`;
        messageBox.classList.remove('hidden');
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 3000);
    }

    // Função para renderizar o resumo do pedido
    function renderResumoPedido() {
        let subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

        let resumoHtml = `
                    <div class="space-y-2">
                        ${carrinho.map(item => `
                            <div class="flex justify-between text-gray-600">
                                <span>${item.quantidade}x ${item.nome}</span>
                                <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <hr class="border-gray-200 my-4">
                    <div class="flex justify-between font-bold text-lg text-gray-800">
                        <span>Total:</span>
                        <span>R$ ${subtotal.toFixed(2)}</span>
                    </div>
                `;
        resumoPedidoContainer.innerHTML = resumoHtml;
    }

    // Função para renderizar o formulário de pagamento dinamicamente
    function renderFormularioPagamento(tipo) {
        let formHtml = '';
        if (tipo === 'cartao') {
            formHtml = `
                        <h3 class="font-bold text-gray-800">Dados do Cartão</h3>
                        <div>
                            <label for="numero-cartao" class="block text-sm font-medium text-gray-700">Número do Cartão</label>
                            <input type="text" id="numero-cartao" name="numeroCartao" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="validade" class="block text-sm font-medium text-gray-700">Validade</label>
                                <input type="text" id="validade" name="validade" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="MM/AA">
                            </div>
                            <div>
                                <label for="cvv" class="block text-sm font-medium text-gray-700">CVV</label>
                                <input type="text" id="cvv" name="cvv" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="123">
                            </div>
                        </div>
                        <div>
                            <label for="nome-cartao" class="block text-sm font-medium text-gray-700">Nome no Cartão</label>
                            <input type="text" id="nome-cartao" name="nomeCartao" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                        </div>
                    `;
        } else if (tipo === 'pix') {
            formHtml = `
                        <h3 class="font-bold text-gray-800">Pagamento com Pix</h3>
                        <div class="p-4 bg-gray-100 rounded-lg text-center">
                            <p class="text-gray-600">Um código Pix será gerado após a confirmação do pedido.</p>
                            <div class="mt-4">
                                <i class="fa-solid fa-qrcode text-red-500 text-6xl"></i>
                            </div>
                        </div>
                    `;
        } else if (tipo === 'vale') {
            formHtml = `
                        <h3 class="font-bold text-gray-800">Pagamento com Vale Refeição</h3>
                        <p class="text-gray-600">O pagamento será realizado na entrega com o seu cartão de vale-refeição.</p>
                    `;
        }
        formPagamento.innerHTML = formHtml;
        formPagamentoContainer.classList.remove('hidden');
    }

    // Lógica para lidar com a seleção das opções de pagamento
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');

            const tipoPagamento = option.id.replace('option-', '');
            renderFormularioPagamento(tipoPagamento);
        });
    });

    // Lógica para finalizar a compra
    finalizarCompraBtn.addEventListener('click', async () => {
        const tipoPagamentoSelecionado = document.querySelector('.payment-option.selected')?.id.replace('option-', '');

        if (!tipoPagamentoSelecionado) {
            showMessage('Por favor, selecione uma forma de pagamento.', 'error');
            return;
        }

        const dadosPedido = {
            itens: carrinho.map(item => ({ id: item.id, quantidade: item.quantidade })),
            formaPagamento: tipoPagamentoSelecionado,
            // Outros dados do pedido, como endereço e dados do cartão, iriam aqui
        };

        try {
            // Simulação de chamada POST para o backend
            const response = await fetch('/api/pedidos/finalizar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosPedido),
            });

            if (response.ok) {
                const result = await response.json();
                showMessage(result.message, 'success');
                // Redireciona para a tela de acompanhamento do pedido
                // window.location.href = 'acompanhamento_pedido.html';
            } else {
                const errorData = await response.json();
                showMessage(errorData.message || 'Erro ao finalizar o pedido.', 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            showMessage('Ocorreu um erro na ligação com o servidor.', 'error');
        }
    });

    renderResumoPedido();
});