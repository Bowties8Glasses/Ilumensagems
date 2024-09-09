const API_URL = 'http://localhost:3000/usuarios';
const PLT_PARAM = new URLSearchParams(window.location.search);

// Dados do canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Botoes
const smallBtn = document.getElementById("small");
const mediumBtn = document.getElementById("medium");
const bigBtn = document.getElementById("large");

const clr1 = document.getElementById("clr1");
const clr2 = document.getElementById("clr2");
const clr3 = document.getElementById("clr3");
const clr4= document.getElementById("clr4");
const eraseBtn = document.getElementById("erase");

const clearBtn = document.getElementById("clear");
const saveBtn = document.getElementById("save");

// Variaveis da palleta de cores  
let plt1 = "brown";
let plt2 = "orange";
let plt3 = "blue";
let plt4 = "green";
let canvBg = "white";

// Tamanho
let size = 4; 
// Cor
let color = plt1;

// Pega o ID do usuario destinario pelo QueryString
const pltId = PLT_PARAM.get("id");
if (pltId === null){
    window.location.replace("index.html")
}

//  Atualiza a pagina com os dados do usuario destinario
fetch(`${API_URL}/${pltId}`, {
    method: 'GET'
})
.then(response => response.json()) 
.then(data => {
        // Insere o nome do usuario destinario
        const caixaUsuario = document.getElementById('rcpt'); 
            caixaUsuario.innerHTML = data.nome;
        
        // Insere a paleta de cores do usuario destinario
        plt1 = data.plt1
        plt2 = data.plt2
        plt3 = data.plt3
        plt4 = data.plt4
        canvBg = data.fundo

        // Coloriza os botoes correspondentes
        document.getElementById('clr1').style.backgroundColor = data.plt1
        document.getElementById('clr2').style.backgroundColor = data.plt2
        document.getElementById('clr3').style.backgroundColor = data.plt3
        document.getElementById('clr4').style.backgroundColor = data.plt4

        color = plt1; // Atualiza cor padrao
        canvasClear(); // Adiciona o fundo do canvas
    })
.catch(error =>  console.error('Erro:', error));

// Informaçoes do mouse
let isPressed = false;
let x = undefined;
let y = undefined;

// Pega a posiçao do Mouse quando precionado
canvas.addEventListener("mousedown", (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});
canvas.addEventListener("mouseup", (e) =>{
    isPressed = false;

    x = e.offsetX;
    y = e.offsetY;

});

// Detecta movimentos do Mouse
canvas.addEventListener("mousemove", (e) =>{
    if (isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2);
        drawLine(x, y. x2, y2);
        x = x2;
        y = y2;
    }
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
};

function drawLine (x, y, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

// Muda o tamanho do pincel
smallBtn.addEventListener("click", () => {
    size = 4
});
mediumBtn.addEventListener("click", () => {
    size = 8
});
bigBtn.addEventListener("click", () => {
    size = 12
});

// Muda a cor do pincel
clr1.addEventListener("click", () => {
    color = plt1
})
clr2.addEventListener("click", () => {
    color = plt2
})
clr3.addEventListener("click", () => {
    color = plt3
})
clr4.addEventListener("click", () => {
    color = plt4
})

// Usa a Borracha
eraseBtn.addEventListener("click", () => {
    color = canvBg
})

// Salva a Imagem
saveBtn.addEventListener('click', (e) => {
    const link = document.createElement('a');
    link.download = 'SeuDesenho.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
})

// Limpa a area de desenho
function canvasClear () {
    ctx.fillStyle = canvBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
clearBtn.addEventListener("click", () => {
        canvasClear();
    })