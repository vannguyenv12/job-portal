import prisma from '~/prisma';
import { candidateProfileService } from './candidate-profile.service';
import { CandidateEducation, Education } from '@prisma/client';
import { NotFoundException } from '~/globals/cores/error.core';
import { ICandidateEducation } from '../interfaces/candidate-education.interface';

class CandidateEducationService {
  public async create(requestBody: ICandidateEducation, currentUser: UserPayload) {
    const { educationId, major, degree, yearStart, yearEnd } = requestBody;

    await this.findEducation(educationId);

    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateEducation = await prisma.candidateEducation.create({
      data: {
        candidateProfileId: candidateProfile.id,
        educationId,
        major,
        degree,
        yearStart,
        yearEnd
      }
    });

    return candidateEducation;
  }

  private async findEducation(educationId: number): Promise<Education> {
    const education = await prisma.education.findUnique({
      where: { id: educationId }
    });

    if (!education) throw new NotFoundException(`Education with ID ${educationId} not found`);

    return education;
  }

  public async readAll(): Promise<CandidateEducation[]> {
    const candidateEducations = await prisma.candidateEducation.findMany();

    return candidateEducations;
  }

  public async readMyEducations(currentUser: UserPayload): Promise<CandidateEducation[]> {
    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateEducations = await prisma.candidateEducation.findMany({
      where: {
        candidateProfileId: candidateProfile.id
      }
    });

    return candidateEducations;
  }

  public async update(
    educationId: number,
    requestBody: ICandidateEducation,
    currentUser: UserPayload
  ): Promise<CandidateEducation> {
    const { major, degree, yearStart, yearEnd } = requestBody;
    await this.findEducation(educationId);

    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateEducation = await prisma.candidateEducation.update({
      where: {
        candidateProfileId_educationId: {
          candidateProfileId: candidateProfile.id,
          educationId: educationId
        }
      },
      data: {
        major,
        degree,
        yearStart,
        yearEnd
      }
    });

    return candidateEducation;
  }

  public async remove(educationId: number, currentUser: UserPayload): Promise<void> {
    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);
    await this.findEducation(educationId);

    await prisma.candidateEducation.delete({
      where: {
        candidateProfileId_educationId: {
          candidateProfileId: candidateProfile.id,
          educationId
        }
      }
    });
  }
}

export const candidateEducationService: CandidateEducationService = new CandidateEducationService();
