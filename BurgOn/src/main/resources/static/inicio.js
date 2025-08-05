document.addEventListener('DOMContentLoaded', () => {
    const cardapioContainer = document.getElementById('cardapio-container');
    const carrinhoAba = document.getElementById('carrinho-aba');
    const carrinhoTotalItensSpan = document.getElementById('carrinho-total-itens');
    const carrinhoTotalValorSpan = document.getElementById('carrinho-total-valor');
    const btnHamburgueres = document.getElementById('btn-hamburgueres');
    const btnBebidas = document.getElementById('btn-bebidas');
    const btnTodos = document.getElementById('btn-todos');
    const navInicio = document.getElementById('nav-inicio');
    const navPedidos = document.getElementById('nav-pedidos');
    const navPerfil = document.getElementById('nav-perfil');
    const enderecoClienteP = document.getElementById('endereco-cliente');
    const notificationBtn = document.getElementById('notification-btn');
    const notificationIcon = document.getElementById('notification-icon');
    const messageModal = document.getElementById('message-modal');
    const modalMessageElement = document.getElementById('modal-message');

    const dadosUsuario = {
        endereco: "Rua do Passeio, 100"
    };
    enderecoClienteP.textContent = dadosUsuario.endereco;

    const cardapio = [
        { id: 1, nome: "Hambúrguer Clássico", descricao: "Pão, carne, queijo, alface e tomate.", preco: 15.00, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Clássico", categoria: "hamburguer" },
        { id: 2, nome: "Hambúrguer Bacon", descricao: "Pão, carne, queijo, bacon crocante, cebola caramelizada.", preco: 18.50, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Bacon", categoria: "hamburguer" },
        { id: 3, nome: "Hambúrguer Veggie", descricao: "Pão integral, hambúrguer de grão-de-bico, alface, tomate, maionese vegana.", preco: 17.00, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Veggie", categoria: "hamburguer" },
        { id: 7, nome: "Hambúrguer BBQ", descricao: "Carne, queijo cheddar, molho barbecue e anéis de cebola.", preco: 21.00, imagem: "https://placehold.co/400x300/f87171/ffffff?text=BBQ", categoria: "hamburguer" },
        { id: 8, nome: "Hambúrguer Picanha", descricao: "Pão, carne de picanha, queijo provolone e molho especial.", preco: 25.00, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Picanha", categoria: "hamburguer" },
        { id: 4, nome: "Batata Frita", descricao: "Porção de batatas fritas crocantes e salgadas.", preco: 8.00, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Batata", categoria: "acompanhamento" },
        { id: 5, nome: "Refrigerante Cola", descricao: "Lata de refrigerante de cola.", preco: 5.50, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Refrigerante", categoria: "bebida" },
        { id: 6, nome: "Milkshake de Chocolate", descricao: "Milkshake cremoso de chocolate.", preco: 12.00, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Milkshake", categoria: "bebida" },
        { id: 9, nome: "Suco de Laranja", descricao: "Suco natural de laranja espremida na hora.", preco: 9.00, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Suco", categoria: "bebida" },
        { id: 10, nome: "Cerveja Artesanal", descricao: "Cerveja lager artesanal.", preco: 14.00, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Cerveja", categoria: "bebida" }
    ];

    let carrinho = [];

    const novaNotificacao = true;

    function updateCarrinhoAba() {
        const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
        const valorTotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        carrinhoTotalItensSpan.textContent = `${totalItens} itens`;
        carrinhoTotalValorSpan.textContent = `R$ ${valorTotal.toFixed(2)}`;

        const bottomNavHeight = 72;
        const carrinhoAbaHeight = 64;

        if (totalItens > 0) {
            carrinhoAba.classList.add('visible');
            document.body.style.paddingBottom = `${bottomNavHeight + carrinhoAbaHeight}px`;
        } else {
            carrinhoAba.classList.remove('visible');
            document.body.style.paddingBottom = `${bottomNavHeight}px`;
        }
    }

    function showModalMessage(message, type = 'success') {
        const modalIcon = document.getElementById('modal-icon');
        const modalTitle = document.getElementById('modal-title');
        modalMessageElement.textContent = message;

        if (type === 'success') {
            modalIcon.className = 'fa-solid fa-check-circle text-green-500 text-3xl';
            modalTitle.textContent = 'Sucesso';
        } else if (type === 'error') {
            modalIcon.className = 'fa-solid fa-xmark-circle text-red-500 text-3xl';
            modalTitle.textContent = 'Erro';
        }

        messageModal.classList.add('show');
        setTimeout(() => {
            messageModal.classList.remove('show');
        }, 3000);
    }

    function renderCardapio(categoria) {
        cardapioContainer.innerHTML = '';
        const itensFiltrados = cardapio.filter(item => categoria === 'todos' || item.categoria === categoria);

        itensFiltrados.forEach(item => {
            const itemHtml = `
                        <div class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition duration-300 hover:scale-105">
                            <img src="${item.imagem}" alt="${item.nome}" class="w-full h-48 object-cover">
                            <div class="p-4 flex-grow">
                                <h3 class="text-xl font-bold text-gray-800">${item.nome}</h3>
                                <p class="text-gray-600 mt-1 text-sm">${item.descricao}</p>
                                <p class="text-2xl font-extrabold text-red-500 mt-3">R$ ${item.preco.toFixed(2)}</p>
                            </div>
                            <div class="p-4 bg-gray-50">
                                <button
                                    class="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-150"
                                    onclick="adicionarAoCarrinho(${item.id})"
                                >
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    `;
            cardapioContainer.innerHTML += itemHtml;
        });
    }

    window.adicionarAoCarrinho = (itemId) => {
        const itemExistente = carrinho.find(item => item.id === itemId);
        const item = cardapio.find(i => i.id === itemId);

        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            if (item) {
                carrinho.push({ ...item, quantidade: 1 });
            }
        }
        showModalMessage(`Adicionado ${item.nome}: ${item.descricao}`);
        updateCarrinhoAba();
    };

    btnHamburgueres.addEventListener('click', () => renderCardapio('hamburguer'));
    btnBebidas.addEventListener('click', () => renderCardapio('bebida'));
    btnTodos.addEventListener('click', () => renderCardapio('todos'));

    //navInicio.addEventListener('click', () => { window.location.href = 'cliente_inicial.html'; });
    navPedidos.addEventListener('click', () => { window.location.href = 'pedidos.html'; });
    navPerfil.addEventListener('click', () => { window.location.href = 'perfil.html'; });

    if (novaNotificacao) {
        notificationIcon.classList.add('text-red-500', 'animate-shake');
    }
    notificationBtn.addEventListener('click', () => {
        alert('A ir para a tela de notificações...');
        notificationIcon.classList.remove('text-red-500', 'animate-shake');
    });

    renderCardapio('todos');
    updateCarrinhoAba();
});