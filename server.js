import express from 'express'

const app = express()
const PORT = 3000

// Rota 1: Página inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à Central de Informações da Escola!')
})

// Rota 2: Status do servidor
app.get('/status', (req, res) => {
  res.json({
    status: 'online',
    mensagem: 'O servidor está funcionando corretamente.'
  })
})

// Rota 3: Informações da escola
app.get('/escola', (req, res) => {
  res.json({
    nome: 'Escola Técnica Horizonte',
    cidade: 'São Paulo',
    tipo: 'Ensino Técnico'
  })
})

// Rota 4: Lista de cursos
app.get('/cursos', (req, res) => {
  const cursos = [
    { id: 1, nome: 'Desenvolvimento de Sistemas' },
    { id: 2, nome: 'Redes de Computadores' },
    { id: 3, nome: 'Administração' }
  ]

  res.json(cursos)
})

// Rota 5: Informações do professor
app.get('/professor', (req, res) => {
  res.json({
    nome: 'Carlos Oliveira',
    disciplina: 'Programação Back-End'
  })
})

// Rota 6: Orientações de ajuda
app.get('/ajuda', (req, res) => {
  res.send(
    'Rotas disponíveis:\n' +
    '/ - Página inicial e boas-vindas.\n' +
    '/status - Verifica se o servidor está online.\n' +
    '/escola - Exibe informações da instituição.\n' +
    '/cursos - Lista os cursos disponíveis.\n' +
    '/professor - Exibe informações do professor.\n' +
    '/ajuda - Apresenta esta lista de orientações.\n' +
    '/requisicao - Exibe dados da requisição recebida.'
  )
})

// Desafio extra: Investigando o req
app.get('/requisicao', (req, res) => {
  res.json({
    metodo: req.method,
    caminho: req.path,
    mensagem: 'Requisição recebida com sucesso.'
  })
})

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})


//Sprint-02

const mensagens = [
  { id: 1, usuario: 'Ana', texto: 'Bem-vindo à Central de Informações da Escola!' },
  { id: 2, usuario: 'Pedro', texto: 'Quando começam as aulas de Desenvolvimento de Sistemas?' },
  { id: 3, usuario: 'Maria', texto: 'Onde encontro a lista de cursos disponíveis?' },
  { id: 4, usuario: 'Lucas', texto: 'Qual o horário de atendimento do professor Carlos?' },
  { id: 5, usuario: 'Carla', texto: 'Muito obrigada pelas orientações!' }
]
function listarMensagens() { return mensagens; }

app.get("/", (req, res) => res.send("Servidor rodando! 🚀"));

app.get("/status", (req, res) => res.json({ status: "online", sprint: 2 }));

app.get("/sobre", (req, res) => res.send("Projeto Mensageiro Local"));

app.get("/mensagens", (req, res) => res.json(listarMensagens()));

app.get("/mensagens/:id", (req, res) => {
  const mensagem = mensagens.find(m => m.id === Number(req.params.id));
  if (!mensagem) return res.status(404).json({ erro: "Não encontrada" });
  res.json(mensagem);
});

app.get("/total-mensagens", (req, res) => res.json({ total: mensagens.length }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});
//Sprint 03

import express from "express";

const app = express();

const PORT = 3000;

const mensagens = [{ id: 1, usuario: "Rafaela", texto: "Bom dia!" }, { id: 2, usuario: "Sophia", texto: "Olá!" }];

function consultar(simularErro = false) { return new Promise((resolve, reject) => { setTimeout(() => { if (simularErro) return reject(new Error("Falha simulada"));
resolve(mensagens); }, 1000); }); }

app.get("/mensagens-then", (req, res) => { consultar().then(lista => res.json(lista)).catch(() => res.status(500).json({ erro: "Falha na consulta" })); });

app.get("/mensagens-async", async (req, res) => { try { res.json(await consultar()); } catch (erro) { res.status(500).json({ erro: "Falha na consulta" }); } });

app.get("/mensagens-erro", async (req, res) => { try { res.json(await consultar(true)); } catch (erro) { res.status(500).json({ erro: "Falha simulada" }); } });

app.listen(PORT, "0.0.0.0", () => { console.log(`Servidor em http://localhost:${PORT}`); });