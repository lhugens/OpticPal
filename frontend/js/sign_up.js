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

async function signUpUser() {
    try {
        const customer = validateSignUpForm();
        console.log("Sending customer data:", JSON.stringify(customer)); // Debug log

        const response = await fetch("http://127.0.0.1:8080/opticpal/api/auth/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        });

        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody.message || "Falha no Sign Up.";
            throw new Error(errorMessage);
        }

        // Store the user data in localStorage for later use
        localStorage.setItem("user", JSON.stringify(customer));

        console.log("Sign up successful!");
        window.location.replace("button_app.html");

    } catch (error) {
        console.error("Error during signup:", error); // Debug log
        handleError(error.message);
    }
}


// Adicionar o evento ao botão de login
document.getElementById("submitButton").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    signUpUser();
});