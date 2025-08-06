document.addEventListener('DOMContentLoaded', () => {
    const formProduto = document.getElementById('form-produto');
    const produtosTableBody = document.getElementById('produtos-table-body');
    const logoutBtn = document.getElementById('logout-btn');
    const produtoIdInput = document.getElementById('produto-id');
    const submitBtn = document.getElementById('submit-btn');
    const messageBox = document.getElementById('message-box');

    // Novos elementos para seleção de ingredientes
    const ingredienteSelect = document.getElementById('ingrediente-select');
    const addIngredienteBtn = document.getElementById('add-ingrediente-btn');
    const ingredientesSelecionadosList = document.getElementById('ingredientes-selecionados-list');
    const noIngredientsMessage = document.getElementById('no-ingredients-message');
    const ingredientesInput = document.getElementById('ingredientes'); // Hidden input

    // Dados simulados de produtos
    let produtos = [];
    async function fetchAndRenderProdutos() {
        try {
            const response = await fetch('/api/produto/consultar');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do utilizador.');
            }
            produtos = await response.json();
            console.log('Dados ingrediente', produtos);
            renderProdutosTable();

        } catch (error) {
            console.error('Erro:', error);
        }
    }

    // Dados simulados de ingredientes em estoque (deveria vir de um endpoint /api/estoque/ingredientes)
    var ingredientesEstoque = [];

    let ingredientes = []; // Ingredientes atualmente selecionados para o produto no formulário

    function showMessage(text, type) {
        messageBox.textContent = text;
        messageBox.className = `mb-4 px-4 py-2 rounded-lg text-sm text-center ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`;
        messageBox.classList.remove('hidden');
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 3000);
    }

    async function fetchAndRenderIngredientes() {
        try {
            const response = await fetch('/api/ingredientes/consultar');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do utilizador.');
            }
            console.log(response);
            ingredientesEstoque = await response.json();
            console.log('Dados ingrediente', ingredientesEstoque);
            renderIngredienteSelect();

        } catch (error) {
            console.error('Erro:', error);
        }
    }

    // Renderiza as opções do select de ingredientes
    function renderIngredienteSelect() {
        ingredienteSelect.innerHTML = '<option value="">Selecione um ingrediente</option>';
        ingredientesEstoque.forEach(ingrediente => {
            const option = document.createElement('option');
            option.value = ingrediente.id;
            option.textContent = `${ingrediente.nome}`;
            ingredienteSelect.appendChild(option);
        });
    }

    // Renderiza a lista de ingredientes selecionados para o produto
    function renderProdutoIngredientes() {
        ingredientesSelecionadosList.innerHTML = '';
        if (ingredientes.length === 0) {
            noIngredientsMessage.classList.remove('hidden');
        } else {
            noIngredientsMessage.classList.add('hidden');
            ingredientes.forEach(ingrediente => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'flex items-center justify-between bg-white p-2 rounded-lg shadow-sm';
                itemDiv.innerHTML = `
                            <span class="text-gray-800">${ingrediente.nome}</span>
                            <div class="flex items-center space-x-2">
                                <button type="button" class="text-gray-600 hover:text-gray-800" onclick="ajustarQuantidadeProdutoIngrediente(${ingrediente.id}, -1)">-</button>
                                <span class="font-bold">${ingrediente.quantidade}</span>
                                <button type="button" class="text-gray-600 hover:text-gray-800" onclick="ajustarQuantidadeProdutoIngrediente(${ingrediente.id}, 1)">+</button>
                                <button type="button" class="text-red-500 hover:text-red-700" onclick="removerProdutoIngrediente(${ingrediente.id})">
                                    <i class="fa-solid fa-trash-alt"></i>
                                </button>
                            </div>
                        `;
                ingredientesSelecionadosList.appendChild(itemDiv);
            });
        }
    }

    // Adiciona um ingrediente à lista do produto
    window.adicionarIngredienteAoProduto = () => {
        const selectedId = parseInt(ingredienteSelect.value);
        if (isNaN(selectedId)) {
            showMessage('Selecione um ingrediente válido.', 'error');
            return;
        }

        const ingredienteExistente = ingredientes.find(i => i.id === selectedId);
        if (ingredienteExistente) {
            ingredienteExistente.quantidade++;
        } else {
            const ingredienteDoEstoque = ingredientesEstoque.find(i => i.id === selectedId);
            if (ingredienteDoEstoque) {
                ingredientes.push({ ...ingredienteDoEstoque, quantidade: 1 });
            }
        }
        renderProdutoIngredientes();
        ingredienteSelect.value = ''; // Limpa a seleção
    };

    // Ajusta a quantidade de um ingrediente no produto
    window.ajustarQuantidadeProdutoIngrediente = (id, change) => {
        const ingrediente = ingredientes.find(i => i.id === id);
        if (ingrediente) {
            ingrediente.quantidade += change;
            if (ingrediente.quantidade <= 0) {
                removerProdutoIngrediente(id);
            } else {
                renderProdutoIngredientes();
            }
        }
    };

    // Remove um ingrediente da lista do produto
    window.removerProdutoIngrediente = (id) => {
        ingredientes = ingredientes.filter(i => i.id !== id);
        renderProdutoIngredientes();
    };


    function renderProdutosTable() {
        produtosTableBody.innerHTML = '';
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

    formProduto.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formProduto);
        const produtoData = Object.fromEntries(formData.entries());

        // Converte a lista de ingredientes selecionados para JSON para enviar
        //produtoData.ingredientes = JSON.stringify(ingredientes);
         produtoData.ingredientes = ingredientes;

        // Remove a descrição de texto livre, se ainda existir no formulário
        delete produtoData.descricao;

        if (produtoIdInput.value) {
            const index = produtos.findIndex(p => p.id === parseInt(produtoIdInput.value));
            if (index !== -1) {
                produtos[index] = { ...produtos[index], ...produtoData, preco: parseFloat(produtoData.preco) };
                showMessage(`Produto ${produtoData.nome} alterado com sucesso!`, 'success');
            }
        } else {
            
            try {
                console.log("Produto data",produtoData);
                const response = await fetch('/api/produto/cadastrar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(produtoData),
                });

                const result = await response.json();

                if (response.ok) {
                    const novoProduto = { 
                        id: result.id, 
                        ...produtoData, 
                        preco: parseFloat(produtoData.preco),
                        };
                    produtos.push(novoProduto);
                    showMessage(`Produto ${novoProduto.nome} adicionado com sucesso!`, 'success');
                } else {
                    showMessage(result.message || 'Erro ao realizar o cadastro.', 'error');
                }

            } catch (error) {
                console.error('Erro:', error);
                showMessage('Ocorreu um erro na ligação com o servidor.', 'error');
            }
        }

        //formProduto.reset();
        //produtoIdInput.value = '';
        submitBtn.textContent = 'Cadastrar Produto';
        //ingredientes = []; // Limpa os ingredientes selecionados
        //renderProdutoIngredientes(); // Atualiza a lista de ingredientes no formulário
        //renderProdutosTable();
    });

    window.editarProduto = (id) => {
        const produto = produtos.find(p => p.id === id);
        if (produto) {
            produtoIdInput.value = produto.id;
            document.getElementById('nome').value = produto.nome;
            document.getElementById('preco').value = produto.preco;
            document.getElementById('imagem').value = produto.imagem;
            document.getElementById('categoria').value = produto.categoria;

            // Carrega os ingredientes do produto para edição
            try {
                ingredientes = produto.ingredientes ? produto.ingredientes : [];
            } catch (e) {
                console.error("Erro ao parsear ingredientesJson:", e);
                ingredientes = [];
            }
            renderProdutoIngredientes(); // Renderiza os ingredientes para edição

            submitBtn.textContent = 'Salvar Alterações';
        }
    };

    window.excluirProduto = (id) => {
        if (confirm('Tem certeza de que deseja excluir este produto?')) {
            produtos = produtos.filter(produto => produto.id !== id);
            renderProdutosTable();
            showMessage('Produto excluído com sucesso!', 'success');
        }
    };

    logoutBtn.addEventListener('click', () => {
        alert('A sair do painel de administração...');
        window.location.href = 'login_adm.html'; // Redireciona para a tela de login do admin
    });

    // Event listeners para os botões de adicionar ingrediente
    addIngredienteBtn.addEventListener('click', adicionarIngredienteAoProduto);

    renderIngredienteSelect(); // Renderiza as opções do select
    renderProdutoIngredientes(); // Renderiza a lista inicial de ingredientes do produto
    renderProdutosTable(); // Renderiza a tabela de produtos
    fetchAndRenderIngredientes();
    fetchAndRenderProdutos();
});