const adminLoginForm = document.getElementById('admin-login-form');
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

adminLoginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(adminLoginForm); // Coleta os dados do formulário
    const data = Object.fromEntries(formData.entries()); // Converte FormData para um objeto
    console.log('Dados do formulário:', data); //debugging
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
            localStorage.setItem('adminAuthToken', result.token);
            // Redirecionar para o painel de administrador
            // window.location.href = 'admin_dashboard.html';
        } else {
            showMessage(result.message || 'Erro ao fazer login. Verifique as credenciais.', 'error');
        }

    } catch (error) {
        console.error('Erro:', error);
        showMessage('Ocorreu um erro na ligação com o servidor.', 'error');
    }
});
