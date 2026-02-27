# FLOW7 — Site estático para loja

Pequeno site mobile-first estático com catálogo, carrinho, cupom e mensagem de finalização.

Características implementadas:
- Catálogo com produtos Nike e Adidas (exemplos)
- Carrinho com quantidade e persistência em `localStorage`
- Cupons disponíveis:
  - `ALMICEA` → 30% de desconto
  - `SENAC` → 25% de desconto
- Ao finalizar a compra exibe: **OBRIGADO POR ASSISTIR A NOSSA APRESENTAÇÃO.**

Arquivos principais:
- `index.html` — página principal
- `styles.css` — estilos mobile-first
- `app.js` — lógica do catálogo, carrinho e checkout
- `flow7 logo.png` — logo (arquivo já fornecido no repositório raiz)

Como testar localmente (Node.js):
1. Abra a pasta do projeto no terminal.
2. Instale dependências e inicie o servidor:

```bash
npm install
npm start
```

3. Abra `http://localhost:3000` no navegador móvel ou emulador.

Observações para deploy no Vercel:
- Este projeto roda como site estático ou via Node.js. Para deploy estático, conectar o repositório no Vercel funciona automaticamente.
- Se quiser usar o servidor Node (`server.js`), configure o Vercel para usar um `serverless function` ou selecione a opção de Deploy como Node (ou deixe como está e deployará os arquivos estáticos).
- Certifique-se de que o arquivo `flow7 logo.png` permaneça na raiz do repositório (o `index.html` referencia-o como `flow7%20logo.png`).

Se quiser que eu gere um `vercel.json` ou configure o deploy automático, posso preparar isso para você.

Repositório remoto: https://github.com/PauloLisboa7/FLOW7.git
Contato: paulolisboaa7@gmail.com
