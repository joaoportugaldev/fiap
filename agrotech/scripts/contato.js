// Persistência de mensagens de contato usando localStorage
const contatoForm = document.getElementById("contatoForm");
const mensagensList = document.getElementById("mensagensList");

function renderMensagens() {
  mensagensList.innerHTML = "";
  const mensagens = JSON.parse(
    localStorage.getItem("mensagensContato") || "[]"
  );
  mensagens.forEach((msg, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `<i class='fas fa-user'></i> <strong>${msg.nome}</strong> (${msg.email}):<br><span>${msg.mensagem}</span>`;
    mensagensList.appendChild(li);
  });
}

if (contatoForm) {
  contatoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nomeContato").value.trim();
    const email = document.getElementById("emailContato").value.trim();
    const mensagem = document.getElementById("mensagemContato").value.trim();
    if (!nome || !email || !mensagem) {
      alert("Preencha todos os campos!");
      return;
    }
    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Digite um email válido!");
      return;
    }
    alert(
      `Mensagem enviada com sucesso!\n\nNome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
    );
    const mensagens = JSON.parse(
      localStorage.getItem("mensagensContato") || "[]"
    );
    mensagens.push({ nome, email, mensagem });
    localStorage.setItem("mensagensContato", JSON.stringify(mensagens));
    renderMensagens();
    contatoForm.reset();
  });
  renderMensagens();
}
