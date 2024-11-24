import { z } from 'zod';
import { NewPtDataSchema } from "./utils";

export interface Entry {
    id: string,
    date: string,
    type: Centre,
    specialist: string,
    diagnosisCodes?: Array<Diagnosis["code"]>,
    description: string,
    discharge?: Discharge,
    employerName?: string,
    sickLeave?: Leave,
    healthCheckRating?: number
}

export interface Leave {
  startDate: string,
  endDate: string
}

export interface Discharge {
  date: string,
  criteria: string
}

export type Centre = 'OccupationalHealthcare' |'Hospital' |'HealthCheck';

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
  }

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface PatientData {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[],
}

export type NonSensitivePtData = Omit<PatientData, 'ssn' | 'entries'>;

export type NewPatientData = z.infer<typeof NewPtDataSchema>;


type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;


