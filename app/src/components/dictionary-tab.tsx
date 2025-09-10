
'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BookMarked, Search } from 'lucide-react';

import { getDefinition, type DictionaryState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/loading-spinner';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  term: z.string().min(1, 'Por favor, insira um termo.'),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="icon" className="bg-accent hover:bg-accent/90">
      <Search className="h-4 w-4" />
      <span className="sr-only">Pesquisar</span>
    </Button>
  );
}

export default function DictionaryTab() {
  const { toast } = useToast();
  const initialState: DictionaryState = { message: null, data: null };
  const [state, formAction] = useActionState(getDefinition, initialState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: '',
    },
  });

  React.useEffect(() => {
    if (state.message) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: state.message,
      });
    }
  }, [state, toast]);

  const { pending } = useFormStatus();
  const termValue = form.watch('term');

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form action={formAction} className="space-y-4">
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Termo Bíblico</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="ex: Graça, Messias, Apocalipse" {...field} />
                      </FormControl>
                      <SubmitButton />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      {pending && <LoadingSpinner text="Gerando conteúdo... Por favor, aguarde." />}

      {!pending && !state.data && (
        <Card className="bg-card/50">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center items-center mb-4">
              <BookMarked className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold font-body">Dicionário Bíblico</h3>
            <p className="text-muted-foreground mt-2 font-body">
              Digite um termo ou frase para obter uma definição completa, análise etimológica e seu uso nas Escrituras.
            </p>
          </CardContent>
        </Card>
      )}

      {state.data && (
        <div className="mt-8 space-y-6 animate-in fade-in-50 duration-500">
          <Card>
            <CardHeader>
                <CardTitle>{state.data.term}</CardTitle>
                <CardDescription>Definição detalhada e análise do termo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h2 className="text-base font-semibold text-primary">Definição</h2>
                    <MarkdownRenderer content={state.data.quickDefinition} />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-primary">Etimologia e Strong</h2>
                    <MarkdownRenderer content={state.data.etymologicalAnalysis} />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-primary">Uso Contextual</h2>
                    <MarkdownRenderer content={state.data.contextAndUsage} />
                </div>
                 <div>
                    <h2 className="text-base font-semibold text-primary">Significado Teológico</h2>
                    <MarkdownRenderer content={state.data.theologicalSignificance} />
                </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
