# Ilumensagems

Aplicativo de caixa de desenhos an&ocirc;nimo, baseado no descontinuado "Secret Drawing Box"

## Requisitos

**-Node.js e npm**

Dependencias: `express` `mysql2` `body-parser` `cors`

**- XAMPP**

para **mySQL** e **Apache**

## Montar o Ambiente

Clone o repositório e execute `npm i` no diretório do projeto para instalar dependências.

Crie em banco de dados com o nome `ilubank` e duas tabelas com o nome `usuarios` e `imagems`, com a estruturas respectiva:
```
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL,
  plt1 VARCHAR(7) NOT NULL,
  plt2 VARCHAR(7) NOT NULL,
  plt3 VARCHAR(7) NOT NULL,
  plt4 VARCHAR(7) NOT NULL,
  fundo VARCHAR(7) NOT NULL
);
```
```
CREATE TABLE imagems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  imagem VARCHAR(11) NOT NULL,
  recipiente INT NOT NULL
);
```
Na tabela `imagems` crie a seguinte tabela:
```
INSERT INTO imagems (imagem, recipiente) VALUES ('dummy', 0)
```
E com isso é pra tudo estar funcionando.


### Documentação, templates e guias usados

**CRUD:** 

https://github.com/LeoSouzaSenac/Backend/blob/main/CRUD.md 

https://github.com/LeoSouzaSenac/Backend/blob/main/CRUD%20com%20FRONT.md


**Layout e CSS:** 

https://goblin-heart.net/sadgrl/projects/layout-builder/


**Aplição de desenho:**

https://www.youtube.com/watch?v=BGQs8_Y2gks 

https://www.youtube.com/watch?v=OcMzCh-MtfI


**Outros:**

https://javascript.info/cookie

https://nodejs.org/api/fs.html

https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
