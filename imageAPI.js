const imgAPI_URL = 'http://localhost:3000/imagems'; // URL da API para a gestão dos usuários

// Pega QueryString do URL
const RCPT_PARAM = new URLSearchParams(window.location.search);
const rcptId = RCPT_PARAM.get("id")
const usrId = grabCookie('Id')


// Preparaçao inicial para enviar imagem, gera uma string unica 
function sendClick() {
        fetch(imgAPI_URL)
        .then(response => response.json()) // Converte a resposta para JSON
        .then(data => {
            let imgGen = 'dummy'
            data.forEach(imgtbl => { // Itera sobre cada usuário
                if (imgtbl.imagem === imgGen){
                imgGen = gerarString(11)
                }});  
            console.log(imgGen) 
            enviarIlu(imgGen)
        })  
        .catch(error => console.error('Erro:', error)); // Captura e exibe erros
    
}

// Envia a imagem
function enviarIlu(nome) {
    // Dados para a tabela de imagems
    const imagem = nome;
    const recipiente = rcptId;

    // Dados para o arquivo da imagem
    let imgString = window.canvas.toDataURL()
    let imgData = imgString.split(';base64,').pop();

    fetch(imgAPI_URL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({imagem, recipiente, imgData}) 
    })
    .then(response => response.text()) 
    .then(data => {
        alert(data); 
    })
    .catch(error => console.error('Erro:', error)); 
}

// Apresenta os desenhos no pagina "Sua Caixa"
function obterIlu(user) {
   //Gera o link para a onde envia desenhos
    drawAdress = document.getElementById('draw-link')
    drawAdress.innerHTML = `<a href="draw.html?id=${user}">ilumensagems.com/draw?id=${user}</a>`
    
    fetch(imgAPI_URL, {
        method: 'GET',
    })
    .then(response => response.json()) 
    .then(data => {
        const listaImagems = document.getElementById('caixa-desenhos'); 
        listaImagems.innerHTML = ''; 
        data.forEach(caixa => { 
            const li = document.createElement('li'); 
            // Solução band-aid para apenas mostrar apenas a imagems feitas para o usuario, nao consegui fazer pelo server.js  
            if (caixa.recipiente === user){
                li.innerHTML = `<img src=file/${caixa.imagem}.png> <br> <button onclick="deletarIlu(${caixa.id})">Deletar</button> <br>`; 
                listaImagems.appendChild(li);
            }
        });
    })
    .catch(error => console.error('Erro:', error)); // Captura e exibe erros
}

// Funçao para deletar desenho
function deletarIlu(id) {
    fetch(`${imgAPI_URL}/${id}`, {
        method: 'DELETE' 
    })
    .then(response => response.text()) 
    .then(data => {
        alert(data); 
        obterIlu(); 
    })
    .catch(error => console.error('Erro:', error)); 
}

// Gera uma string aleatotia (usada com sendClick)
function gerarString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
} 

function grabCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

obterIlu(Number(usrId))

