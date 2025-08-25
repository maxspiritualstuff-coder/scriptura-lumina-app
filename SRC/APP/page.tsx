'use client';

import { useState, useMemo, useCallback } from 'react';
import { BookOpenText, Search } from 'lucide-react';

import type { HistoryItem } from '@/hooks/use-history';
import { useHistory } from '@/hooks/use-history';
import { getCommentary, getDefinition } from './actions';

import { Header } from '@/components/scriptura/Header';
import { Footer } from '@/components/scriptura/Footer';
import { HistorySidebar } from '@/components/scriptura/HistorySidebar';
import { AiContent } from '@/components/scriptura/AiContent';
import { Loader } from '@/components/scriptura/Loader';
import { Placeholder } from '@/components/scriptura/Placeholder';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { bibleData } from '@/lib/bible-data';

type BibleData = typeof bibleData;
type Book = keyof BibleData;

const formatDictionaryResponse = (response: any) => {
  const titleMapping: Record<string, string> = {
    term: 'a. Termo',
    quickDefinition: 'b. Definição Rápida',
    etymologicalAnalysis: 'c. Análise Etimológica',
    contextAndUsage: 'd. Contexto e Uso nas Escrituras',
    theologicalSignificance: 'e. Significado Teológico',
    crossReferences: 'f. Referências Cruzadas',
  };

  const order = ['term', 'quickDefinition', 'etymologicalAnalysis', 'contextAndUsage', 'theologicalSignificance', 'crossReferences'];
  
  return order
    .map(key => {
        const title = titleMapping[key] || key;
        const value = response[key];
        return value ? `${title}: ${value}` : null;
    })
    .filter(Boolean)
    .join('\n\n');
};

const formatCommentaryResponse = (response: any) => {
    try {
      const parsed = JSON.parse(response.commentary);
      const order = [
        'a. Referência',
        'b. Texto do Versículo',
        'c. Contexto Imediato',
        'd. Contexto Histórico e Cultural',
        'e. Análise do Versículo',
        'f. Significado e Aplicação',
        'g. Versículos Relacionados (Referências Cruzadas)',
      ];
      
      return order
        .map(key => {
            const value = parsed[key];
            return value ? `${key}: ${value}` : null;
        })
        .filter(Boolean)
        .join('\n\n');

    } catch (e) {
      // If it's not a valid JSON, it's probably already a string.
      return response.commentary;
    }
};


