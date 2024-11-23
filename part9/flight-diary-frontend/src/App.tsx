import { useState, useEffect } from "react"
import entriesService from "./services/entries";
import { DiaryEntry } from "./types"
import { errorMsg } from "./utils";
import Entries from "./components/Entries";
import EntryForm from "./components/EntryForm";


const App = () =>  {
  const [ entries, setEntries ] = useState<DiaryEntry[]>([]);
  const [error, setError ] = useState('')


  useEffect(() => {
    entriesService.fetchEntries()
    .then((data: DiaryEntry[] | undefined) => {
      if (data) setEntries(data);
    })
    .catch((error: unknown) => {
      if( error instanceof Error) {
        console.log(error.message)
        errorMsg(error.message, setError);}
    });
  }, []);


  return (
    <>
      {error && <div>{error}</div>}
      <EntryForm entries={entries} setEntries={setEntries}/>
      <Entries entries={entries} />
    </>
  );
};

export default App
