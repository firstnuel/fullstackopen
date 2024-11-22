import { Router, Response } from 'express';
import { Diagnosis } from '../types';
import getDiagnoses from '../services/diagnosesService';


const router = Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.send(getDiagnoses());
});


export default router;