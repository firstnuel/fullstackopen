import  express from 'express';
import { isNotNumber } from './utils';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const PORT: number = 3003;
const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if(isNotNumber(height) || isNotNumber(weight)) {
        res.status(400).json({ error: "malformatted parameters" });
       return; 
    }
    const bmi = calculateBmi(Number(height), Number(weight)); 
    
    res.json({
        weight: weight,
        height: height,
        bmi: bmi
    });
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || daily_exercises.length < 1 || !target) {
        res.status(400).json({ error: "parameters missing" })
        return
    }

    if (!Array.isArray(daily_exercises) || !daily_exercises.every(ex => typeof ex === 'number')) {
        res.status(400).json({ error: "malformatted parameters" })
        return
    }

    const result = calculateExercises(daily_exercises, target)
    res.json(result)
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});