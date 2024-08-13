import { Level } from '@prisma/client';

export interface ICandidateLanguage {
  languageName: string;
  level: Level;
}
