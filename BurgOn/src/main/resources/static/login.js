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
            // ARMAZENAR TODOS OS DADOS NECESSÁRIOS NO LOCAL STORAGE
            localStorage.setItem('authToken', result.token);
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('nome', result.nome);
            localStorage.setItem('email', result.email);
            localStorage.setItem('idCargo', result.idCargo); // 0 - Cliente, 1 - Cozinheiro, 2 - Administrador
            console.log('Id:', result.idCargo);
            //AQUI É AONDE VAMOS DIRECIONAR O USUÁRIO PARA A PÁGINA CORRETA
            if( result.idCargo==1)
                window.location.href = 'cozinheiro.html'; // Redirecionar para a tela do cozinheiro
            else if( result.idCargo==2)
                window.location.href = 'adm-entrega.html'; // Redirecionar para a tela do administrador
            else if( result.idCargo==0)
                window.location.href = 'pedido.html';
            
        } else {
            showMessage(result.message || 'Erro ao fazer login. Verifique suas credenciais.', 'error');
        }

    } catch (error) {
        console.error('Erro:', error);
        showMessage('Ocorreu um erro na ligação com o servidor.', 'error');
    }
});