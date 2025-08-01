// Estado da aplicação
let isLoggedIn = false;
let prompt = '';
let suggestion = null;
let isLoading = false;
let error = null;
let message = { text: '', type: '' };

const appContainer = document.getElementById('app-container');
const messageBox = document.getElementById('message-box');

// Função principal para renderizar a UI de acordo com o estado
function render() {
    appContainer.innerHTML = '';
    if (isLoggedIn) {
        renderMenuSuggestion();
    } else {
        renderLoginForm();
    }
    renderMessage();
}

// Renderiza a caixa de mensagem
function renderMessage() {
    if (message.text) {
        messageBox.textContent = message.text;
        messageBox.className = `mb-4 px-4 py-2 rounded-lg text-sm text-center ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`;
        messageBox.classList.remove('hidden');
        setTimeout(() => {
            message.text = '';
            messageBox.classList.add('hidden');
        }, 3000);
    } else {
        messageBox.classList.add('hidden');
    }
}

// Renderiza o formulário de login
function renderLoginForm() {
    appContainer.innerHTML = `
        <div class="w-full p-8 bg-white rounded-2xl shadow-xl space-y-6">
            <div class="flex flex-col items-center">
                <img
                    src="https://placehold.co/100x100/f3f4f6/000000?text=BurgerOn"
                    alt="Logo BurgerOn"
                    class="h-24 w-24 mb-4"
                />
                <h1 class="text-3xl font-bold text-gray-800">Bem-vindo(a)</h1>
                <p class="text-gray-500 mt-1">Faça login para continuar</p>
            </div>
            <form id="login-form" class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out sm:text-sm"
                        placeholder="seu@email.com"
                    />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out sm:text-sm"
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                >
                    Entrar
                </button>
            </form>
            <div class="text-center text-sm">
                <a href="#" class="font-medium text-red-500 hover:text-red-600">Esqueceu a senha?</a>
            </div>
            <div class="relative">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                    <span class="bg-white px-2 text-gray-500">ou entre com</span>
                </div>
            </div>
            <div class="space-y-3">
                <button
                    type="button"
                    class="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                >
                    <i class="fab fa-google h-4 w-4 mr-2"></i>
                    Google
                </button>
                <button
                    type="button"
                    class="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                >
                    <i class="fab fa-facebook-f h-4 w-4 mr-2"></i>
                    Facebook
                </button>
            </div>
        </div>
    `;
    document.getElementById('login-form').addEventListener('submit', handleLogin);
}

// Renderiza a tela de sugestão de menu
function renderMenuSuggestion() {
    appContainer.innerHTML = `
        <div class="flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl space-y-6">
            <h2 class="text-2xl font-bold text-gray-800">Crie o seu Hambúrguer ✨</h2>
            <p class="text-gray-500 text-center">Descreva o tipo de hambúrguer que deseja e nós criaremos uma sugestão para si!</p>

            <div class="w-full space-y-4">
                <div>
                    <label for="prompt" class="block text-sm font-medium text-gray-700">Descrição do Hambúrguer</label>
                    <textarea
                        id="prompt"
                        name="prompt"
                        rows="4"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out sm:text-sm"
                        placeholder="Ex: Hambúrguer com bacon, queijo e um toque picante..."
                    >${prompt}</textarea>
                </div>
                <button
                    id="generate-btn"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition duration-150 ease-in-out"
                >
                    Gerar Sugestão ✨
                </button>
            </div>

            <!-- placeholders para estados de carregamento, erro e sucesso -->
            <div id="loading-state" class="w-full p-4 text-center text-gray-600 bg-gray-100 rounded-lg ${isLoading ? '' : 'hidden'}">
                A procurar o hambúrguer perfeito...
            </div>
            <div id="error-state" class="w-full p-4 text-center text-red-700 bg-red-100 rounded-lg ${error ? '' : 'hidden'}">
                ${error ? error : ''}
            </div>
            <div id="suggestion-result" class="w-full p-6 bg-yellow-50 rounded-2xl shadow-inner space-y-4 ${suggestion ? '' : 'hidden'}">
                <h3 class="text-xl font-bold text-gray-800">${suggestion ? suggestion.nome : ''}</h3>
                <p class="text-gray-600">${suggestion ? suggestion.descricao : ''}</p>
                <div>
                    <h4 class="font-semibold text-gray-700">Ingredientes:</h4>
                    <ul class="list-disc list-inside text-gray-600 pl-4">
                        ${suggestion ? suggestion.ingredientes.map(item => `<li>${item}</li>`).join('') : ''}
                    </ul>
                </div>
            </div>
        </div>
    `;
    const promptInput = document.getElementById('prompt');
    promptInput.addEventListener('input', (e) => {
        prompt = e.target.value;
        document.getElementById('generate-btn').disabled = !prompt;
    });
    document.getElementById('generate-btn').addEventListener('click', generateSuggestion);
    document.getElementById('generate-btn').disabled = !prompt;
}

// Simula o login e atualiza o estado
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        isLoggedIn = true;
        message = { text: 'Login bem-sucedido! A carregar a tela de sugestões...', type: 'success' };
        render();
    } else {
        message = { text: 'Por favor, insira o seu e-mail e palavra-passe.', type: 'error' };
        render();
    }
}

// Chamada para a API do Gemini
async function generateSuggestion() {
    isLoading = true;
    error = null;
    suggestion = null;
    renderMenuSuggestion();

    const textPrompt = `Gera uma sugestão criativa e deliciosa de um hambúrguer para o cliente BurgerOn, com base nesta descrição: "${prompt}". A resposta deve ser formatada em JSON com os seguintes campos: "nome" (o nome do hambúrguer), "ingredientes" (uma lista de ingredientes) e "descricao" (uma breve descrição do sabor).`;

    const chatHistory = [{ role: "user", parts: [{ text: textPrompt }] }];
    const payload = {
        contents: chatHistory,
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    "nome": { "type": "STRING" },
                    "ingredientes": {
                        "type": "ARRAY",
                        "items": { "type": "STRING" }
                    },
                    "descricao": { "type": "STRING" }
                },
                "propertyOrdering": ["nome", "ingredientes", "descricao"]
            }
        }
    };

    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const json = result.candidates[0].content.parts[0].text;
            const parsedJson = JSON.parse(json);
            suggestion = parsedJson;
        } else {
            error = 'Ocorreu um erro ao gerar a sugestão. Tente novamente.';
            console.error('API response error:', result);
        }
    } catch (e) {
        error = 'Ocorreu um erro na ligação. Verifique a sua ligação ou tente novamente.';
        console.error('Fetch error:', e);
    } finally {
        isLoading = false;
        renderMenuSuggestion();
    }
}

// Renderiza a UI inicial ao carregar a página
document.addEventListener('DOMContentLoaded', render);

