import { CoursePart } from "../types"
import Part from "./Parts";

interface ContentProps {
    courseParts: CoursePart[]
};

const Content = ( { courseParts }: ContentProps ) => {

    return (
        <>
            { courseParts.map((part: CoursePart) => 
                (
                    <div key={part.name}>
                        <p><b>{part.name} {part.exerciseCount}</b></p>
                        <Part {...part}/>
                    </div> 
                 )
            ) }
        </>
    );
};

export default Content;