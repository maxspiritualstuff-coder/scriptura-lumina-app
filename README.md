# Relatório do Aplicativo: Scriptura Lumina

## Visão Geral

**Scriptura Lumina** é uma aplicação web de estudo bíblico avançado, potencializada por Inteligência Artificial. O objetivo da ferramenta é fornecer aos usuários — desde leigos a pastores e teólogos — um conjunto robusto de recursos para aprofundar sua compreensão das Escrituras de maneira dinâmica e interativa.

A aplicação foi desenvolvida utilizando Next.js, TypeScript e Tailwind CSS, com a IA Genkit para as funcionalidades generativas.

---

## Funcionalidades Implementadas

O aplicativo é organizado em um sistema de menus, cada um oferecendo um grupo de ferramentas de estudo distintas.

### Análise Textual

Este grupo contém ferramentas para a exegese e análise detalhada de passagens específicas.

#### 1. Comentário

-   **Operação:** O usuário seleciona um livro, capítulo e versículo da Bíblia.
-   **Ação da IA:** Ao clicar em "Gerar", a IA produz um comentário exegético detalhado sobre a passagem selecionada.

#### 2. Referências

-   **Operação:** O usuário seleciona um livro, capítulo e versículo.
-   **Ação da IA:** A IA busca em toda a Bíblia por versículos que se conectam tematicamente, teologicamente ou textualmente com a passagem de referência.

#### 3. Análise Strong

-   **Operação:** O usuário seleciona uma passagem.
-   **Ação da IA:** A IA realiza uma análise filológica da passagem, fornecendo informações detalhadas para cada palavra com base na Concordância de Strong, incluindo contexto histórico e aplicação teológica.

#### 4. Interlinear

-   **Operação:** O usuário seleciona uma passagem.
-   **Ação da IA:** A IA gera uma visualização interlinear completa da passagem.

#### 5. Hermenêutica

-   **Operação:** O usuário seleciona uma passagem.
-   **Ação da IA:** A IA analisa o versículo sob diferentes lentes interpretativas.

#### 6. Texto Comparado

-   **Operação:** O usuário seleciona uma passagem.
-   **Ação da IA:** A IA busca o texto do versículo em 5 traduções diferentes e gera uma análise das diferenças.

### Enciclopédia

Este grupo oferece ferramentas para pesquisar termos, pessoas, lugares e símbolos.

#### 7. Dicionário

-   **Operação:** O usuário digita um termo ou frase bíblica no campo de busca.
-   **Ação da IA:** A IA gera uma página de dicionário completa para o termo.

#### 8. Personagens

-   **Operação:** O usuário digita o nome de uma figura bíblica.
-   **Ação da IA:** A IA gera um perfil interativo e estruturado do personagem.

#### 9. Locais

-   **Operação:** O usuário digita o nome de um local bíblico.
-   **Ação da IA:** A IA gera um perfil geográfico e histórico do local.

#### 10. Tipologia

-   **Operação:** O usuário digita um conceito, evento, objeto ou número.
-   **Ação da IA:** A IA gera uma análise tipológica focada na conexão entre o tipo no Antigo Testamento e o antítipo no Novo Testamento.

### Estudos Gerais

Este grupo contém ferramentas para estudos temáticos e abrangentes.

#### 11. Cadeias Temáticas

-   **Operação:** O usuário digita um grande tema teológico.
-   **Ação da IA:** A IA constrói uma "Cadeia Temática", mostrando a revelação progressiva do tema nas Escrituras.

#### 12. Estudo Temático

-   **Operação:** O usuário digita um tema teológico.
-   **Ação da IA:** A IA gera um estudo bíblico completo, estruturado e didático sobre o tema.

### Ferramentas

Este grupo oferece recursos práticos para a preparação de mensagens e estudos.

#### 13. Gerador de Esboços

-   **Operação:** O usuário seleciona uma passagem bíblica e insere um tema, um público-alvo e um tom para a mensagem.
-   **Ação da IA:** A IA gera um esboço homilético detalhado para um sermão ou estudo.

#### 14. Painel da Comunidade

-   **Operação:** O usuário (logado) seleciona esta ferramenta.
-   **Ação da Aplicação:** Exibe as buscas mais populares e recentes feitas por outros usuários da comunidade, de forma anônima.

---

### Funcionalidades Adicionais

-   **Histórico de Buscas:** Todas as pesquisas são salvas localmente no navegador do usuário, permitindo acesso rápido a estudos anteriores.
-   **Exportação:** Os resultados podem ser copiados, baixados como PDF/Markdown ou salvos diretamente em uma pasta "Scriptura Lumina" no Google Drive do usuário (requer login).
-   **Design Responsivo:** A interface se adapta a dispositivos móveis e desktops.

