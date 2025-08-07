document.addEventListener('DOMContentLoaded', () => {
    const cardapioContainer = document.getElementById('cardapio-container');
    const carrinhoAba = document.getElementById('carrinho-aba');
    const carrinhoTotalItensSpan = document.getElementById('carrinho-total-itens');
    const carrinhoTotalValorSpan = document.getElementById('carrinho-total-valor');
    const btnHamburgueres = document.getElementById('btn-hamburgueres');
    const btnBebidas = document.getElementById('btn-bebidas');
    const btnTodos = document.getElementById('btn-todos');
    const navPedidos = document.getElementById('nav-pedidos');
    const navPerfil = document.getElementById('nav-perfil');
    const enderecoCliente = document.getElementById('endereco-cliente');
    const notificationBtn = document.getElementById('notification-btn');
    const notificationIcon = document.getElementById('notification-icon');
    const messageModal = document.getElementById('message-modal');
    const telaCarrinho = document.getElementById('tela-carrinho');
    const geraCarrinhoBtn = document.getElementById('gera-carrinho-btn');
    const fecharCarrinhoBtn = document.getElementById('fechar-cardapio'); // Botão para fechar o carrinho
    const modalMessageElement = document.getElementById('modal-message');
    const carrinhoItensContainer = document.getElementById('carrinho-itens-container');
    // Parte do carrinho
    const finalizarPedidoBtn = document.getElementById('finalizar-pedido-btn');
    const subtotalSpan = document.getElementById('subtotal');
    
    // Simulação de um ID de usuário logado
    const userId = localStorage.getItem('userId'); // Exemplo de ID, pode ser dinâmico



    // Função para buscar dados do usuário no backend e preencher o perfil
    async function fetchAndRenderProfile() {
        try {
            // Simulação de chamada para o back-end
            // A URL real deve ser ajustada para o seu endpoint
            const response = await fetch('/api/usuario/editar/' + userId);
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do utilizador.');
            }
            const dadosPerfil = await response.json();
            console.log('Dados do perfil:', dadosPerfil);
            enderecoCliente.textContent = dadosPerfil.logradouro + ', ' + dadosPerfil.numero;

        } catch (error) {
            console.error('Erro:', error);
            // Opcional: exibir uma mensagem de erro na UI
            enderecoCliente.textContent = 'Erro ao carregar';
        }
    }

    let cardapio = []; // Inicializa o cardápio como um array vazio

    // Função para buscar os produtos do cardápio no backend
    async function fetchCardapio() {
        try {
            const response = await fetch('/api/produto/consultar'); // CORREÇÃO: Endpoint correto para buscar o cardápio.
            if (!response.ok) {
                throw new Error('Erro ao buscar o cardápio do servidor.');
            }
            cardapio = await response.json();

            renderCardapio('todos'); // Renderiza o cardápio completo após o fetch
        } catch (error) {
            console.error('Erro:', error);
            // Poderia mostrar uma mensagem de erro na UI
        }
    }

    // Carrega o carrinho do localStorage ao iniciar, ou inicializa um array vazio.
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const novaNotificacao = true;

    // Função central para atualizar o estado do carrinho (UI e localStorage)
    function updateCarrinhoState() {
        renderCarrinho();
        updateCarrinhoAba();
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

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
            modalTitle.textContent = 'Item Adicionado';
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
                            <img src="${item.imagemUrl}" alt="${item.nome}" class="w-full h-48 object-cover">
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
        //carrinhoAba.style.display = 'block';
        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            if (item) {
                carrinho.push({ ...item, quantidade: 1 });
            }
        }
        showModalMessage(`Adicionado ${item.nome}: ${item.descricao}`);
        updateCarrinhoState();
    };


    if (novaNotificacao) {
        notificationIcon.classList.add('text-red-500', 'animate-shake');
    }
    notificationBtn.addEventListener('click', () => {
        alert('A ir para a tela de notificações...');
        notificationIcon.classList.remove('text-red-500', 'animate-shake');
    });

    // Lógica para o botão de carrinho
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
            else {
                carrinho = carrinho.filter(i => i.id !== parseInt(itemId));
            }
        } else if (target.closest('.btn-remover')) {
            carrinho = carrinho.filter(i => i.id !== parseInt(itemId));
        }
        if (carrinho.length == 0) {
            telaCarrinho.style.display = 'none'; // Esconde o modal se o carrinho ficar vazio
        }
        updateCarrinhoState();
    });

    // Eventos com click
    finalizarPedidoBtn.addEventListener('click', () => {
        // O localStorage já está atualizado pela função updateCarrinhoState,
        // então apenas redirecionamos para a tela de pagamento.
        window.location.href = 'pagamento.html';
    });
    btnHamburgueres.addEventListener('click', () => renderCardapio('hamburguer'));
    btnBebidas.addEventListener('click', () => renderCardapio('bebida'));
    btnTodos.addEventListener('click', () => renderCardapio('todos'));
    fecharCarrinhoBtn.addEventListener('click', () => { telaCarrinho.style.display = 'none'; });
    navPedidos.addEventListener('click', () => { window.location.href = 'pedidos.html'; });
    navPerfil.addEventListener('click', () => { window.location.href = 'perfil.html'; });
    geraCarrinhoBtn.addEventListener('click', () => {
        if (carrinho.length === 0) {
            showModalMessage('O carrinho está vazio!', 'error');
            return;
        }
        telaCarrinho.style.display = 'block';
        renderCarrinho();
    });

    window.addEventListener('click', (evento) => {
        if (evento.target === telaCarrinho) { //Ao clicar fora da tela ele fecha
            telaCarrinho.style.display = 'none';
            
        }
    });

    renderCardapio('todos');
    fetchCardapio();
    updateCarrinhoState(); // Renderiza o estado inicial do carrinho e da aba
    fetchAndRenderProfile();
});