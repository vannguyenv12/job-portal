import { Degree } from '@prisma/client';

export interface ICandidateEducation {
  educationId: number;
  major: string;
  degree: Degree;
  yearStart: number;
  yearEnd: number;
}