---

## Arquitetura e Lógica de IA

O núcleo de inteligência artificial do Scriptura Lumina é construído com **Genkit**, um framework da Google para o desenvolvimento de aplicações de IA generativa. Cada ferramenta de estudo corresponde a um "fluxo" (flow) de Genkit, que define a tarefa da IA, suas entradas e, crucialmente, o formato estruturado (JSON) da saída.

Todos os fluxos estão localizados no diretório `src/ai/flows/`. Abaixo está a documentação técnica para cada um deles.

### 1. Comentário Bíblico

-   **Arquivo:** `generate-commentary.ts`
-   **Função:** `generateCommentary(input)`
-   **Objetivo:** A IA assume a persona de um teólogo, historiador e exegeta de nível acadêmico para gerar um comentário profundo sobre um versículo específico. O prompt exige que a IA siga uma estrutura rigorosa de 7 pontos.
-   **Schema de Entrada (Input):**
    ```json
    {
      "book": "string",
      "chapter": "number",
      "verse": "number",
      "verseText": "string"
    }
    ```
-   **Schema de Saída (Output):** Um objeto JSON com as seguintes chaves: `"a. Referência"`, `"b. Texto do Versículo"`, `"c. Contexto Imediato"`, `"d. Contexto Histórico e Cultural"`, `"e. Análise do Versículo"`, `"f. Significado e Aplicação"`, `"g. Versículos Relacionados (Referências Cruzadas)"`. A análise do versículo é um sub-objeto detalhado.

### 2. Referências Cruzadas

-   **Arquivo:** `cross-references.ts`
-   **Função:** `getCrossReferences(input)`
-   **Objetivo:** A IA age como um teólogo especialista em encontrar de 5 a 7 versículos que se conectam a uma passagem de referência, explicando a relevância de cada um.
-   **Schema de Entrada (Input):**
    ```json
    {
      "book": "string",
      "chapter": "number",
      "verse": "number",
      "verseText": "string"
    }
    ```
-   **Schema de Saída (Output):** Um objeto contendo a chave `references`, que é um array de objetos. Cada objeto tem: `reference`, `text`, `explanation`.

### 3. Análise Strong

-   **Arquivo:** `strong-analysis.ts`
-   **Função:** `getStrongAnalysis(input)`
-   **Objetivo:** A IA atua como um filólogo especialista para fornecer uma análise exaustiva, palavra por palavra, de um versículo, incluindo contexto histórico e aplicação teológica.
-   **Schema de Entrada (Input):**
    ```json
    {
      "book": "string",
      "chapter": "number",
      "verse": "number",
      "verseText": "string"
    }
    ```
-   **Schema de Saída (Output):** Um objeto com `verseReference`, `verseText`, `generalContext`, `analysis` (um array de objetos com análise de palavras), e `theologicalApplication`.

### 4. Análise Interlinear

-   **Arquivo:** `interlinear-analysis.ts`
-   **Função:** `getInterlinearAnalysis(input)`
-   **Objetivo:** A IA age como um erudito especialista em línguas bíblicas para criar uma análise interlinear completa, palavra por palavra, com análise morfológica (parsing) detalhada.
-   **Schema de Entrada (Input):**
    ```json
    {
      "book": "string",
      "chapter": "number",
      "verse": "number",
      "verseText": "string"
    }
    ```
-   **Schema de Saída (Output):** Um objeto com `verseReference`, `verseText` e `analysis` (um array de objetos com dados interlineares).

### 5. Análise Hermenêutica

-   **Arquivo:** `hermeneutic-analysis.ts`
-   **Função:** `getHermeneuticAnalysis(input)`
-   **Objetivo:** A IA atua como um professor de hermenêutica para analisar uma passagem sob três perspectivas distintas: Literal-Gramatical-Histórica, Alegórica/Simbólica e Crítica Textual.
-   **Schema de Entrada (Input):**
    ```json
    {
      "book": "string",
      "chapter": "number",
      "verse": "number",
      "verseText": "string"
    }
    ```
-   **Schema de Saída (Output):** Um objeto com `passage`, `verseText` e `analyses` (um array contendo as três análises).

### 6. Análise de Texto Comparado

-   **Arquivo:** `comparative-text-analysis.ts`
-   **Função:** `getComparativeTextAnalysis(input)`
-   **Objetivo:** A IA age como especialista em tradução bíblica para comparar um versículo em 5 traduções diferentes e analisar as variações significativas.
-   **Schema de Entrada (Input)::**
    ```json
    {
      "book": "string",
      "chapter": "number",
      "verse": "number",
      "verseText": "string"
    }
    ```
-   **Schema de Saída (Output):** Um objeto com `passage`, `translations` (array de objetos com `version` e `text`) e `analysis`.


