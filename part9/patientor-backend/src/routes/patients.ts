import { Router, Response } from 'express';
import { NonSensitivePtData } from '../types';
import patientService from '../services/patientService';
import { toNewPatientData } from '../utils';

const router = Router();

router.get('/', (_req, res: Response<NonSensitivePtData[]>) => {
    res.send(patientService.getNoneSensitivePtData());
});

router.post('/', (req, res) => {
    try{
        const newPtData = toNewPatientData(req.body);
        const addedPtData = patientService.addPatientData(newPtData);
        if (addedPtData) res.json(addedPtData);

    } catch (error: unknown) {
        let errorMessage = 'Something went wrong :(';
        if (error instanceof Error) {
            errorMessage = 'Error: ' + error.message;
          }
          res.status(400).send(errorMessage);
    }
});

export default router;