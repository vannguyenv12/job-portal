import { Application } from 'express';
import applyRoute from '~/features/apply/routes/apply.route';
import candidateEducationRoute from '~/features/candidate-profile/routes/candidate-education.route';
import candidateExperienceRoute from '~/features/candidate-profile/routes/candidate-experience.route';
import candidateLanguageRoute from '~/features/candidate-profile/routes/candidate-languages.route';
import candidateProfileRoute from '~/features/candidate-profile/routes/candidate-profile.route';
import candidateSkillRoute from '~/features/candidate-profile/routes/candidate-skill.route';
import companyImageRoute from '~/features/company/routes/company-image.route';
import companyIndustryRoute from '~/features/company/routes/company-industry.route';
import companyRoute from '~/features/company/routes/company.route';
import jobBenefitRoute from '~/features/job/routes/job-benefit.route';
import jobRoleRoute from '~/features/job/routes/job-role.route';
import jobSkillRoute from '~/features/job/routes/job-skill.route';
import jobRoute from '~/features/job/routes/job.route';
import packageRoute from '~/features/package/routes/package.route';
import authRoute from '~/features/user/routes/auth.route';
import userRoute from '~/features/user/routes/user.route';

function appRoutes(app: Application) {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/candidate-profiles', candidateProfileRoute);
  app.use('/api/v1/candidate-languages', candidateLanguageRoute);
  app.use('/api/v1/candidate-educations', candidateEducationRoute);
  app.use('/api/v1/candidate-skills', candidateSkillRoute);
  app.use('/api/v1/candidate-experiences', candidateExperienceRoute);
  app.use('/api/v1/companies', companyRoute);
  app.use('/api/v1/company-images', companyImageRoute);
  app.use('/api/v1/company-industries', companyIndustryRoute);
  app.use('/api/v1/job-roles', jobRoleRoute);
  app.use('/api/v1/jobs', jobRoute);
  app.use('/api/v1/job-skills', jobSkillRoute);
  app.use('/api/v1/job-benefits', jobBenefitRoute);
  app.use('/api/v1/applies', applyRoute);
  app.use('/api/v1/packages', packageRoute);
}

export default appRoutes;
