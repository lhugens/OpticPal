// Função auxiliar para tratar erros


function handleError(message) {
    console.error(message);
    alert(message);
}

// Função para validar o formulário de login
function validateSignInForm() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Verificar se os campos não estão vazios
    if (!email || !password) {
        throw new Error("Email e senha são obrigatórios!");
    }

    // Validar o formato do email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        throw new Error("E-mail inválido!");
    }

    // Validar a senha (mínimo de 8 caracteres)
    if (password.length < 8) {
        throw new Error("A senha deve ter pelo menos 8 caracteres!");
    }

    return { email, password };
}

// Função para fazer login do usuário
async function signInUser() {
    try {
        // Obter dados do formulário e validá-los
        const { email, password } = validateSignInForm();

        // Criar um objeto com os dados para enviar à API
        const userCredentials = { email, password };

        // Enviar uma requisição para a API de login (ajuste a URL para o seu endpoint de login)
        const response = await fetch("http://localhost:8080/opticalPal/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCredentials),
        });

        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody.message || "Falha no login, verifique suas credenciais.";
            throw new Error(errorMessage);
        }

        // Se o login for bem-sucedido, você pode fazer algo (ex: redirecionar o usuário)
        alert("Login bem-sucedido!");
        // Redirecionar ou armazenar o token, etc.

    } catch (error) {
        handleError(error.message);
    }
}

// Adicionar o evento ao botão de login
document.getElementById("loginButton").addEventListener("click", signInUser);