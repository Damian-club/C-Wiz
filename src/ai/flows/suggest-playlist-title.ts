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
  prompt: `You are a creative playlist title generator.

  Given the following list of tracks in a playlist, suggest a creative and relevant title for the playlist.

  Tracks:
  {{#each tracks}}- {{this}}\n{{/each}}

  Title: `,
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
