'use server';

/**
 * @fileOverview Generates a sermon/study outline based on a verse, theme, audience, and tone.
 *
 * - generateOutline - A function that handles the generation of the outline.
 * - GenerateOutlineInput - The input type for the generateOutline function.
 * - GenerateOutlineOutput - The return type for the generateOutline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getVerse } from '@/app/actions';

const GenerateOutlineInputSchema = z.object({
  book: z.string().describe('The book of the Bible (e.g., Genesis, Matthew).'),
  chapter: z.number().describe('The chapter number in the book.'),
  verse: z.number().describe('The verse number in the chapter.'),
  theme: z.string().describe('The central theme of the sermon or study.'),
  audience: z.string().describe('The target audience (e.g., "jovens", "novos convertidos", "líderes").'),
  tone: z.string().describe('The desired tone (e.g., "devocional", "teológico", "evangelístico").'),
});
export type GenerateOutlineInput = z.infer<typeof GenerateOutlineInputSchema>;

const MainPointSchema = z.object({
    pointTitle: z.string().describe("The title of the main point."),
    pointContent: z.string().describe("The detailed explanation of the main point."),
    supportingVerses: z.array(z.string()).describe("A list of supporting verse references for this point."),
});

const GenerateOutlineOutputSchema = z.object({
  title: z.string().describe('A captivating title for the sermon/study.'),
  introduction: z.string().describe('An introduction with a hook or illustration.'),
  mainPoints: z.array(MainPointSchema).describe('An array of 2-3 main points for the outline.'),
  application: z.string().describe('Practical application suggestions for the audience.'),
  conclusion: z.string().describe('A powerful summary and a final appeal or prayer.'),
});

export type GenerateOutlineOutput = z.infer<typeof GenerateOutlineOutputSchema>;

export async function generateOutline(input: GenerateOutlineInput): Promise<GenerateOutlineOutput> {
  return await generateOutlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOutlinePrompt',
  input: {schema: GenerateOutlineInputSchema.extend({ verseText: z.string() })},
  output: {
    format: 'json',
    schema: GenerateOutlineOutputSchema,
  },
  prompt: `Você é um pastor experiente e um excelente professor de homilética. Sua tarefa é criar um esboço detalhado para um sermão ou estudo bíblico.

Base bíblica principal: {{book}} {{chapter}}:{{verse}} (Texto: "{{verseText}}")
Tema: {{theme}}
Público-alvo: {{audience}}
Tom: {{tone}}

**CRÍTICO: Garanta que todo e qualquer texto de versículo bíblico retornado seja o texto exato e completo da tradução Almeida Corrigida Fiel (ACF). A precisão do texto bíblico é a prioridade máxima.**

Crie o esboço seguindo esta estrutura JSON:
1.  **title**: Um título criativo e relevante.
2.  **introduction**: Uma introdução envolvente com uma ilustração, pergunta ou fato interessante para capturar a atenção do público.
3.  **mainPoints**: Uma lista de 2 a 3 pontos principais, claros e bem definidos. Cada ponto deve conter:
    a. "pointTitle": O título do ponto.
    b. "pointContent": Uma explicação detalhada do ponto.
    c. "supportingVerses": Uma lista de 2-3 versículos de apoio (além da passagem principal).
4.  **application**: Sugestões práticas e diretas de como o público-alvo pode aplicar esses ensinamentos em suas vidas.
5.  **conclusion**: Um resumo impactante da mensagem, um apelo à ação ou reflexão, e/ou uma oração final.

Use a tradução Almeida Corrigida Fiel (ACF) para todas as referências bíblicas e garanta que o texto dos versículos esteja exato.`,
});

const generateOutlineFlow = ai.defineFlow(
  {
    name: 'generateOutlineFlow',
    inputSchema: GenerateOutlineInputSchema,
    outputSchema: GenerateOutlineOutputSchema,
  },
  async input => {
    const verseText = await getVerse(input.book, input.chapter, input.verse);
    if (!verseText) {
        throw new Error(`Versículo ${input.book} ${input.chapter}:${input.verse} não encontrado no banco de dados.`);
    }
    const llmResponse = await prompt({ ...input, verseText });
    if (!llmResponse.output) {
      throw new Error('A IA não retornou uma resposta válida para o gerador de esboço.');
    }
    return llmResponse.output;
  }
);
