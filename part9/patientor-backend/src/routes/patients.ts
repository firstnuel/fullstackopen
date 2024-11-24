import { Router, Response, Request } from 'express';
import { NonSensitivePtData, NewPatientData, PatientData, EntryWithoutId, Entry } from '../types';
import patientService from '../services/patientService';
import { NewPtDataParser, errorMiddleware, NewEntryParser } from '../middleware';

const router = Router();

router.get('/', (_req, res: Response<NonSensitivePtData[]>) => {
    res.send(patientService.getNoneSensitivePtData());
});

router.get('/:id', (req, res: Response<PatientData>) => {
    const ptData = patientService.getPatientById(req.params.id);
    if (ptData) {
        res.send(ptData);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', NewPtDataParser, 
    (req: Request<unknown, unknown, NewPatientData>, res: Response<NonSensitivePtData>) => {
    const addedPtData = patientService.addPatientData(req.body);
    res.json(addedPtData);
});

router.post('/:id/entries', NewEntryParser, 
    (req: Request<unknown, unknown, EntryWithoutId>, res: Response<Entry>) => {
        const { id } = req.params as { id: string };
        const addedEntry = patientService.addPtDataEntry(req.body, id);
        if (addedEntry) {
            res.send(addedEntry);
        } else {
            res.sendStatus(400);
        }
});

router.use(errorMiddleware);
export default router;