document.addEventListener('DOMContentLoaded', () => {
            const ingredientesTableBody = document.getElementById('ingredientes-table-body');
            const viewListaBtn = document.getElementById('view-lista-btn');
            const viewGraficoBtn = document.getElementById('view-grafico-btn');
            const estoqueListaView = document.getElementById('estoque-lista-view');
            const estoqueGraficoView = document.getElementById('estoque-grafico-view');
            const messageBox = document.getElementById('message-box');

            let ingredientes = [
                { id: 1, nome: "Carne", quantidade: 25, unidade: "kg" },
                { id: 2, nome: "Pão", quantidade: 150, unidade: "un" },
                { id: 3, nome: "Queijo", quantidade: 30, unidade: "kg" },
                { id: 4, nome: "Alface", quantidade: 50, unidade: "un" },
                { id: 5, nome: "Tomate", quantidade: 15, unidade: "kg" },
                { id: 6, nome: "Bacon", quantidade: 10, unidade: "kg" }
            ];
            
            let estoqueChart = null;

            function showMessage(text, type) {
                messageBox.textContent = text;
                messageBox.className = `mb-4 px-4 py-2 rounded-lg text-sm text-center ${
                    type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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
                    row.className = 'hover:bg-gray-50';
                    row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${ingrediente.nome} (${ingrediente.unidade})</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ingrediente.quantidade}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass} text-white">
                                ${statusText}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <input type="number" id="quantidade-input-${ingrediente.id}" class="w-16 px-2 py-1 border rounded-lg text-sm text-center" value="1">
                            <button class="text-green-600 hover:text-green-900" onclick="adicionarQuantidade(${ingrediente.id})">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="text-red-600 hover:text-red-900" onclick="removerQuantidade(${ingrediente.id})">
                                <i class="fas fa-minus"></i>
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
                        labels: ingredientes.map(i => `${i.nome} (${i.unidade})`),
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
            
            window.adicionarQuantidade = (id) => {
                const ingrediente = ingredientes.find(i => i.id === id);
                const quantidadeInput = document.getElementById(`quantidade-input-${id}`);
                const quantidade = parseInt(quantidadeInput.value) || 0;
                
                if (ingrediente && quantidade > 0) {
                    ingrediente.quantidade += quantidade;
                    showMessage(`${quantidade} unidades adicionadas para ${ingrediente.nome}.`, 'success');
                    renderIngredientesTable();
                }
            };
            
            window.removerQuantidade = (id) => {
                const ingrediente = ingredientes.find(i => i.id === id);
                const quantidadeInput = document.getElementById(`quantidade-input-${id}`);
                const quantidade = parseInt(quantidadeInput.value) || 0;
                
                if (ingrediente && quantidade > 0) {
                    ingrediente.quantidade -= quantidade;
                    if (ingrediente.quantidade < 0) {
                        ingrediente.quantidade = 0;
                    }
                    showMessage(`${quantidade} unidades removidas para ${ingrediente.nome}.`, 'success');
                    renderIngredientesTable();
                }
            };

            viewListaBtn.addEventListener('click', () => toggleView('lista'));
            viewGraficoBtn.addEventListener('click', () => toggleView('grafico'));

            renderIngredientesTable();
            toggleView('lista');
        });