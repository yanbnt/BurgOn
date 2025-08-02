document.addEventListener('DOMContentLoaded', () => {
    const cardapioContainer = document.getElementById('cardapio-container');
    const carrinhoBtn = document.getElementById('carrinho-btn');
    const perfilBtn = document.getElementById('perfil-btn');
    const btnHamburgueres = document.getElementById('btn-hamburgueres');
    const btnBebidas = document.getElementById('btn-bebidas');
    const btnTodos = document.getElementById('btn-todos');

    let cardapio = []; // Inicializa o cardápio como um array vazio

    // Função para buscar os produtos do cardápio no backend
    async function fetchCardapio() {
        try {
            const response = await fetch('/api/pedidos/pedidos');
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

    // Renderiza os itens do cardápio de acordo com a categoria
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

    // Função para adicionar item ao carrinho (simulada)
    window.adicionarAoCarrinho = (itemId) => {
        const item = cardapio.find(i => i.id === itemId);
        if (item) {
            alert(`Item adicionado ao carrinho: ${item.nome}`);
        }
    };
    
    // Eventos para os botões de categoria
    btnHamburgueres.addEventListener('click', () => renderCardapio('hamburguer'));
    btnBebidas.addEventListener('click', () => renderCardapio('bebida'));
    btnTodos.addEventListener('click', () => renderCardapio('todos'));
    carrinhoBtn.addEventListener('click', () => window.location.href = 'carrinho.html');
    perfilBtn.addEventListener('click', () => window.location.href = 'perfil.html');

    // Chama a função para buscar o cardápio do backend na inicialização
    fetchCardapio();
});
