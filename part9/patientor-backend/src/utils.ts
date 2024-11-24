import { Gender } from "./types";
import { z } from 'zod';


export const LeaveSchema = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
});

export const DischargeSchema = z.object({
  date: z.string().date(),
  criteria: z.string(),
});

export const EntrySchema = z.object({
  id: z.string(),
  date: z.string().date(),
  type: z.enum(['OccupationalHealthcare', 'Hospital', 'HealthCheck']),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  description: z.string(),
  discharge: DischargeSchema.optional(),
  employerName: z.string().optional(),
  sickLeave: LeaveSchema.optional(),
  healthCheckRating: z.number().optional()
});

export const NewEntrySchema = z.object({
  date: z.string().date(),
  type: z.enum(['OccupationalHealthcare', 'Hospital', 'HealthCheck']),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  description: z.string(),
  discharge: DischargeSchema.optional(),
  employerName: z.string().optional(),
  sickLeave: LeaveSchema.optional(),
  healthCheckRating: z.number().optional()
});

export const NewPtDataSchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});


// export const toNewPatientData = (object: unknown): NewPatientData => {
//   return NewPtDataSchema.parse(object);
// };

// export const toNewEntryData = (object: unknown): EntryWithoutId => {
//   return NewEntrySchema.parse(object);
// };


