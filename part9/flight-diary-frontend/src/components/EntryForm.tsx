import { useState } from "react"
import { DiaryEntry, Visibility, Weather } from "../types";
import { toNewDiaryEntry } from "../utils";
import entriesService from "../services/entries";
import { errorMsg } from "../utils";

interface EntryFormProps {
    entries: DiaryEntry[],
    setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const EntryForm = ({ setEntries, entries }: EntryFormProps) => {

    const [ error, setError ] = useState('');
    const [ date, setDate ] = useState('')
    const [ selVisibility, setVisibility] = useState('');
    const [ selWeather, setWeather ] = useState('')
    const [ comment, setComment ] = useState('')

    const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVisibility(event.target.value);
    };

    const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeather(event.target.value);
    };

    const submit = async (e: React.SyntheticEvent ) => {
        e.preventDefault();

        const newEntry = {
            date,
            weather: selWeather,
            visibility: selVisibility,
            comment
        } 
        try{
            const newEntryData = toNewDiaryEntry(newEntry)
            const data = await entriesService.addEntry(newEntryData)
            if (data) {
                setEntries(entries.concat(data))
                setDate('')
                setVisibility('')
                setWeather('')
                setComment('')
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                errorMsg(error.message, setError)
            }
        }
    }


    return (
        <>
            <h2>Add new entry</h2>
            {error && <div>{error}</div>}
            <form onSubmit={submit}>
                <div>
                    date: 
                    <input
                    value={date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                    type="date"
                    />
                </div>

                <div>
                    <span>select visibility: </span>
                    {Object.values(Visibility).map((visibility) => (
                        <span key={visibility}>
                            <label htmlFor={visibility}>
                                <input
                                    type="radio"
                                    id={visibility}
                                    name="visibility"
                                    value={visibility}
                                    checked={selVisibility === visibility}
                                    onChange={handleVisibilityChange}
                                />
                                {visibility}
                            </label>
                        </span>
                    ))}
                </div>
                <div>
                    <span>select weather: </span>
                    {Object.values(Weather).map((weather) => (
                        <span key={weather}>
                            <label htmlFor={weather}>
                                <input
                                    type="radio"
                                    id={weather}
                                    name="weather"
                                    value={weather}
                                    checked={selWeather === weather}
                                    onChange={handleWeatherChange}
                                />
                                {weather}
                            </label>
                        </span>
                    ))}
                </div>
                <div>
                    comment: 
                    <input
                    value={comment}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                    type="text"
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )

}


export default EntryForm