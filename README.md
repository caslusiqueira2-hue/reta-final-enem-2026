# Reta Final ENEM 2026 — Matemática | Prof. André Pedrosa

Landing page de alta conversão para o material digital de revisão de Matemática.

## 🚀 Como usar

1. Abra `index.html` no navegador para visualizar localmente.
2. Para deploy, conecte este repositório à Vercel.

## ⚙️ Configurações obrigatórias antes de publicar

Edite as variáveis `CONFIG` no início do `<script>` dentro de `index.html`:

| Variável | Descrição | Status |
|---|---|---|
| `PRODUCT_PRICE` | Preço do produto (ex: `'R$ 29,90'`) | ⚠️ **Configurar** |
| `CHECKOUT_URL` | URL do checkout real | ⚠️ **Configurar** |
| `GA4_ID` | ID do Google Analytics 4 (ex: `'G-XXXXXXXXXX'`) | Opcional |
| `GADS_ID` | ID do Google Ads (ex: `'AW-XXXXXXXXXX'`) | Opcional |
| `CONTACT_EMAIL` | E-mail de contato | Opcional |
| `CONTACT_WHATSAPP` | Número WhatsApp com código do país | Opcional |

## 📁 Estrutura

```
├── index.html                          # Página principal
├── assets/
│   ├── professor-andre-pedrosa.png     # Foto do professor
│   ├── gabarito-questoes-1-a-5.png     # Gabarito Q1-5
│   ├── gabarito-questoes-6-a-10.png    # Gabarito Q6-10
│   └── resolucao-aprofundada.png       # Resolução detalhada
├── vercel.json                         # Config de deploy
├── .gitignore
└── README.md
```

## 📋 Checklist pré-publicação

- [ ] Definir `PRODUCT_PRICE` com o valor real
- [ ] Definir `CHECKOUT_URL` com o link do checkout
- [ ] Configurar `GA4_ID` se houver Google Analytics
- [ ] Revisar textos e informações de contato
- [ ] Testar no celular
- [ ] Verificar se o checkout está funcional

## 🎨 Design

Neobrutalismo editorial com paleta:
- 🟠 Laranja: `#FF7E00`
- 🟣 Roxo: `#6B1AFF`
- ⚫ Preto: `#171717`
- 🟡 Creme: `#FFF8ED`

## ⚖️ Aviso Legal

Este material é um produto independente de revisão. Não representa o INEP nem é uma publicação oficial do ENEM.

© 2026 Prof. André Pedrosa. Todos os direitos reservados.
