# Casa do Mar — Restaurante & Marisqueira

Website de demonstração para um restaurante fictício em Setúbal, Portugal. Projeto estático (HTML, CSS e JavaScript puro), sem frameworks nem backend.

## Estrutura do projeto

```
/casa-do-mar
├── index.html          → estrutura e conteúdo da página
├── style.css            → design system e estilos (tokens, layout, responsividade)
├── script.js             → navegação, tabs do menu, lightbox da galeria, validação do formulário
└── assets/
    ├── images/           → pasta reservada para fotografias reais do restaurante
    └── icons/            → pasta reservada para ícones adicionais, se necessário
```

> Nota: as imagens usadas atualmente vêm do Unsplash (fotografias de demonstração, royalty-free) e estão claramente assinaladas com comentários `<!-- Placeholder ... -->` no `index.html`. As pastas `assets/images` e `assets/icons` estão prontas para receber as fotografias reais do cliente.

## Como executar localmente

Não é necessário nenhuma instalação. Basta abrir o `index.html` num navegador, ou, para uma experiência mais próxima da produção (URLs relativos, cache, etc.), servir a pasta com um servidor local simples:

```bash
# Com Python 3
cd casa-do-mar
python3 -m http.server 8000
# depois abrir http://localhost:8000
```

ou, com a extensão "Live Server" do VS Code, basta clicar em "Go Live" com o `index.html` aberto.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo, `casa-do-mar`).
2. Faça upload de todo o conteúdo da pasta `casa-do-mar/` para a raiz do repositório (ou para a branch que preferir).
3. No repositório, aceda a **Settings → Pages**.
4. Em **Source**, selecione a branch (ex.: `main`) e a pasta `/root`.
5. Guarde. Ao fim de alguns minutos, o site fica disponível em:
   `https://<seu-utilizador>.github.io/casa-do-mar/`

Não é necessário nenhum passo de build — é um site 100% estático.

## O que verificar antes de entregar ao cliente

Este projeto foi construído e revisto tendo em conta:

- [x] Todos os links internos (âncoras `#secção`) apontam para IDs existentes.
- [x] Menu mobile (hamburger) abre, fecha ao clicar num link e fecha com a tecla Esc.
- [x] Formulário de reservas com validação em JavaScript (nome, telefone, email, nº de pessoas, data, hora) e mensagem de confirmação; não envia dados para nenhum backend.
- [x] Tabs do menu (Entradas, Peixe, Marisco, Carne, Sobremesas, Bebidas) funcionam sem recarregar a página.
- [x] Lightbox da galeria abre a imagem em ecrã completo e fecha com o botão, clique fora da imagem, ou tecla Esc.
- [x] Responsivo em desktop, tablet e telemóvel (breakpoints em 1080px, 960px, 860px, 720px e 560px).
- [x] Sem dependência de frameworks ou de ligação à internet para funcionar (à exceção das fontes do Google Fonts e das imagens de demonstração do Unsplash).
- [x] Pronto para GitHub Pages (sem processo de build, caminhos relativos).

## O que alterar quando o site for vendido a um restaurante real

1. **Imagens** — substituir todas as fotografias do Unsplash (assinaladas com comentários `<!-- Placeholder ... -->` no `index.html`) por fotografias reais do restaurante, dos pratos e do espaço. Idealmente, guardá-las em `assets/images/` e atualizar os caminhos `src`.
2. **Textos e identidade** — atualizar nome, morada, telefone, email e horário de funcionamento para os dados reais.
3. **Número de WhatsApp** — substituir `351960000000` (usado no botão flutuante e nos botões "Reservar pelo WhatsApp") pelo número real do restaurante. Está assinalado com um comentário no código.
4. **Redes sociais** — atualizar os links do Instagram e do Facebook no rodapé para os perfis reais.
5. **Mapa** — o placeholder da secção de contacto está pronto a ser substituído por um `<iframe>` do Google Maps (basta colar o embed real da localização do restaurante).
6. **Formulário de reservas** — atualmente é apenas uma demonstração (não envia dados). Para um site real, ligar o formulário a um serviço de envio de emails (ex.: Formspree, EmailJS) ou a um backend próprio.
7. **Menu e preços** — substituir os pratos e preços de demonstração pelos pratos e preços reais, e remover a nota "Menu demonstrativo — preços sujeitos a alteração."
8. **SEO** — confirmar `title`, `meta description`, `og:image` e o URL canónico com o domínio real do cliente.
9. **Domínio próprio (opcional)** — se o cliente tiver um domínio próprio, configurar um ficheiro `CNAME` no repositório para o GitHub Pages, ou publicar noutro serviço de alojamento.
