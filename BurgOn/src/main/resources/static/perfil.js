document.addEventListener('DOMContentLoaded', () => {
            const logoutBtn = document.getElementById('logout-btn');
            const nomeUsuario = document.getElementById('nome-usuario');
            const emailUsuario = document.getElementById('email-usuario');
            
            // Simulação de um ID de usuário logado
            const userId = localStorage.getItem('userId'); // Exemplo de ID, pode ser dinâmico
            console.log('ID do usuário:', userId);
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
                    nomeUsuario.textContent = dadosPerfil.nome;
                    emailUsuario.textContent = dadosPerfil.email;

                } catch (error) {
                    console.error('Erro:', error);
                    // Opcional: exibir uma mensagem de erro na UI
                    nomeUsuario.textContent = 'Erro ao carregar';
                    emailUsuario.textContent = 'Erro ao carregar';
                }
            }
            
            logoutBtn.addEventListener('click', () => {
                alert('A sair...');
                window.location.href = 'login.html';
            });
            
            // Chama a função para buscar e renderizar o perfil na inicialização
            fetchAndRenderProfile();
        });