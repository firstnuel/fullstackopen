import { parseBmiArguements } from "./utils";

export const calculateBmi = (height: number, weight: number): string => {
    const heightCv = height /100;
    const bmi = weight/(heightCv*heightCv);

    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal range";
    if (bmi < 30) return "Overweight";
    return "Obesity";
};

if (require.main === module) {
    const {height, weight} = parseBmiArguements(process.argv);
    console.log(calculateBmi(height, weight));
}
