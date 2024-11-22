import { Router, Response, Request } from 'express';
import { NonSensitivePtData, NewPatientData } from '../types';
import patientService from '../services/patientService';
import { NewPtDataParser, errorMiddleware } from '../middleware';

const router = Router();

router.get('/', (_req, res: Response<NonSensitivePtData[]>) => {
    res.send(patientService.getNoneSensitivePtData());
});

router.post('/', NewPtDataParser, (req: Request<unknown, unknown, NewPatientData>, res: Response<NonSensitivePtData>) => {
    const addedPtData = patientService.addPatientData(req.body);
    res.json(addedPtData);
});

router.use(errorMiddleware);
export default router;