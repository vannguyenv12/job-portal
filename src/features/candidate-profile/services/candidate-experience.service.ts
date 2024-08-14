import prisma from '~/prisma';
import { candidateProfileService } from './candidate-profile.service';
import { CandidateExperience } from '@prisma/client';
import { NotFoundException } from '~/globals/cores/error.core';

class CandidateExperienceService {
  public async create(requestBody: any, currentUser: UserPayload): Promise<CandidateExperience> {
    const { company, department, startDate, endDate, responsibilities } = requestBody;

    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateExperience = await prisma.candidateExperience.create({
      data: {
        company,
        department,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        responsibilities,
        candidateProfileId: candidateProfile.id
      }
    });

    return candidateExperience;
  }

  public async readAll(): Promise<CandidateExperience[]> {
    const candidateExperiences = await prisma.candidateExperience.findMany();

    return candidateExperiences;
  }

  public async readMyExperiences(currentUser: UserPayload): Promise<CandidateExperience[]> {
    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateExperience = await prisma.candidateExperience.findMany({
      where: {
        candidateProfileId: candidateProfile.id
      }
    });

    return candidateExperience;
  }

  public async findOne(id: number, currentUser: UserPayload): Promise<CandidateExperience> {
    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateExperience = await prisma.candidateExperience.findUnique({
      where: { id, candidateProfileId: candidateProfile.id }
    });

    if (!candidateExperience) throw new NotFoundException(`Not found candidate experience with ID: ${id}`);

    return candidateExperience;
  }

  public async update(id: number, requestBody: any, currentUser: UserPayload): Promise<CandidateExperience> {
    const { company, department, startDate, endDate, responsibilities } = requestBody;

    await this.findOne(id, currentUser);
    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateExperience = await prisma.candidateExperience.update({
      where: { id, candidateProfileId: candidateProfile.id },
      data: {
        company,
        department,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : undefined,
        responsibilities
      }
    });

    return candidateExperience;
  }
}

export const candidateExperienceService: CandidateExperienceService = new CandidateExperienceService();
