import { z } from 'zod';
import { NewPtDataSchema } from "./utils";

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

export interface patientData {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
}

export type NonSensitivePtData = Omit<patientData, 'ssn'>;

export type NewPatientData = z.infer<typeof NewPtDataSchema>;


