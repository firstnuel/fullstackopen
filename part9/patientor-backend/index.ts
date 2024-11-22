import express from 'express';
import cors from 'cors';
import DiagnosesRouter from './src/routes/diagnoses';
import PatientsRouter from './src/routes/patients';

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', DiagnosesRouter);
app.use('/api/patients', PatientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});