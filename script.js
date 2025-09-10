let lista = [];
let editIndex = -1;

// Carrega a lista do localStorage ao iniciar
function carregarLista() {
    const listaSalva = localStorage.getItem("listaCompras");
    lista = listaSalva ? JSON.parse(listaSalva) : [];
}

// Salva a lista no localStorage
function salvarLista() {
    localStorage.setItem("listaCompras", JSON.stringify(lista));
}

function renderizarLista() {
    const listaUl = document.getElementById("lista");
    listaUl.innerHTML = "";

    lista.forEach((item, index) => {
        listaUl.innerHTML += `
          <li class="list-group-item d-flex justify-content-between align-items-center ${item.comprado ? 'item-comprado' : ''}">
            <span>${item.nome} <strong>(${item.qtd})</strong></span>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-success btn-action" title="Marcar como comprado" onclick="marcarComprado(${index})">✔</button>
              <button class="btn btn-sm btn-warning btn-action" title="Editar" onclick="editarProduto(${index})">✏</button>
              <button class="btn btn-sm btn-danger btn-action" title="Excluir" onclick="excluirProduto(${index})">🗑</button>
            </div>
          </li>
        `;
    });
}

function adicionarProduto() {
    const inputNome = document.getElementById("produto");
    const inputQtd = document.getElementById("quantidade");

    const nome = inputNome.value.trim();
    const qtd = inputQtd.value.trim() || 1;

    if (nome === "") {
        alert("Digite um produto!");
        return;
    }

    if (editIndex === -1) {
        lista.push({ nome, qtd, comprado: false });
    } else {
        lista[editIndex].nome = nome;
        lista[editIndex].qtd = qtd;
        editIndex = -1;
    }

    inputNome.value = "";
    inputQtd.value = "";
    salvarLista();
    renderizarLista();
}

function editarProduto(index) {
    document.getElementById("produto").value = lista[index].nome;
    document.getElementById("quantidade").value = lista[index].qtd;
    editIndex = index;
}

function excluirProduto(index) {
    lista.splice(index, 1);
    salvarLista();
    renderizarLista();
}

function marcarComprado(index) {
    lista[index].comprado = !lista[index].comprado;
    salvarLista();
    renderizarLista();
}

function limparLista() {
    if (confirm("Tem certeza que deseja limpar toda a lista?")) {
        lista = [];
        salvarLista();
        renderizarLista();
    }
}

// Inicializa a lista ao carregar a página
window.onload = function() {
    carregarLista();
    renderizarLista();
};