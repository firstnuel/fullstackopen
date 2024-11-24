import patientsData from '../../data/patients';
import { PatientData, NonSensitivePtData, NewPatientData, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';


const getPatientsData = (): PatientData[] => {
    return patientsData;
  };
  
const getPatientById = (id: string): PatientData | undefined => {
    const ptData: PatientData | undefined = patientsData.find((data: PatientData) => data.id === id);
    return ptData;
};

const getNoneSensitivePtData = (): NonSensitivePtData[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatientData = ( ptData: NewPatientData ): NonSensitivePtData => {
    const newData = {  ...ptData, id: uuid() };
    patientsData.push(newData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, entries, ...nonSensitivePtData } = newData;
    return nonSensitivePtData;
};

const addPtDataEntry = ( entryData: EntryWithoutId, id: string ): Entry | undefined => {
    const newData = { ...entryData, id: uuid() };
    const ptData: PatientData | undefined = patientsData.find((data: PatientData) => data.id === id);
    if ( ptData !== undefined) {
        ptData.entries = [...(ptData.entries || []), newData];
    }
    return ptData ? newData : undefined;
};

export default {
    getPatientsData,
    getNoneSensitivePtData,
    addPatientData,
    getPatientById,
    addPtDataEntry
};