import patientsData from '../../data/patients';
import { patientData, NonSensitivePtData, NewPatientData } from '../types';
import { v1 as uuid } from 'uuid';

const getPatientsData = (): patientData[] => {
    return patientsData;
  };
  
const getNoneSensitivePtData = (): NonSensitivePtData[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatientData = ( ptData: NewPatientData): NonSensitivePtData => {
    const newData = {  ...ptData, id: uuid() };
    patientsData.push(newData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...nonSensitivePtData } = newData;
    return nonSensitivePtData;
};


export default {
    getPatientsData,
    getNoneSensitivePtData,
    addPatientData
};