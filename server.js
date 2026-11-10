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