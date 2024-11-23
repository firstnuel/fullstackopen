import { DiaryEntry } from "../types"

const Entries = ({ entries }: { entries: DiaryEntry[] }) => {


    return (
        <>
        <h2>Diary Entries</h2>
        {
            entries.map((entry: DiaryEntry) => (
                <div key={entry.id}>
                    <h3>{entry.date}</h3>
                    <div>visibility: {entry.visibility}</div>
                    <div>weather: {entry.weather}</div>
                </div>
            ))
        }
        </>
    )
}

export default Entries