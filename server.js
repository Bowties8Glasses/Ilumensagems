const express = require('express'); // Importa o pacote Express
const mysql = require('mysql2'); // Importa o pacote MySQL2
const bodyParser = require('body-parser'); // Importa o pacote Body-Parser
const cors = require('cors'); // Importa o pacote CORS
const fs = require('fs');// Chama o FileSystem


const app = express(); // Cria uma nova aplicação Express
app.use(bodyParser.json()); // Usa o Body-Parser para lidar com dados JSON
app.use(cors()); // Usa o CORS para permitir requisições de outras origens


// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost', // Endereço do servidor MySQL -- Se está no mesmo computador/servidor que este código, então é localhost. Se está em um servidor remoto, você deve inserir o IP do servidor.
  user: 'root', // Nome de usuário do MySQL
  password: '', // Senha do MySQL (vazia para configuração padrão do XAMPP)
  database: 'ilubank' // Nome do banco de dados
});

// Conectar ao banco de dados
connection.connect(error => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados: ' + error.stack); // Exibe um erro se a conexão falhar
    return;
  }
  console.log('Conectado ao banco de dados com ID ' + connection.threadId); // Confirma a conexão bem-sucedida
});


// Usuarios
// Endpoint para adicionar um usuário (POST)
app.post('/usuarios', (req, res) => {
  const { nome, email, senha, plt1, plt2, plt3, plt4, fundo } = req.body; 
  const sql = 'INSERT INTO usuarios (nome, email, senha, plt1, plt2, plt3, plt4, fundo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'; 
  connection.query(sql, [nome, email, senha, plt1, plt2, plt3, plt4, fundo], (error, results) => {
    if (error) {
      res.status(500).send('Erro a Criar Conta.'); 
      return;
    }
    res.status(201).send('Conta Criada com sucesso! acesse pela pagina de entrada'); 
  });
});

// Endpoint para obter todos os usuários (GET)
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      res.status(500).send('Erro ao obter usuários.'); 
      return;
    }
    res.json(results);
  });
});

// Endpoint para obter um usuário por ID (GET)
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params; 
  connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).send('Erro ao obter usuário.'); 
      return;
    }
    res.json(results[0]); 
  });
});

// Endpoint para atualizar um usuário (PUT)
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params; // Obtém o ID do usuário dos parâmetros da URL
  const { nome, email, senha, plt1, plt2, plt3, plt4} = req.body; // Obtém os novos dados do usuário do corpo da requisição
  const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ?, plt1 = ?, plt2 = ?, plt3 = ?, plt4 = ? WHERE id = ?'; 

  connection.query(sql, [ nome, email, senha, plt1, plt2, plt3, plt4, id], (error, results) => {
    if (error) {
      res.status(500).send('Erro ao atualizar usuário.');
      return;
    }
    res.send('Usuário atualizado com sucesso.'); 
  });
});

// Endpoint para deletar um usuário (DELETE)
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).send('Erro ao deletar usuário.'); 
      return;
    }
    res.send('Usuário deletado com sucesso.'); 
  });
});

// Imagems
// Endpoint para adicionar uma imagem  (POST)
app.post('/imagems', (req, res) => {
  const {imagem, recipiente, imgData} = req.body; 
  const sql = 'INSERT INTO imagems (imagem, recipiente) VALUES (?, ?)'; 
    connection.query(sql, [imagem, recipiente], (error, results) => {
     if (error) {   
     res.status(500).send('Erro a Criar Conta.');
      return;
   }
   // Cria o arquivo da Imagem
   fs.writeFile(`file/${imagem}.png`, imgData, 'base64', err => {
    if (err) {
      console.error(err);
    }
  });
   res.status(201).send('Imagem enviada'); 
   });
   
});

// Endpoint para obter imagems  (GET)
app.get('/imagems', (req, res) => {
  connection.query('SELECT * FROM imagems' , (error, results) => {
    if (error) {
      res.status(500).send('Erro ao obter usuários.');
      return;
    }
    res.json(results); 
  });
});

// Endpoint para deletar uma imagem (DELETE)
app.delete('/imagems/:id', (req, res) => {
  const { id } = req.params; 
  
//Deleta os dados da imagem da tabela
  connection.query('DELETE FROM imagems WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).send('Erro ao deletar imagem.');
      return;
    }
    res.send('Imagem deletada com sucesso.'); 
  })
});


//Login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      res.status(500).send('Erro a Conectar'); 
      return;
    }
    const user = results.find(u => u.email === email && u.senha === senha); 

    if (user) {
      res.json( user.id );
    } else {
      res.status(401).send( 'nome ou senha incorreto' );
    }
  });
  
});


// Iniciar o servidor
const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); 
});
