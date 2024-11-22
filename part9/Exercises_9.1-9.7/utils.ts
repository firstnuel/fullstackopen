interface parsedBmiResults {
    height: number,
    weight: number
}
interface parsedExResults {
    exerHours: number[],
    target: number
}

export const parseBmiArguements = (args: string[]): parsedBmiResults => {

    if (args.length < 4) throw new Error("Not enough arguements");
    if (args.length > 4) throw new Error("Too many arguements");

    if(!isNotNumber(args[2]) && !isNotNumber(args[3])){
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const parseExArguements = (args: string[]): parsedExResults => {

    if (args.length < 4) throw new Error("Not enough arguements");
    const exerArgs = args.slice(3);
    let target: number; 

    if (!isNotNumber(args[2])) {
        target = Number(args[2]);
    } else {
        throw new Error('target value is not number!');
    }

    const exerHours = exerArgs.map(arg => {
        if(!isNotNumber(arg)){
            return Number(arg);
        } else {
            throw new Error('one or more values were not numbers!');
        }
    });

    return {exerHours, target};
};

export const isNotNumber = (argument: unknown): boolean =>
    isNaN(Number(argument));
  