import { CandidateProfile } from '@prisma/client';
import { NotFoundException } from '~/globals/cores/error.core';
import prisma from '~/prisma';
import { ICandidateProfile } from '../interfaces/candidate-profile.interface';

class CandidateProfileService {
  public async create(requestBody: ICandidateProfile, currentUser: UserPayload): Promise<CandidateProfile> {
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

  // Only ADMIN or RECRUITER or owner of candidate profile

  public async readOne(id: number): Promise<CandidateProfile> {
    const candidate: CandidateProfile | null = await prisma.candidateProfile.findUnique({
      where: { id }
    });

    if (!candidate) throw new NotFoundException(`Candidate profile with ID: ${id} not found`);

    return candidate;
  }

  public async update(id: number, requestBody: ICandidateProfile): Promise<CandidateProfile> {
    const { fullName, gender, phone, cv, birthdate, address } = requestBody;

    // 1) Make sure profile with id exist
    await this.readOne(id);
    // 2) Update
    const profileUpdate: CandidateProfile = await prisma.candidateProfile.update({
      where: { id },
      data: {
        fullName,
        gender,
        phone,
        cv,
        birthdate,
        address
      }
    });

    return profileUpdate;
  }

  public async remove(id: number): Promise<void> {
    await this.readOne(id);

    await prisma.candidateProfile.delete({
      where: { id }
    });
  }
}

export const candidateProfileService: CandidateProfileService = new CandidateProfileService();
