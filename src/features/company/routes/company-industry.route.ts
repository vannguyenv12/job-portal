import express from 'express';

const companyIndustryRoute = express.Router();

companyIndustryRoute.get('/:companyId');

export default companyIndustryRoute;
