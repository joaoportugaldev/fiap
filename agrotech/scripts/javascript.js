document.addEventListener("DOMContentLoaded", function () {
  // Mock de alimentos iniciais
  const mockDoacoes = [
    {
      nomeProduto: "Arroz (5kg)",
      quantidade: 12,
      validade: "",
      data: "10/06/2024",
      doador: "João Silva",
    },
    {
      nomeProduto: "Feijão (1kg)",
      quantidade: 20,
      validade: "",
      data: "09/06/2024",
      doador: "Maria Oliveira",
    },
    {
      nomeProduto: "Macarrão (500g)",
      quantidade: 15,
      validade: "",
      data: "08/06/2024",
      doador: "Carlos Souza",
    },
    {
      nomeProduto: "Óleo de soja (900ml)",
      quantidade: 8,
      validade: "",
      data: "07/06/2024",
      doador: "Ana Lima",
    },
    {
      nomeProduto: "Leite (1L)",
      quantidade: 10,
      validade: "",
      data: "06/06/2024",
      doador: "Pedro Santos",
    },
  ];

  // Se não houver doações salvas, inicializa com os mockados
  if (!localStorage.getItem("doacoesAgrotech")) {
    localStorage.setItem("doacoesAgrotech", JSON.stringify(mockDoacoes));
  }

  // Mock de usuários iniciais
  const mockUsuarios = [
    {
      nome: "João Silva",
      email: "joao.silva@email.com",
      tipo: "doador"
    },
    {
      nome: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      tipo: "beneficiario"
    },
    {
      nome: "Carlos Souza",
      email: "carlos.souza@email.com",
      tipo: "doador"
    },
    {
      nome: "Ana Lima",
      email: "ana.lima@email.com",
      tipo: "beneficiario"
    }
  ];

  // Se não houver usuários salvos, inicializa com os mockados
  if (!localStorage.getItem("usuariosAgrotech")) {
    localStorage.setItem("usuariosAgrotech", JSON.stringify(mockUsuarios));
  }

  // Exibir doações na página doacoes.html
  const foodList = document.getElementById("foodList");
  if (foodList) {
    const doacoes = JSON.parse(localStorage.getItem("doacoesAgrotech") || "[]");
    // Limpa a lista padrão (caso exista)
    foodList.innerHTML = "";
    doacoes.forEach(function (item) {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-center flex-column flex-md-row";
      li.innerHTML = `
        <div>
          <strong>${item.nomeProduto}</strong><br />
          <small class="text-muted">Doador: ${
            item.doador || "Anônimo"
          } | Data: ${item.data}</small>
        </div>
        <span class="badge bg-success rounded-pill align-self-md-center mt-2 mt-md-0">${
          item.quantidade
        } unidade(s)</span>
      `;
      foodList.appendChild(li);
    });
  }

  // Exibir usuários na página usuarios.html
  const userList = document.getElementById("userList");
  if (userList) {
    const usuarios = JSON.parse(localStorage.getItem("usuariosAgrotech") || "[]");
    userList.innerHTML = "";
    usuarios.forEach(function (user) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center flex-column flex-md-row";
      li.innerHTML = `
        <div>
          <i class="fas fa-user"></i> <strong>${user.nome}</strong><br />
          <small class="text-muted">${user.email}</small>
        </div>
        <span class="badge bg-primary rounded-pill align-self-md-center mt-2 mt-md-0 text-capitalize">${user.tipo}</span>
      `;
      userList.appendChild(li);
    });
  }
});

document.getElementById("foodForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const nomeProduto = document.getElementById("nomeProduto").value;
  const quantidade = document.getElementById("quantidade").value;
  const validade = document.getElementById("validade").value;

  if (!nomeProduto || !quantidade || !validade) {
    alert("Preencha todos os campos!");
    return;
  }

  // Salvar no localStorage
  const doacoes = JSON.parse(localStorage.getItem("doacoesAgrotech") || "[]");
  const novaDoacao = {
    nomeProduto,
    quantidade,
    validade,
    data: new Date().toLocaleDateString("pt-BR"),
    doador: "Anônimo", // Pode ser adaptado para pegar o nome do usuário logado
  };
  doacoes.unshift(novaDoacao);
  localStorage.setItem("doacoesAgrotech", JSON.stringify(doacoes));

  // Limpar formulário
  document.getElementById("foodForm").reset();
  alert("Alimento cadastrado com sucesso! Ele aparecerá na página de Doações.");
});

// Cadastro de usuários
const userForm = document.getElementById("userForm") || document.getElementById("cadastroForm");
const userList = document.getElementById("userList");

if (userForm) {
  userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Detecta se é o formulário de cadastro.html ou usuarios.html
    const nome = document.getElementById("nomeUsuario")?.value?.trim() || document.getElementById("nome")?.value?.trim();
    const email = document.getElementById("emailUsuario")?.value?.trim() || document.getElementById("email")?.value?.trim();
    // Para cadastro.html não há tipo, assume 'doador' por padrão
    const tipo = document.getElementById("tipoUsuario")?.value || "doador";
    if (!nome || !email) {
      alert("Preencha todos os campos do usuário!");
      return;
    }
    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Digite um email válido!");
      return;
    }
    // Salvar no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuariosAgrotech") || "[]");
    usuarios.unshift({ nome, email, tipo });
    localStorage.setItem("usuariosAgrotech", JSON.stringify(usuarios));
    // Atualiza lista se estiver na página usuarios.html
    if (userList) {
      userList.innerHTML = "";
      usuarios.forEach(function (user) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center flex-column flex-md-row";
        li.innerHTML = `
          <div>
            <i class='fas fa-user'></i> <strong>${user.nome}</strong><br />
            <small class='text-muted'>${user.email}</small>
          </div>
          <span class='badge bg-primary rounded-pill align-self-md-center mt-2 mt-md-0 text-capitalize'>${user.tipo}</span>
        `;
        userList.appendChild(li);
      });
    }
    userForm.reset();
    setTimeout(function() { alert("Usuário cadastrado com sucesso!"); }, 10);
  });
}