### 7. Dicionário Bíblico

-   **Arquivo:** `define-biblical-term.ts`
-   **Função:** `defineBiblicalTerm(input)`
-   **Objetivo:** A IA atua como um teólogo e lexicógrafo para criar uma entrada de dicionário completa para um termo bíblico.
-   **Schema de Entrada (Input):**
    ```json
    { "term": "string" }
    ```
-   **Schema de Saída (Output):** Um objeto JSON com as chaves: `term`, `quickDefinition`, `etymologicalAnalysis`, `contextAndUsage`, `theologicalSignificance`, `crossReferences`.

### 8. Perfil de Personagem

-   **Arquivo:** `character-profile.ts`
-   **Função:** `getCharacterProfile(input)`
-   **Objetivo:** A IA age como um historiador bíblico para criar um perfil detalhado de um personagem, incluindo biografia, linha do tempo, família e relacionamentos, com otimizações para personagens importantes.
-   **Schema de Entrada (Input):**
    ```json
    { "characterName": "string" }
    ```
-   **Schema de Saída (Output):** Um objeto com `name`, `biography`, `genealogy` (sub-objeto), `timeline` (array), `relationships` (array), `keyVerses` (array).

### 9. Perfil de Local

-   **Arquivo:** `get-location-profile.ts`
-   **Função:** `getLocationProfile(input)`
-   **Objetivo:** A IA assume a persona de um geógrafo e historiador bíblico para criar um perfil detalhado de um local bíblico.
-   **Schema de Entrada (Input):**
    ```json
    { "locationName": "string" }
    ```
-   **Schema de Saída (Output):** Um objeto com `name`, `description`, `keyEvents` (array), `significance`, `keyVerses` (array).

### 10. Análise Tipológica

-   **Arquivo:** `symbolic-analysis.ts`
-   **Função:** `getSymbolicAnalysis(input)`
-   **Objetivo:** A IA atua como uma teóloga especialista em tipologia, focando em como os tipos do Antigo Testamento prefiguram os antítipos do Novo Testamento.
-   **Schema de Entrada (Input):**
    ```json
    { "topic": "string" }
    ```
-   **Schema de Saída (Output):** Um objeto com `topic`, `introduction`, `analysisPoints` (array), `conclusion`, `supportingVerses` (array de objetos com referência e texto).

### 11. Cadeias Temáticas

-   **Arquivo:** `thematic-chains.ts`
-   **Função:** `getThematicChain(input)`
-   **Objetivo:** A IA age como um teólogo sistemático para criar uma "Cadeia Temática", identificando de 5 a 7 versículos que demonstram o desenvolvimento de um tema ao longo da Bíblia.
-   **Schema de Entrada (Input):**
    ```json
    { "theme": "string" }
    ```
-   **Schema de Saída (Output):** Um objeto com `theme` e `chain` (um array de objetos). Cada objeto na cadeia tem: `reference`, `text`, `explanation`.

### 12. Estudo Temático

-   **Arquivo:** `thematic-study.ts`
-   **Função:** `getThematicStudy(input)`
-   **Objetivo:** A IA atua como um professor de teologia sistemática para criar um estudo didático e completo sobre um tema, estruturado para fácil compreensão por leigos.
-   **Schema de Entrada (Input):**
    ```json
    { "theme": "string" }
    ```
-   **Schema de Saída (Output):** Um objeto com `theme`, `introduction`, `etymologicalAnalysis`, `developmentTable` (um array de objetos), `theologicalAspects`, `practicalApplication`, `conclusion`.

### 13. Gerador de Esboços

-   **Arquivo:** `generate-outline.ts`
-   **Função:** `generateOutline(input)`
-   **Objetivo:** A IA assume a persona de um pastor experiente para criar um esboço de sermão detalhado, baseado nos parâmetros fornecidos pelo usuário.
-   **Schema de Entrada (Input):**
    ```json
    {
      "book": "string",
      "chapter": "number",
      "verse": "number",
      "verseText": "string",
      "theme": "string",
      "audience": "string",
      "tone": "string"
    }
    ```
-   **Schema de Saída (Output):** Um objeto JSON com `title`, `introduction`, `mainPoints` (um array de objetos com `pointTitle`, `pointContent`, `supportingVerses`), `application`, `conclusion`.

### 14. Feed da Comunidade

-   **Arquivo:** `community-feed.ts`
-   **Função:** `getCommunityFeed()`
-   **Objetivo:** Um fluxo sem IA que consulta o banco de dados para buscar as buscas mais populares e recentes feitas pela comunidade de forma anônima.
-   **Schema de Entrada (Input):** `void`
-   **Schema de Saída (Output):** Um objeto com `popularSearches` e `recentSearches`.

    