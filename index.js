const API_URL = 'http://localhost:3000';
const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

// Função para carregar usuários
async function loadUsers() {
    const response = await fetch(`${API_URL}/usuarios`);
    const users = await response.json();
    userTable.innerHTML = '';
    users.forEach(user => {
        const row = userTable.insertRow();
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>
                <button onclick="editUser('${user.id}', '${user.name}', '${user.email}', ${user.age})">Editar</button>
                <button onclick="deleteUser('${user.id}')">Excluir</button>
            </td>
        `;
    });
}

// Função para criar/atualizar usuário
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value
    };

    if (userId) {
        await fetch(`${API_URL}/usuarios/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
    } else {
        await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
    }

    userForm.reset();
    document.getElementById('userId').value = '';
    loadUsers();
});

// Função para editar usuário
function editUser(id, name, email, age) {
    document.getElementById('userId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('age').value = age;
}

// Função para excluir usuário
async function deleteUser(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        await fetch(`${API_URL}/usuarios/${id}`, { method: 'DELETE' });
        loadUsers();
    }
}

// Carrega os usuários ao iniciar a página
loadUsers();