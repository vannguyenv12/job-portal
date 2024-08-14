import prisma from '~/prisma';
import { candidateProfileService } from './candidate-profile.service';
import { NotFoundException } from '~/globals/cores/error.core';
import { CandidateSkill, Skill } from '@prisma/client';

class CandidateSkillService {
  public async create(requestBody: any, currentUser: UserPayload): Promise<CandidateSkill> {
    const { skillName } = requestBody;

    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);
    await this.findSkill(skillName);

    const candidateSkill = await prisma.candidateSkill.create({
      data: {
        candidateProfileId: candidateProfile.id,
        skillName
      }
    });

    return candidateSkill;
  }

  public async findAll(): Promise<CandidateSkill[]> {
    const candidateSkills = await prisma.candidateSkill.findMany();

    return candidateSkills;
  }
  public async findMySkills(currentUser: UserPayload): Promise<CandidateSkill[]> {
    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateSkills = await prisma.candidateSkill.findMany({
      where: {
        candidateProfileId: candidateProfile.id
      }
    });

    return candidateSkills;
  }

  public async remove(skillName: string, currentUser: UserPayload): Promise<void> {
    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    await prisma.candidateSkill.delete({
      where: {
        candidateProfileId_skillName: {
          candidateProfileId: candidateProfile.id,
          skillName
        }
      }
    });
  }

  private async findSkill(name: string): Promise<Skill> {
    const skill = await prisma.skill.findUnique({
      where: { name }
    });

    if (!skill) throw new NotFoundException(`Cannot find skill with name ${name}`);

    return skill;
  }
}

export const candidateSkillService: CandidateSkillService = new CandidateSkillService();
