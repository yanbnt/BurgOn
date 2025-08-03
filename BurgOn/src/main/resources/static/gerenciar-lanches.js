document.addEventListener('DOMContentLoaded', () => {
    const formProduto = document.getElementById('form-produto');
    const produtosTableBody = document.getElementById('produtos-table-body');
    const logoutBtn = document.getElementById('logout-btn');
    const produtoIdInput = document.getElementById('produto-id');

    // Dados de produtos simulados
    let produtos = [
        { id: 1, nome: "Hambúrguer Clássico", descricao: "Pão, carne, queijo, alface e tomate.", preco: 15.00, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Clássico", categoria: "hamburguer" },
        { id: 2, nome: "Hambúrguer Bacon", descricao: "Pão, carne, queijo, bacon crocante, cebola caramelizada.", preco: 18.50, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Bacon", categoria: "hamburguer" },
        { id: 3, nome: "Hambúrguer Veggie", descricao: "Pão integral, hambúrguer de grão-de-bico, alface, tomate, maionese vegana.", preco: 17.00, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Veggie", categoria: "hamburguer" },
        { id: 4, nome: "Batata Frita", descricao: "Porção de batatas fritas crocantes e salgadas.", preco: 8.00, imagem: "https://placehold.co/400x300/f87171/ffffff?text=Batata", categoria: "acompanhamento" }
    ];

    // Renderiza a tabela de produtos
    function renderProdutosTable() {
        produtosTableBody.innerHTML = ''; // Limpa o conteúdo da tabela
        produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${produto.id}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${produto.nome}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ ${produto.preco.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button class="text-indigo-600 hover:text-indigo-900" onclick="editarProduto(${produto.id})">
                        <i class="fas fa-pencil-alt"></i> Alterar
                    </button>
                    <button class="text-red-600 hover:text-red-900" onclick="excluirProduto(${produto.id})">
                        <i class="fas fa-trash-alt"></i> Excluir
                    </button>
                </td>
            `;
            produtosTableBody.appendChild(row);
        });
    }

    // Lógica do formulário para cadastrar/alterar produto
    formProduto.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(formProduto);
        const produtoData = Object.fromEntries(formData.entries());

        if (produtoIdInput.value) {
            // Lógica de Alterar Produto (em um projeto real, faria uma chamada PUT/PATCH para a API)
            const index = produtos.findIndex(p => p.id === parseInt(produtoIdInput.value));
            if (index !== -1) {
                produtos[index] = { ...produtos[index], ...produtoData, preco: parseFloat(produtoData.preco) };
            }
            alert(`Produto alterado: ${produtoData.nome}`);
        } else {
            // Lógica de Cadastrar Novo Produto (em um projeto real, faria uma chamada POST para a API)
            const newId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
            const novoProduto = { id: newId, ...produtoData, preco: parseFloat(produtoData.preco) };
            produtos.push(novoProduto);
            alert(`Produto cadastrado: ${novoProduto.nome}`);
        }

        formProduto.reset();
        produtoIdInput.value = '';
        renderProdutosTable();
    });

    // Função para preencher o formulário com dados de um produto para edição
    window.editarProduto = (id) => {
        const produto = produtos.find(p => p.id === id);
        if (produto) {
            produtoIdInput.value = produto.id;
            document.getElementById('nome').value = produto.nome;
            document.getElementById('descricao').value = produto.descricao;
            document.getElementById('preco').value = produto.preco;
            document.getElementById('imagem').value = produto.imagem;
            document.getElementById('categoria').value = produto.categoria;
        }
    };

    // Função para excluir um produto
    window.excluirProduto = (id) => {
        if (confirm('Tem certeza de que deseja excluir este produto?')) {
            produtos = produtos.filter(produto => produto.id !== id);
            renderProdutosTable();
            alert('Produto excluído com sucesso!');
        }
    };

    // Evento para o botão de sair
    logoutBtn.addEventListener('click', () => {
        //alert('A sair do painel de administração...');
        window.location.href = 'gerenciar.html'; // Redireciona para a tela de login do admin
    });

    // Chamada inicial para renderizar a tabela
    renderProdutosTable();
});
