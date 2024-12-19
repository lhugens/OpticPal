/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function handleError(message) {
    alert(message);
}

// Função para validar o formulário de login
function validateSignUpForm() {
    let userType = document.getElementById("userType").value.trim();
    if(userType === "inNeed"){
        userType = "IN_NEED";
    }
    if(userType === "volunteer"){
        userType = "VOLUNTEER";
    }
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value.trim();
    let gender = document.getElementById("gender").value.trim();
    gender = gender.toUpperCase();
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

    const customer = { userType, firstName, lastName, email, password, phone, age, gender };

    return customer;
}

// Função para fazer login do usuário
async function signUpUser() {
    try {
        // Obter dados do formulário e validá-los
        const customer = validateSignUpForm();

        // Enviar uma requisição para a API de login (ajuste a URL para o seu endpoint de login)
        const response = await fetch("http://127.0.0.1:8080/opticpal/api/auth/signup", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        });

        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody.message || JSON.stringify( "Falha no Sign Up.");

            throw new Error(errorMessage);
        }

        // Se o login for bem-sucedido, você pode fazer algo (ex: redirecionar o usuário)
        alert("Sign Up bem sucedido!");
        // Redirecionar ou armazenar o token, etc.

    } catch (error) {
        handleError(error.message);
    }
}

// Adicionar o evento ao botão de login
document.getElementById("submitButton").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    signUpUser();
});