import prisma from '~/prisma';

class CandidateProfileService {
  public async create(requestBody: any, currentUser: UserPayload) {
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
}

export const candidateProfileService: CandidateProfileService = new CandidateProfileService();
