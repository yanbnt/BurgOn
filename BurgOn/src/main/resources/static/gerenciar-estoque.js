document.addEventListener('DOMContentLoaded', () => {
    const formIngrediente = document.getElementById('form-ingrediente');
    const ingredientesTableBody = document.getElementById('ingredientes-table-body');
    const viewListaBtn = document.getElementById('view-lista-btn');
    const viewGraficoBtn = document.getElementById('view-grafico-btn');
    const estoqueListaView = document.getElementById('estoque-lista-view');
    const estoqueGraficoView = document.getElementById('estoque-grafico-view');
    const messageBox = document.getElementById('message-box');

    const ingredienteIdInput = document.getElementById('ingrediente-id');
    const nomeIngredienteInput = document.getElementById('nome');
    const quantidadeIngredienteInput = document.getElementById('quantidade');
    const quantidadeMinima = document.getElementById('quantidadeMinima');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const cancelarBtn = document.getElementById('cancelar-btn');
    
    var ingredientes = [];

    async function fetchAndRenderProfile() {
        try {
            const response = await fetch('/api/ingredientes/consultar');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do utilizador.');
            }
            ingredientes = await response.json();
            console.log('Dados ingrediente', ingredientes);
            toggleView('lista');

        } catch (error) {
            console.error('Erro:', error);
        }
    }


    let estoqueChart = null;
    
    function showMessage(text, type) {
        messageBox.textContent = text;
        messageBox.className = `mb-4 px-4 py-2 rounded-lg text-sm text-center ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`;
        messageBox.classList.remove('hidden');
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 3000);
    }

    function renderIngredientesTable() {
        ingredientesTableBody.innerHTML = '';
        ingredientes.forEach(ingrediente => {
            const statusClass = ingrediente.quantidade < 20 ? 'bg-red-500' : (ingrediente.quantidade < 50 ? 'bg-yellow-500' : 'bg-green-500');
            const statusText = ingrediente.quantidade < 20 ? 'Baixo' : (ingrediente.quantidade < 50 ? 'Médio' : 'Alto');

            const row = document.createElement('tr');
            row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${ingrediente.nome}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ingrediente.quantidade}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass} text-white">
                                ${statusText}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button class="text-indigo-600 hover:text-indigo-900" onclick="editarIngrediente(${ingrediente.id})">
                                <i class="fas fa-pencil-alt"></i> Alterar
                            </button>
                            <button class="text-red-600 hover:text-red-900" onclick="excluirIngrediente(${ingrediente.id})">
                                <i class="fas fa-trash-alt"></i> Excluir
                            </button>
                        </td>
                    `;
            ingredientesTableBody.appendChild(row);
        });
    }

    function renderGraficoEstoque() {
        const ctx = document.getElementById('estoque-chart').getContext('2d');

        if (estoqueChart) {
            estoqueChart.destroy();
        }

        estoqueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ingredientes.map(i => `${i.nome}`),
                datasets: [{
                    label: 'Quantidade em Estoque',
                    data: ingredientes.map(i => i.quantidade),
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.6)',
                        'rgba(251, 191, 36, 0.6)',
                        'rgba(34, 197, 94, 0.6)',
                        'rgba(59, 130, 246, 0.6)',
                        'rgba(168, 85, 247, 0.6)',
                        'rgba(236, 72, 153, 0.6)'
                    ],
                    borderColor: [
                        'rgba(239, 68, 68, 1)',
                        'rgba(251, 191, 36, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(168, 85, 247, 1)',
                        'rgba(236, 72, 153, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function toggleView(view) {
        if (view === 'lista') {
            estoqueListaView.classList.remove('hidden');
            estoqueGraficoView.classList.add('hidden');
            viewListaBtn.classList.replace('bg-gray-200', 'bg-red-500');
            viewListaBtn.classList.replace('text-gray-800', 'text-white');
            viewGraficoBtn.classList.replace('bg-red-500', 'bg-gray-200');
            viewGraficoBtn.classList.replace('text-white', 'text-gray-800');
            renderIngredientesTable();
        } else if (view === 'grafico') {
            estoqueGraficoView.classList.remove('hidden');
            estoqueListaView.classList.add('hidden');
            viewGraficoBtn.classList.replace('bg-gray-200', 'bg-red-500');
            viewGraficoBtn.classList.replace('text-gray-800', 'text-white');
            viewListaBtn.classList.replace('bg-red-500', 'bg-gray-200');
            viewListaBtn.classList.replace('text-white', 'text-gray-800');
            renderGraficoEstoque();
        }
    }

    formIngrediente.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formIngrediente);
        const ingredienteData = Object.fromEntries(formData.entries());

        if (ingredienteIdInput.value) {
            const index = ingredientes.findIndex(i => i.id === parseInt(ingredienteIdInput.value));
            if (index !== -1) {
                ingredientes[index] = { ...ingredientes[index], ...ingredienteData, quantidade: parseInt(ingredienteData.quantidade) };
                showMessage(`Ingrediente ${ingredienteData.nome} alterado com sucesso!`, 'success');
            }
        } else {
            /*const newId = ingredientes.length > 0 ? Math.max(...ingredientes.map(i => i.id)) + 1 : 1;
            const novoIngrediente = { id: newId, ...ingredienteData, quantidade: parseInt(ingredienteData.quantidade) };
            ingredientes.push(novoIngrediente);
            showMessage(`Ingrediente ${novoIngrediente.nome} adicionado com sucesso!`, 'success');*/
            try {
                const response = await fetch('/api/ingredientes/cadastrar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ingredienteData),
                });

                const result = await response.json();

                if (response.ok) {
                    const novoIngrediente = { 
                        id: result.id, 
                        ...ingredienteData, 
                        quantidade: parseInt(ingredienteData.quantidade),
                        quantidadeMinima: parseInt(ingredienteData.quantidadeMinima)
                    };
                    ingredientes.push(novoIngrediente);
                    showMessage(`Ingrediente ${novoIngrediente.nome} adicionado com sucesso!`, 'success');
                } else {
                    showMessage(result.message || 'Erro ao realizar o cadastro.', 'error');
                }

            } catch (error) {
                console.error('Erro:', error);
                showMessage('Ocorreu um erro na ligação com o servidor.', 'error');
            }
        }

        formIngrediente.reset();
        resetFormState();
        toggleView('lista');
    });

    window.editarIngrediente = (id) => {
        const ingrediente = ingredientes.find(i => i.id === id);
        if (ingrediente) {
            formTitle.textContent = 'Alterar Ingrediente';
            submitBtn.textContent = 'Atualizar Quantidade';
            cancelarBtn.classList.remove('hidden');
            ingredienteIdInput.value = ingrediente.id;
            nomeIngredienteInput.value = ingrediente.nome;
            quantidadeIngredienteInput.value = ingrediente.quantidade;
        }
    };

    window.excluirIngrediente = (id) => {
        if (confirm('Tem certeza de que deseja excluir este ingrediente?')) {
            ingredientes = ingredientes.filter(ingrediente => ingrediente.id !== id);
            showMessage('Ingrediente excluído com sucesso!', 'success');
            toggleView('lista');
        }
    };

    cancelarBtn.addEventListener('click', () => {
        formIngrediente.reset();
        resetFormState();
    });

    function resetFormState() {
        formTitle.textContent = 'Adicionar/Alterar Ingrediente';
        submitBtn.textContent = 'Adicionar Ingrediente';
        cancelarBtn.classList.add('hidden');
        ingredienteIdInput.value = '';
    }

    viewListaBtn.addEventListener('click', () => toggleView('lista'));
    viewGraficoBtn.addEventListener('click', () => toggleView('grafico'));

    renderIngredientesTable();
    fetchAndRenderProfile();
    toggleView('lista');
});