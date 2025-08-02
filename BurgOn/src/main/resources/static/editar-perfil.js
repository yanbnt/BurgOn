document.addEventListener('DOMContentLoaded', () => {
            const formEditarPerfil = document.getElementById('form-editar-perfil');
            const messageBox = document.getElementById('message-box');
            const cepInput = document.getElementById('cep');
            const btnBuscarCep = document.getElementById('btn-buscar-cep');
            const enderecoCampos = document.getElementById('endereco-campos');

            // ID do utilizador logado (em um projeto real, seria obtido da sessão ou do token de autenticação)
            const userId = localStorage.getItem('userId');

            // Função para mostrar mensagens de alerta
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
            
            // Função para buscar dados do utilizador no backend e preencher o formulário
            async function fetchAndFillForm() {
                try {
                    // A URL do endpoint deve ser ajustada para o seu backend
                    const response = await fetch('/api/clientes/editar/' + userId);
                    if (!response.ok) {
                        throw new Error('Erro ao buscar os dados do utilizador.');
                    }
                    const dadosPerfil = await response.json();
                    
                    document.getElementById('user-id').value = dadosPerfil.id;
                    document.getElementById('nome').value = dadosPerfil.nome;
                    document.getElementById('email').value = dadosPerfil.email;
                    document.getElementById('celular').value = dadosPerfil.telefone || '';
                    
                    if (dadosPerfil.endereco) {
                        cepInput.value = dadosPerfil.endereco;
                        preencherEndereco(dadosPerfil.endereco);
                    }

                } catch (error) {
                    console.error('Erro:', error);
                    showMessage('Ocorreu um erro ao carregar os dados do perfil.', 'error');
                }
            }

            // Preenche os campos de endereço a partir de um objeto de dados
            function preencherEndereco(data) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('localidade').value = data.localidade;
                document.getElementById('uf').value = data.uf;
                document.getElementById('complemento').value = data.complemento;
                document.getElementById('numero').value = data.numero || '';
                enderecoCampos.classList.remove('hidden');
            }

            async function buscarCep() {
                const cep = cepInput.value.replace(/\D/g, '');
                if (cep.length !== 8) {
                    showMessage('CEP inválido. Digite 8 dígitos.', 'error');
                    enderecoCampos.classList.add('hidden');
                    return;
                }

                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    const data = await response.json();

                    if (!data.erro) {
                        preencherEndereco(data);
                        showMessage('Endereço preenchido automaticamente.', 'success');
                    } else {
                        showMessage('CEP não encontrado.', 'error');
                        document.getElementById('logradouro').value = '';
                        document.getElementById('bairro').value = '';
                        document.getElementById('localidade').value = '';
                        document.getElementById('uf').value = '';
                        enderecoCampos.classList.add('hidden');
                    }
                } catch (error) {
                    console.error('Erro na busca de CEP:', error);
                    showMessage('Erro ao buscar o CEP. Tente novamente.', 'error');
                    enderecoCampos.classList.add('hidden');
                }
            }
            
            // Evento de submissão do formulário
            formEditarPerfil.addEventListener('submit', async (event) => {
                event.preventDefault();

                const formData = new FormData(formEditarPerfil);
                const data = Object.fromEntries(formData.entries());
                console.log('Dados do formulário:', data);
                try {
                    const response = await fetch(`/api/clientes/editar/${data.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    });

                    if (response.ok) {
                        const result = await response.json();
                        showMessage(result.message, 'success');
                    } else {
                        const errorData = await response.json();
                        showMessage(errorData.message || 'Erro ao atualizar dados.', 'error');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    showMessage('Ocorreu um erro na ligação com o servidor.', 'error');
                }
            });

            btnBuscarCep.addEventListener('click', buscarCep);
            
            cepInput.addEventListener('blur', buscarCep);

            // Chama a função para buscar os dados e preencher o formulário na inicialização
            fetchAndFillForm();
        });