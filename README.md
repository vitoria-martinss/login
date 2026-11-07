# Meu Login (React + Vite)

Tela de login que recebe um `access_token` de uma API simulada.
O "banco de dados" é um array dentro do código (`src/db/database.js`).

## Estrutura

    src/
      db/database.js            banco simulado (usuários)
      services/authService.js   API simulada: login, getToken, logout
      pages/Login.jsx           tela de login
      pages/Login.css           estilos
      App.jsx                   alterna entre login e tela logada
      main.jsx                  ponto de entrada

## Usando uma API real

Em `src/services/authService.js`, troque a função `login` pelo `fetch`
que está no comentário no final do arquivo.

Aviso: senha em texto puro no front-end serve só para estudo.
