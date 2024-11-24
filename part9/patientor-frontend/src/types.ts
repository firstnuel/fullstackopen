export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export type Centre = 'OccupationalHealthcare' |'Hospital' |'HealthCheck';

export type Entry  = 
  | HospitalEntry 
  | EmployerEntry 
  | HealthCheckEntry;

export interface Leave {
  startDate: string,
  endDate: string
}

export interface Discharge {
  date: string,
  criteria: string
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  type: Centre,
}

export interface HospitalEntry extends BaseEntry {
  discharge?: Discharge,
}

export interface HealthCheckEntry extends BaseEntry {
  healthCheckRating?: HealthCheckRating
}

export interface EmployerEntry extends BaseEntry {
  employerName?: string,
  sickLeave?: Leave,
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<HospitalEntry | EmployerEntry | HealthCheckEntry>;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;


// export interface Entry {
//   id: string,
//   date: string,
//   type: Centre,
//   specialist: string,
//   diagnosisCodes?: Array<Diagnosis["code"]>,
//   description: string,
//   discharge?: Discharge,
//   employerName?: string,
//   sickLeave?: Leave,
//   healthCheckRating?: number
// }