export default function Home() {
  const [activeTab, setActiveTab] = useState<'commentary' | 'dictionary'>('commentary');
  const [isLoading, setIsLoading] = useState(false);
  const [outputContent, setOutputContent] = useState<string | null>(null);
  const [outputType, setOutputType] = useState<'commentary' | 'dictionary'>('commentary');

  const { history, addHistoryItem } = useHistory();
  const { toast } = useToast();

  // Commentary form state
  const [selectedBook, setSelectedBook] = useState<Book | ''>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedVerse, setSelectedVerse] = useState<string>('');

  // Dictionary form state
  const [searchTerm, setSearchTerm] = useState('');

  const books = useMemo(() => Object.keys(bibleData) as Book[], []);
  const chapters = useMemo(() => {
    if (!selectedBook) return [];
    const numChapters = bibleData[selectedBook].chapters;
    return Array.from({ length: numChapters }, (_, i) => i + 1);
  }, [selectedBook]);

  const verses = useMemo(() => {
    if (!selectedBook || !selectedChapter) return [];
    const chapterIndex = Number(selectedChapter) - 1;
    if (isNaN(chapterIndex) || chapterIndex < 0 || chapterIndex >= bibleData[selectedBook].verses.length) return [];
    const numVerses = bibleData[selectedBook].verses[chapterIndex] || 0;
    return Array.from({ length: numVerses }, (_, i) => i + 1);
}, [selectedBook, selectedChapter]);

  const handleBookChange = (book: Book | '') => {
    setSelectedBook(book);
    setSelectedChapter('');
    setSelectedVerse('');
  };

  const handleChapterChange = (chapter: string) => {
    setSelectedChapter(chapter);
    setSelectedVerse('');
  };
  
  const processRequest = useCallback(async (action: () => Promise<any>, query: string, type: 'commentary' | 'dictionary') => {
    setIsLoading(true);
    setOutputContent(null);
    setOutputType(type);

    try {
      const result = await action();
      if (type === 'commentary' && result.commentary) {
        setOutputContent(formatCommentaryResponse(result));
      } else if (type === 'dictionary' && result.term) {
        setOutputContent(formatDictionaryResponse(result));
      } else {
         throw new Error('Resposta da IA em formato inesperado.');
      }
      addHistoryItem({ query, type });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar conteúdo",
        description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido.",
      });
      setOutputContent(null);
    } finally {
      setIsLoading(false);
    }
  }, [addHistoryItem, toast]);

  const handleGenerateCommentary = () => {
    if (!selectedBook || !selectedChapter || !selectedVerse) {
      toast({
        variant: "destructive",
        title: "Seleção incompleta",
        description: "Por favor, selecione livro, capítulo e versículo.",
      });
      return;
    }
    const query = `${selectedBook} ${selectedChapter}:${selectedVerse}`;
    const action = () => getCommentary({ book: selectedBook, chapter: Number(selectedChapter), verse: Number(selectedVerse) });
    processRequest(action, query, 'commentary');
  };

  const handleSearchDictionary = (termToSearch: string) => {
    const term = termToSearch.trim();
    if (!term) {
       toast({
        variant: "destructive",
        title: "Termo inválido",
        description: "Por favor, insira um termo para pesquisar.",
      });
      return;
    }
    const action = () => getDefinition({ term });
    processRequest(action, term, 'dictionary');
  };
  
  const handleHistoryClick = (item: HistoryItem) => {
    setActiveTab(item.type);
    if (item.type === 'commentary') {
      const match = item.query.match(/(.+?)\s(\d+):(\d+)/);
      if (match) {
        const [, book, chapter, verse] = match;
        const typedBook = book as Book;
        if(books.includes(typedBook)){
          setSelectedBook(typedBook);
          setSelectedChapter(chapter);
          setSelectedVerse(verse);
          const query = `${book} ${chapter}:${verse}`;
          const action = () => getCommentary({ book, chapter: Number(chapter), verse: Number(verse) });
          processRequest(action, query, 'commentary');
        }
      }
    } else {
      setSearchTerm(item.query);
      handleSearchDictionary(item.query);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto flex-grow p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="flex flex-col gap-6 lg:col-span-3">
            
            {/* Commentary Section */}
            <div className={activeTab === 'commentary' ? 'block' : 'hidden'}>
                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 md:grid-cols-[1fr_auto_auto_auto] lg:grid-cols-[2fr_1fr_1fr_auto]">
                            <div>
                                <Label htmlFor="book-select">Livro</Label>
                                <Select value={selectedBook} onValueChange={(value) => handleBookChange(value as Book)}>
                                    <SelectTrigger id="book-select"><SelectValue placeholder="Selecione um livro" /></SelectTrigger>
                                    <SelectContent>
                                        {books.map(book => <SelectItem key={book} value={book}>{book}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="chapter-select">Capítulo</Label>
                                <Select value={selectedChapter} onValueChange={handleChapterChange} disabled={!selectedBook}>
                                    <SelectTrigger id="chapter-select"><SelectValue placeholder="Cap." /></SelectTrigger>
                                    {chapters.length > 0 && (
                                    <SelectContent>
                                        {chapters.map(c => <SelectItem key={c} value={String(c)}>{c}</SelectItem>)}
                                    </SelectContent>
                                    )}
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="verse-select">Versículo</Label>
                                <Select value={selectedVerse} onValueChange={setSelectedVerse} disabled={!selectedChapter}>
                                    <SelectTrigger id="verse-select"><SelectValue placeholder="Ver." /></SelectTrigger>
                                     {verses.length > 0 && (
                                    <SelectContent>
                                        {verses.map(v => <SelectItem key={v} value={String(v)}>{v}</SelectItem>)}
                                    </SelectContent>
                                     )}
                                </Select>
                            </div>
                            <Button onClick={handleGenerateCommentary} className="w-full sm:w-auto" disabled={isLoading}>
                                {isLoading ? 'Gerando...' : 'Gerar'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Dictionary Section */}
            <div className={activeTab === 'dictionary' ? 'block' : 'hidden'}>
                 <Card>
                    <CardContent className="p-4">
                        <form onSubmit={(e) => { e.preventDefault(); handleSearchDictionary(searchTerm); }} className="flex gap-2">
                            <Input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Digite um termo bíblico e pressione Enter..."
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" disabled={isLoading}>
                                <Search className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Result Area */}
            <Card className="min-h-[400px]">
                <CardContent className="p-6">
                    {isLoading && <Loader />}
                    {!isLoading && !outputContent && <Placeholder />}
                    {!isLoading && outputContent && 
                        <AiContent 
                            rawText={outputContent} 
                            type={outputType}
                            onTermClick={(term) => {
                                setActiveTab('dictionary');
                                setSearchTerm(term);
                                handleSearchDictionary(term);
                            }}
                        />
                    }
                </CardContent>
            </Card>

          </div>
          <aside className="lg:col-span-1">
            <HistorySidebar history={history} onHistoryClick={handleHistoryClick} />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );