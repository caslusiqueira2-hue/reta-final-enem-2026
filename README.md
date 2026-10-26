# Reta Final ENEM 2026 · Matemática

Página de apresentação e venda do PDF de revisão do Prof. André Pedrosa. HTML, CSS e JavaScript nativos, sem etapa de compilação, frameworks ou dependências de execução.

## Visualizar e publicar

Abra `index.html` no navegador ou sirva a pasta com um servidor HTTP estático. A Vercel pode publicar o conteúdo da raiz sem comando de build. A configuração existente de hospedagem foi preservada.

Endereço de produção cadastrado no repositório: https://reta-final-enem-2026-xi.vercel.app/

## Estrutura

- `index.html`: conteúdo, metadados e estrutura semântica.
- `assets/site.css`: identidade visual, responsividade, impressão e preferência por movimento reduzido.
- `assets/site.js`: menu, galeria, leitor ampliado, atribuição de campanhas e eventos de navegação.
- `assets/*.webp`: versões otimizadas das imagens originais, que também foram mantidas.
- `assets/fonts/`: fontes locais Manrope e Newsreader, com as respectivas licenças OFL.
- `assets/social-cover.jpg`: imagem de compartilhamento de 1200 × 630 px.
- `assets/favicon.svg`: ícone da identidade.
- `vercel.json`: configuração de rotas, cache e cabeçalhos existente.

## Oferta e checkout

Preço preservado: **R$ 19,90**, pagamento único. O checkout e seu identificador de oferta originais foram mantidos. O endereço está presente nos links do HTML para funcionar mesmo sem JavaScript e no objeto `CONFIG` de `assets/site.js`. Atualize ambos se o checkout mudar.

Parâmetros `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid` e `fbclid` recebidos pela página são repassados ao checkout sem apagar o parâmetro `offer`.

O site não processa pagamentos ou entrega arquivos: essas etapas pertencem ao checkout. Nenhuma compra foi feita durante a validação.

## Analytics

Nenhum serviço de analytics é carregado por padrão. `GA4_ID` e `GADS_ID`, em `assets/site.js`, são opcionais e estão vazios. Antes de ativá-los, configure as informações e o consentimento de privacidade adequados ao uso pretendido.

Os eventos locais podem ser acompanhados por `window.addEventListener('retafinal:event', handler)`: `cta_click`, `checkout_start`, `offer_view`, `sample_select`, `sample_open` e `faq_open`.

## Direção editorial

Paleta de papel, verde escuro e terracota; tipografia Manrope com itálicos Newsreader; layouts com divisórias e hierarquia editorial. O material é demonstrado antes da oferta. A capa do mockup é ilustrativa e sinalizada; as amostras são páginas reais existentes no repositório.

A copy apresenta o produto como apoio de revisão. Não usa avaliações inventadas, contagem regressiva, promessa de nota ou alegação de publicação oficial do ENEM.

## Validação

- JavaScript verificado com `node --check assets/site.js`.
- Navegador: larguras de 320, 390, 768, 1024 e 1440 px, sem rolagem horizontal ou títulos fora da tela.
- Menu mobile, navegação entre amostras, leitor modal, zoom, fechamento com Escape e restauração do foco conferidos.
- Conteúdo programático, preço e checkout preservados a partir da página original.

## Observações de publicação

Ao trocar o domínio, atualize os endereços de `canonical`, `og:url` e `og:image` em `index.html`. Informações específicas de suporte, política de reembolso, privacidade e termos comerciais devem ser publicadas com os dados reais do responsável; links vazios da versão anterior foram removidos.

Material independente de revisão, sem vínculo com o INEP ou com a organização do ENEM.

© 2026 Prof. André Pedrosa.
