import { Gender, NewPatientData } from "./types";
import { z } from 'zod';

export const NewPtDataSchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  occupation: z.string()
});

export const toNewPatientData = (object: unknown): NewPatientData => {
  return NewPtDataSchema.parse(object);
};



