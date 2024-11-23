import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = '/api/diaries'

const fetchEntries = async (): Promise<DiaryEntry[] | undefined>  => {
    const res = await axios.get(baseUrl)
    return res.data
}

const addEntry = async (newEntryData: NewDiaryEntry): Promise<DiaryEntry | undefined> => {
    const res = await axios.post(baseUrl, newEntryData)
    return res.data
}


export default {
    fetchEntries,
    addEntry
}