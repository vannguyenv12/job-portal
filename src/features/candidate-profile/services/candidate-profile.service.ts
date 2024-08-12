import { CandidateProfile } from '@prisma/client';
import { NotFoundException } from '~/globals/cores/error.core';
import prisma from '~/prisma';

class CandidateProfileService {
  public async create(requestBody: any, currentUser: UserPayload): Promise<CandidateProfile> {
    const { fullName, gender, phone, cv, birthdate, address } = requestBody;

    const candidateProfile = await prisma.candidateProfile.create({
      data: {
        fullName,
        gender,
        phone,
        cv,
        birthdate: new Date(birthdate),
        address,
        userId: currentUser.id
      }
    });

    return candidateProfile;
  }

  public async readAll(): Promise<CandidateProfile[]> {
    const candidates: CandidateProfile[] = await prisma.candidateProfile.findMany();

    return candidates;
  }

  public async readOne(id: number): Promise<CandidateProfile> {
    const candidate: CandidateProfile | null = await prisma.candidateProfile.findUnique({
      where: { id }
    });

    if (!candidate) throw new NotFoundException(`Candidate profile with ID: ${id} not found`);

    return candidate;
  }
}

export const candidateProfileService: CandidateProfileService = new CandidateProfileService();
