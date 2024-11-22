import { parseExArguements } from "./utils";

interface results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number

}

export const calculateExercises = (exerHours: number[], target: number): results => {
    const periodLength = exerHours.length;
    const trainingDays = exerHours.filter(hrs => hrs > 0).length;
    const average = exerHours.reduce((a,b) => a+b, 0) / periodLength;
    const success = average >= target;
    const rating = Math.round(average) < target ? 1 : Math.round(average) > target ? 3 : 2;
    const ratingDescription = rating < 2? "Bad, target not met" 
        : rating > 2 ? "Great, surpassed the target" : "not too bad but could be better";


    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};



if (require.main === module) {
    const {exerHours, target} = parseExArguements(process.argv);
    console.log(calculateExercises(exerHours, target));
}