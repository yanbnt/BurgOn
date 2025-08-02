const funcionarioCadastroForm = document.getElementById('funcionario-cadastro-form');
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

funcionarioCadastroForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(funcionarioCadastroForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/admin/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            showMessage(result.message, 'success');
            // Opcional: limpar o formulário após o sucesso
            funcionarioCadastroForm.reset();
        } else {
            showMessage(result.message || 'Erro ao realizar o cadastro do funcionário.', 'error');
        }

    } catch (error) {
        console.error('Erro:', error);
        showMessage('Ocorreu um erro na ligação com o servidor.', 'error');
    }
});
