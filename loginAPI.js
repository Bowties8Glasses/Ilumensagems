const logAPI_URL = 'http://localhost:3000/login'; // URL da API para a gestão dos usuários

function entrarConta() {
    const email = document.getElementById('email').value; 
    const senha = document.getElementById('senha').value; 

    fetch(logAPI_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({email, senha }) // Converte os dados para JSON
    })
    .then(response => response.text()) // Converte a resposta para texto
    .then(data => {
        if (data === 'nome ou senha incorreto'){
            alert(data)
            window.location.replace("login.html")
        } else {
            document.cookie = `Id=${encodeURIComponent(data)}; max-age=3600; SameSite=None; secure`
            alert('Bem Vindo!')
            window.location.replace("view.html")
        }
    })
    .catch(error => console.error('Erro:', error)); // Captura e exibe erros
}