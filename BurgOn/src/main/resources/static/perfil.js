document.addEventListener('DOMContentLoaded', () => {
            const perfilContent = document.getElementById('perfil-content');

            // Simula a existência de um pedido em andamento
            const pedidoEmAndamento = true;

            // Dados de perfil e pedidos simulados
            const dadosPerfil = {
                nome: localStorage.getItem('nome'),
                email: localStorage.getItem('email')
            };

            const dadosPedidoAtual = {
                id: 12345,
                status: "Em Preparação",
                previsao: "30-40 minutos",
                itens: [
                    { nome: "Hambúrguer Clássico", quantidade: 1 },
                    { nome: "Batata Frita", quantidade: 1 },
                    { nome: "Milkshake de Chocolate", quantidade: 1 }
                ]
            };
            
            const historicoPedidos = [
                {
                    id: 98765,
                    data: "20/07/2024",
                    total: 35.50,
                    status: "Entregue",
                    itens: [
                        { nome: "Hambúrguer Bacon", quantidade: 1 },
                        { nome: "Refrigerante Cola", quantidade: 1 }
                    ]
                },
                {
                    id: 98764,
                    data: "15/07/2024",
                    total: 24.00,
                    status: "Entregue",
                    itens: [
                        { nome: "Hambúrguer Veggie", quantidade: 1 }
                    ]
                }
            ];

            // Função para renderizar o conteúdo da tela de perfil
            function renderPerfilScreen() {
                perfilContent.innerHTML = '';

                // Seção de Informações do Perfil
                let perfilHtml = `
                    <section class="space-y-4">
                        <h2 class="text-2xl font-bold text-gray-800">Informações Pessoais</h2>
                        <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <p class="text-gray-800">Nome: <span class="font-bold">${dadosPerfil.nome}</span></p>
                            <p class="text-gray-800">Email: <span class="font-bold">${dadosPerfil.email}</span></p>
                        </div>
                        <a href="editar-perfil.html" class="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150">
                            <i class="fa-solid fa-user-edit mr-2"></i>Editar Dados Cadastrados
                        </a>
                    </section>
                `;

                // Se houver um pedido em andamento, adiciona a seção de status do pedido
                if (pedidoEmAndamento) {
                    perfilHtml += `
                        <hr class="border-gray-200">
                        <section class="space-y-4">
                            <h2 class="text-2xl font-bold text-gray-800">Status do Pedido #${dadosPedidoAtual.id}</h2>
                            <div class="bg-yellow-50 p-4 rounded-lg shadow-sm">
                                <p class="text-gray-800">Status: <span class="font-bold">${dadosPedidoAtual.status}</span></p>
                                <p class="text-gray-800">Previsão: <span class="font-bold">${dadosPedidoAtual.previsao}</span></p>
                                <div class="mt-4">
                                    <h3 class="font-semibold text-gray-700">Itens:</h3>
                                    <ul class="list-disc list-inside text-gray-600 pl-4">
                                        ${dadosPedidoAtual.itens.map(item => `<li>${item.quantidade}x ${item.nome}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    `;
                }
                
                // Seção de Histórico de Pedidos
                perfilHtml += `
                    <hr class="border-gray-200">
                    <section class="space-y-4">
                        <h2 class="text-2xl font-bold text-gray-800">Histórico de Pedidos</h2>
                        <div id="historico-pedidos-container" class="space-y-4">
                            ${historicoPedidos.map(pedido => `
                                <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
                                    <p class="font-bold text-gray-800">Pedido #${pedido.id} - ${pedido.data}</p>
                                    <p class="text-gray-600">Total: R$ ${pedido.total.toFixed(2)}</p>
                                    <p class="text-gray-600">Status: <span class="font-bold">${pedido.status}</span></p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                `;

                perfilContent.innerHTML = perfilHtml;
            }

            renderPerfilScreen();
        });