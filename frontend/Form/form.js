const url = "http://localhost:8080/opticalPal/api/user";

// Função auxiliar para tratar erros
function handleError(message) {
    console.error(message);
    alert(message);
}

// Valida os campos do formulário
function validateForm() {
    const userType = document.getElementById("userType").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const password = document.getElementById("password").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const age = document.getElementById("age").value.trim();

    if (!firstName || !lastName || !email || !phone || !password || !gender || !age || !userType) {
        throw new Error("Todos os campos são obrigatórios!");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("E-mail inválido!");
    }

    if (!/^\+?\d+$/.test(phone)) {
        throw new Error("Número de telefone inválido! Apenas dígitos são permitidos, com a possibilidade de começar com '+'.");
    }

    if (password.length < 8) {
        throw new Error("A senha deve ter pelo menos 8 caracteres!");
    }

    if (gender !== "male" && gender !== "female" && gender !== "non binary") {
        throw new Error("Genero inválido!");
    }

    if (!/^\d+$/.test(age)) {
        throw new Error("Idade inválida! Apenas dígitos sao permitidos.");
    }

    if (userType !== "In need" && userType !== "Volunteer") {
        throw new Error("User type inválido!");
    }

    return { firstName, lastName, email, phone, password, gender, age, userType };
}



// Adiciona um novo user
async function addUser() {
    try {
        const user = validateForm();

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Fail to add User");
        }
        reset();
    } catch (error) {
        handleError(error.message);
    }
}

// Atualiza os dados de um cliente
async function updateUser() {
    const userId = document.getElementById("userId").value;
    if (!userId) {
        handleError("Select a User to update");
        return;
    }

    try {
        const user = validateForm();

        const response = await fetch(`${url}/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Fail to update User");
        }
        reset();
    } catch (error) {
        handleError(error.message);
    }
}

// Limpa o formulário
function reset() {
    document.getElementById("form").reset();
    document.getElementById("userId").value = "";
}

// Event listeners
document.getElementById("add").addEventListener("click", addUser);
document.getElementById("reset").addEventListener("click", reset);
