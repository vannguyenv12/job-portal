import { Application } from 'express';
import candidateEducationRoute from '~/features/candidate-profile/routes/candidate-education.route';
import candidateExperienceRoute from '~/features/candidate-profile/routes/candidate-experience.route';
import candidateLanguageRoute from '~/features/candidate-profile/routes/candidate-languages.route';
import candidateProfileRoute from '~/features/candidate-profile/routes/candidate-profile.route';
import candidateSkillRoute from '~/features/candidate-profile/routes/candidate-skill.route';
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
}

export default appRoutes;
