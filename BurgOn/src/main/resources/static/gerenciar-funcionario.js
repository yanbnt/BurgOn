document.addEventListener('DOMContentLoaded', () => {
            const formFuncionario = document.getElementById('form-funcionario');
            const funcionariosTableBody = document.getElementById('funcionarios-table-body');
            const messageBox = document.getElementById('message-box');
            const funcionarioIdInput = document.getElementById('funcionario-id');
            const formTitle = document.getElementById('form-title');
            const submitBtn = document.getElementById('submit-btn');
            const cancelarBtn = document.getElementById('cancelar-btn');

            let funcionarios = [
                { id: 1, nome: "Ana Santos", email: "ana.s@burgeron.com", cargo: "cozinheiro" },
                { id: 2, nome: "Bruno Lima", email: "bruno.l@burgeron.com", cargo: "entregador" },
                { id: 3, nome: "Carla Oliveira", email: "carla.o@burgeron.com", cargo: "balconista" },
                { id: 4, nome: "Pedro Rocha", email: "pedro.r@burgeron.com", cargo: "gerente" }
            ];

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

            function renderFuncionariosTable() {
                funcionariosTableBody.innerHTML = '';
                funcionarios.forEach(funcionario => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${funcionario.id}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${funcionario.nome}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${funcionario.cargo}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button class="text-indigo-600 hover:text-indigo-900" onclick="editarFuncionario(${funcionario.id})">
                                <i class="fas fa-pencil-alt"></i> Alterar
                            </button>
                            <button class="text-red-600 hover:text-red-900" onclick="excluirFuncionario(${funcionario.id})">
                                <i class="fas fa-trash-alt"></i> Excluir
                            </button>
                        </td>
                    `;
                    funcionariosTableBody.appendChild(row);
                });
            }

            formFuncionario.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(formFuncionario);
                const funcionarioData = Object.fromEntries(formData.entries());

                if (funcionarioIdInput.value) {
                    const index = funcionarios.findIndex(f => f.id === parseInt(funcionarioIdInput.value));
                    if (index !== -1) {
                        funcionarios[index] = { ...funcionarios[index], ...funcionarioData };
                        showMessage(`Funcionário ${funcionarioData.nome} alterado com sucesso!`, 'success');
                    }
                } else {
                    const newId = funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.id)) + 1 : 1;
                    const novoFuncionario = { id: newId, ...funcionarioData };
                    funcionarios.push(novoFuncionario);
                    showMessage(`Funcionário ${novoFuncionario.nome} cadastrado com sucesso!`, 'success');
                }

                formFuncionario.reset();
                resetFormState();
                renderFuncionariosTable();
            });

            window.editarFuncionario = (id) => {
                const funcionario = funcionarios.find(f => f.id === id);
                if (funcionario) {
                    formTitle.textContent = 'Alterar Funcionário';
                    submitBtn.textContent = 'Salvar Alterações';
                    cancelarBtn.classList.remove('hidden');

                    funcionarioIdInput.value = funcionario.id;
                    document.getElementById('nome').value = funcionario.nome;
                    document.getElementById('email').value = funcionario.email;
                    document.getElementById('cargo').value = funcionario.cargo;
                }
            };

            window.excluirFuncionario = (id) => {
                if (confirm('Tem certeza de que deseja excluir este funcionário?')) {
                    funcionarios = funcionarios.filter(funcionario => funcionario.id !== id);
                    renderFuncionariosTable();
                    showMessage('Funcionário excluído com sucesso!', 'success');
                }
            };
            
            cancelarBtn.addEventListener('click', () => {
                formFuncionario.reset();
                resetFormState();
            });
            
            function resetFormState() {
                formTitle.textContent = 'Cadastrar Novo Funcionário';
                submitBtn.textContent = 'Cadastrar';
                cancelarBtn.classList.add('hidden');
                funcionarioIdInput.value = '';
            }

            renderFuncionariosTable();
        });