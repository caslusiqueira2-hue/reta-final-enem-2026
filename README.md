# Reta Final ENEM 2026 · Matemática

Página de apresentação e venda do PDF de revisão do Prof. Pedroza. HTML, CSS e JavaScript nativos, sem etapa de compilação, frameworks ou dependências de execução.

## Visualizar e publicar

Abra `index.html` no navegador ou sirva a pasta com um servidor HTTP estático. A Vercel pode publicar o conteúdo da raiz sem comando de build. A configuração existente de hospedagem foi preservada.

Endereço de produção: https://andreretafinal.vercel.app/

## Estrutura

- `index.html`: conteúdo, metadados e estrutura semântica.
- `privacidade.html`: explicação do uso dos dados enviados pelo formulário.
- `assets/site.css`: identidade visual, responsividade, impressão e preferência por movimento reduzido.
- `assets/site.js`: menu, galeria, leitor ampliado, atribuição de campanhas e eventos de navegação.
- `assets/*.webp`: versões otimizadas das imagens originais, que também foram mantidas.
- `assets/fonts/`: fontes locais Manrope e Newsreader, com as respectivas licenças OFL.
- `assets/capa-matematica-pedroza.png`: capa exibida no topo com o nome atualizado.
- `assets/social-cover-pedroza.png`: imagem de compartilhamento com o nome atualizado.
- `assets/favicon.svg`: ícone da identidade.
- `vercel.json`: configuração de rotas, cache e cabeçalhos existente.

## Oferta e checkout

Preço da oferta: **R$ 19,90**, pagamento único. Checkout configurado: `https://checkoutseguro.info/checkout/cmw5ae5q1008p01oj8nem3ej7?offer=JEWR867`. Após a confirmação de sucesso do Formspree, o navegador redireciona automaticamente para esse checkout; não há etapa de WhatsApp após o cadastro. Se o envio do formulário falhar, a pessoa permanece na página e pode tentar novamente. Antes de enviar tráfego pago, confirme que o produto está liberado na Sigilo Pay e que esse link aceita a compra.

O formulário exige nome, e-mail, WhatsApp com DDD e autorização explícita para contato sobre a oferta. As submissões são encaminhadas ao endereço `caslusiqueira2@gmail.com` pelo formulário `xpppejbd` do [Formspree](https://formspree.io/). O painel mantém um arquivo de respostas e a ação de e-mail está habilitada. O recebimento de um cadastro real por e-mail foi confirmado pelo responsável; o redirecionamento após esta alteração ainda precisa de uma conferência real no navegador.

Parâmetros `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid` e `fbclid` recebidos pela página são repassados ao checkout sem apagar o parâmetro `offer`.

O site não processa pagamentos ou entrega arquivos: essas etapas pertencem ao checkout. Nenhuma compra foi feita durante a validação.

## Analytics

Nenhum serviço de analytics é carregado por padrão. `GA4_ID` e `GADS_ID`, em `assets/site.js`, são opcionais e estão vazios. Antes de ativá-los, configure as informações e o consentimento de privacidade adequados ao uso pretendido. O Pixel da Meta está ligado ao checkout na Sigilo Pay; esta página ainda não envia eventos diretamente à Meta.

Os eventos locais podem ser acompanhados por `window.addEventListener('retafinal:event', handler)`: `lead_submit`, `checkout_start`, `offer_view`, `sample_select`, `sample_open` e `faq_open`.

## Direção editorial

Paleta de papel, verde escuro e terracota; tipografia Manrope com itálicos Newsreader; layouts com divisórias e hierarquia editorial. O material é demonstrado antes da oferta. A imagem de apresentação do professor foi fornecida pelo responsável pelo projeto e é exibida por inteiro, sem cortes; as amostras são páginas reais existentes no repositório.

A copy apresenta o produto como apoio de revisão. Não usa avaliações inventadas, contagem regressiva, promessa de nota ou alegação de publicação oficial do ENEM.

## Validação

- JavaScript verificado com `node --check assets/site.js`.
- Navegador: larguras de 320, 390, 768, 1024 e 1440 px, sem rolagem horizontal ou títulos fora da tela.
- Menu mobile, navegação entre amostras, leitor modal, zoom, fechamento com Escape e restauração do foco conferidos.
- Conteúdo programático e preço preservados; checkout substituído pela oferta nova da Sigilo Pay.

## Observações de publicação

Ao trocar o domínio, atualize os endereços de `canonical`, `og:url` e `og:image` em `index.html` e o `canonical` de `privacidade.html`. Informações específicas de suporte, política de reembolso e termos comerciais devem ser publicadas com os dados reais do responsável.

Material independente de revisão, sem vínculo com o INEP ou com a organização do ENEM.

© 2026 Prof. Pedroza.

