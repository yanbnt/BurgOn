const loginForm = document.getElementById('login-form');
const messageBox = document.getElementById('message-box');

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

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            showMessage(result.message, 'success');
            // Armazenar o token de autenticação, se existir
            localStorage.setItem('authToken', result.token);
            // Redirecionar para a tela de pedidos após o login bem-sucedido
            window.location.href = 'pedido.html';
        } else {
            showMessage(result.message || 'Erro ao fazer login. Verifique suas credenciais.', 'error');
        }

    } catch (error) {
        console.error('Erro:', error);
        showMessage('Ocorreu um erro na ligação com o servidor.', 'error');
    }
});