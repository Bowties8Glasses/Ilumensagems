const usrAPI_URL = 'http://localhost:3000/usuarios'; 

// Guarda informaçao sobre a Conta sendo usada
let nomeLog = null
let emailLog = null
let senhaLog = null
let plt1Log = null
let plt2Log = null
let plt3Log = null
let plt4Log = null

// Simulaçao de Token
const simId = getCookie('Id')

// Obtem Informaçao da Conta com o ID salvo no Token
if (simId) {
    fetch(`${usrAPI_URL}/${simId}`, {
        method: 'GET' ,
        
    })
    .then(response => response.json()) 
    .then(data => {
            const navbar = document.getElementById('navbar'); 
                navbar.innerHTML = `<ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="view.html">Sua Caixa</a></li>
                <li><a href="config.html">Configuraçoes</a></li>
              </ul>`;
            nomeLog = data.nome
            emailLog = data.email
            senhaLog = data.senha
            plt1Log = data.plt1
            plt2Log = data.plt2
            plt3Log = data.plt3
            plt4Log = data.plt4
            document.getElementById("plt1").value = plt1Log
            document.getElementById("plt2").value = plt2Log
            document.getElementById("plt3").value = plt3Log
            document.getElementById("plt4").value = plt4Log
        })
    .catch(error =>  console.error('Erro:', error)); 
}else{
    const navbar = document.getElementById('navbar');
                navbar.innerHTML = `<ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="register.html">Criar Conta</a></li>
                <li><a href="login.html">Entrar</a></li>
              </ul>`;
}

// Função para criar um novo usuário
function adicionarUsuario() {
    const nome = document.getElementById('nome').value; 
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value; 

    const plt1 = document.getElementById("plt1").value;
    const plt2 = document.getElementById("plt2").value;
    const plt3 = document.getElementById("plt3").value;
    const plt4 = document.getElementById("plt4").value;
    const fundo = "#FFFFFF";

    fetch(usrAPI_URL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ nome, email, senha, plt1, plt2, plt3, plt4, fundo }) 
    })
    .then(response => response.text()) 
    .then(data => {
        alert(data);
        limparFormulario(); 
        window.location.replace("index.html")
    })
    .catch(error => console.error('Erro:', error)); 
}

// Funçao para deletar um usuário
function deletarUsuario(id) {
    fetch(`${usrAPI_URL}/${id}`, {
        method: 'DELETE' 
    })
    .then(response => response.text()) 
    .then(data => {
        alert(data); 
        obterUsuarios(); 
    })
    .catch(error => console.error('Erro:', error)); 
}

// Funçoes para atualizar dados individuais da conta
function mudarNome(){
    const novoNome = document.getElementById('novo-nome').value

    atualizarConta(simId, novoNome, emailLog, senhaLog, plt1Log, plt2Log, plt3Log, plt4Log)
} 
function mudarSenha(){
    const senhaCheck = document.getElementById('senha-ativa').value
    const novaSenha = document.getElementById('nova-senha').value
    if (senhaCheck === senhaLog) {
        atualizarConta(simId, nomeLog, emailLog, novaSenha, plt1Log, plt2Log, plt3Log, plt4Log)
    }else{
        alert("Senha Incorreta")
    }
}
function mudarEmail(){
    const emailCheck = document.getElementById('email-ativo').value
    const novoEmail = document.getElementById('novo-email').value
    if (emailCheck === emailLog) {
        atualizarConta(simId, nomeLog, novoEmail, senhaLog, plt1Log, plt2Log, plt3Log, plt4Log)
    }else{
        alert("Senha Incorreta")
    }
}
function mudarPlt(){
    const novaPlt1 = document.getElementById('plt1').value
    const novaPlt2 = document.getElementById('plt2').value
    const novaPlt3 = document.getElementById('plt3').value
    const novaPlt4 = document.getElementById('plt4').value

    atualizarConta(simId, nomeLog, emailLog, senhaLog, novaPlt1, novaPlt2, novaPlt3, novaPlt4)
} 

// Funçao geral para atualizar conta
function atualizarConta(id, nome, email, senha, plt1, plt2, plt3, plt4) {
    fetch(`${usrAPI_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ nome, email, senha, plt1, plt2, plt3, plt4 }) 
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        window.location.replace("config.html")
    })
    .catch(error => console.error('Erro:', error));; 
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }







