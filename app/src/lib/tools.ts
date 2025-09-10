
import {
    MessageSquareQuote,
    Book,
    BookCopy,
    Sigma,
    WholeWord,
    BookText,
    TextSearch,
    BookUser,
    MapPin,
    BookKey,
    Link,
    BookCheck,
    ClipboardPen,
    ALargeSmall,
    Users,
    Info,
    Download,
    SunMoon,
    BookOpenCheck,
    Building2,
    GraduationCap,
    Wrench
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ActiveTool =
    | 'commentary'
    | 'references'
    | 'strong'
    | 'interlinear'
    | 'hermeneutic'
    | 'comparative'
    | 'dictionary'
    | 'character'
    | 'location'
    | 'symbolic'
    | 'thematic-chains'
    | 'thematic-study'
    | 'outline-generator'
    | 'community-panel'
    | 'about'
    | 'export'
    | 'theme-switcher'
    | 'easter-egg';

export type ToolCategory = 'Análise Textual' | 'Enciclopédia' | 'Estudos Gerais' | 'Ferramentas';

export interface ToolDefinition {
    id: ActiveTool;
    name: string;
    description: string;
    icon: LucideIcon;
    category: ToolCategory;
    inputs: ('verse' | 'term' | 'topic' | 'outline' | 'character' | 'location' | 'symbol' | 'none')[];
}

export const toolCategories: Record<ToolCategory, { icon: LucideIcon }> = {
    'Análise Textual': { icon: BookOpenCheck },
    'Enciclopédia': { icon: Building2 },
    'Estudos Gerais': { icon: GraduationCap },
    'Ferramentas': { icon: Wrench },
};

export const allTools: Record<ToolCategory, ToolDefinition[]> = {
    'Análise Textual': [
        { id: 'commentary', name: 'Comentário', description: 'Gere um comentário exegético detalhado sobre uma passagem, incluindo contexto histórico-cultural, análise de palavras-chave, estrutura literária, significado e aplicação prática.', icon: MessageSquareQuote, category: 'Análise Textual', inputs: ['verse'] },
        { id: 'references', name: 'Referências', description: 'Encontre de 5 a 7 versículos correlacionados à passagem de referência, com o texto completo e uma explicação clara da conexão temática, teológica ou textual.', icon: BookCopy, category: 'Análise Textual', inputs: ['verse'] },
        { id: 'strong', name: 'Análise Strong', description: 'Explore o significado original de cada palavra de um versículo. Receba o termo em hebraico ou grego, o número de Strong, a definição do léxico e a classe gramatical.', icon: Sigma, category: 'Análise Textual', inputs: ['verse'] },
        { id: 'interlinear', name: 'Interlinear', description: 'Gere uma tabela interlinear palavra por palavra, exibindo o texto em português, hebraico/grego, transliteração, tradução literal e análise morfológica completa.', icon: BookText, category: 'Análise Textual', inputs: ['verse'] },
        { id: 'hermeneutic', name: 'Hermenêutica', description: 'Analise uma passagem sob múltiplas lentes interpretativas, incluindo a análise literal-gramatical-histórica, a análise alegórica/simbólica e a crítica textual.', icon: TextSearch, category: 'Análise Textual', inputs: ['verse'] },
        { id: 'comparative', name: 'Texto Comparado', description: 'Veja um versículo lado a lado em 5 traduções bíblicas diferentes (ACF, NVI, KJV, etc.) e receba uma análise das principais diferenças de tradução.', icon: ALargeSmall, category: 'Análise Textual', inputs: ['verse'] },
    ],
    'Enciclopédia': [
        { id: 'dictionary', name: 'Dicionário', description: 'Busque um termo bíblico e receba uma definição completa, incluindo análise etimológica (Strong), contexto de uso nas Escrituras e significado teológico.', icon: Book, category: 'Enciclopédia', inputs: ['term'] },
        { id: 'character', name: 'Personagens', description: 'Gere um perfil biográfico completo de uma figura bíblica, com linha do tempo detalhada, genealogia, relacionamentos-chave e versículos fundamentais.', icon: BookUser, category: 'Enciclopédia', inputs: ['character'] },
        { id: 'location', name: 'Locais', description: 'Pesquise um local bíblico para obter um perfil geográfico e histórico, incluindo os eventos marcantes que ocorreram ali e seu significado simbólico.', icon: MapPin, category: 'Enciclopédia', inputs: ['location'] },
        { id: 'symbolic', name: 'Tipologia', description: 'Analise um conceito, objeto, evento ou número, explorando seu significado tipológico (ex: a Rocha) ou simbólico (ex: o número 40) nas Escrituras.', icon: BookKey, category: 'Enciclopédia', inputs: ['symbol'] },
    ],
    'Estudos Gerais': [
        { id: 'thematic-chains', name: 'Cadeias Temáticas', description: 'Insira um tema (ex: "Graça") para traçar sua revelação progressiva ao longo da Bíblia, conectando versículos-chave do Antigo e Novo Testamento.', icon: Link, category: 'Estudos Gerais', inputs: ['topic'] },
        { id: 'thematic-study', name: 'Estudo Temático', description: 'Receba um estudo bíblico completo e didático sobre um tema teológico, com introdução, análise etimológica, tabela de desenvolvimento e aplicação prática.', icon: BookCheck, category: 'Estudos Gerais', inputs: ['topic'] },
    ],
    'Ferramentas': [
        { id: 'outline-generator', name: 'Gerador de Esboços', description: 'Prepare sermões e estudos. Forneça uma passagem, tema, público e tom para gerar um esboço homilético estruturado, com introdução, pontos e conclusão.', icon: ClipboardPen, category: 'Ferramentas', inputs: ['outline'] },
        { id: 'community-panel', name: 'Painel da Comunidade', description: 'O conteúdo desta área é carregado automaticamente para usuários logados, mostrando tendências de estudo e conexões.', icon: Users, category: 'Ferramentas', inputs: ['none'] },
        { id: 'export', name: 'Exportar', description: 'Exporte o conteúdo gerado para PDF, Markdown ou copie como texto.', icon: Download, category: 'Ferramentas', inputs: ['none'] },
        { id: 'theme-switcher', name: 'Tema', description: 'Alterne entre os modos de exibição claro e escuro para melhor conforto visual.', icon: SunMoon, category: 'Ferramentas', inputs: ['none'] },
        { id: 'about', name: 'Sobre', description: 'Saiba mais sobre a visão, tecnologia e criador do Scriptura Lumina.', icon: Info, category: 'Ferramentas', inputs: ['none'] },
    ]
};

export const getToolById = (id: ActiveTool | 'chapter-display'): ToolDefinition | undefined => {
    if (id === 'easter-egg') {
        return allTools['Enciclopédia'].find(t => t.id === 'symbolic');
    }
    if (id === 'chapter-display') {
        return undefined; // Not a real tool
    }
    for (const group of Object.values(allTools)) {
        const tool = group.find(t => t.id === id);
        if (tool) return tool;
    }
    return undefined;
};
