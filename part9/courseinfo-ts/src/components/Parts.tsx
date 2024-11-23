import { CoursePart } from "../types"
import { assertNever } from "../utils";

const Part = ( part: CoursePart ) => {

    switch (part.kind) {
        case "basic" :
            return (
            <div>{part.description}</div>
        );
        case "group":
            return (
            <div>project exercises {part.groupProjectCount}</div>
        );
        case "background" :
            return (
            <>
                <div>{part.description}</div>
                <div>{part.backgroundMaterial}</div>
            </>);
        case "special" :
            return (
                <>
                    <div>{part.description}</div>
                    <div>required skills: {part.requirements.join()}</div>
                </>);
        default:
            return assertNever(part);
      
    }
};

export default Part