'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting playlist titles using AI.
 *
 * - suggestPlaylistTitle - A function that suggests a playlist title based on the provided tracks.
 * - SuggestPlaylistTitleInput - The input type for the suggestPlaylistTitle function.
 * - SuggestPlaylistTitleOutput - The return type for the suggestPlaylistTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPlaylistTitleInputSchema = z.object({
  tracks: z
    .array(z.string())
    .describe('Arreglo de los nombres de las canciones en la playlist.'),
});
export type SuggestPlaylistTitleInput = z.infer<typeof SuggestPlaylistTitleInputSchema>;

const SuggestPlaylistTitleOutputSchema = z.object({
  title: z.string().describe('Título recomendado para la playlist.'),
});
export type SuggestPlaylistTitleOutput = z.infer<typeof SuggestPlaylistTitleOutputSchema>;

export async function suggestPlaylistTitle(input: SuggestPlaylistTitleInput): Promise<SuggestPlaylistTitleOutput> {
  return suggestPlaylistTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPlaylistTitlePrompt',
  input: {schema: SuggestPlaylistTitleInputSchema},
  output: {schema: SuggestPlaylistTitleOutputSchema},
  prompt: `Eres un generador de nombres de playlist creativos.

  Dado el siguiente listado de canciones en una playlist, recomienda un título creativo y relevante para la playlist.

  Canciones:
  {{#each tracks}}- {{this}}\n{{/each}}

  Título: `,
});

const suggestPlaylistTitleFlow = ai.defineFlow(
  {
    name: 'suggestPlaylistTitleFlow',
    inputSchema: SuggestPlaylistTitleInputSchema,
    outputSchema: SuggestPlaylistTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
