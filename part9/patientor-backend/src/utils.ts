import { Gender, NewPatientData } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(s => s.toString()).includes(param);
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender ' + gender);
    }
    return gender;
};

const parseDate = (dob: unknown): string => {
    if (!isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect d.o.b: ' + dob);
    }
    return dob;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
      throw new Error('Incorrect name');
    }
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
      throw new Error('Incorrect ssn');
    }
    return ssn;
};

const parseOccupation = (occ: unknown): string => {
    if (!isString(occ)) {
      throw new Error('Incorrect occ');
    }
    return occ;
};

export const toNewPatientData = (object: unknown): NewPatientData => {
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }
  
    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object && 'occupation' in object)  {
      const newPtData: NewPatientData = {
        name: parseName(object.name),
        gender: parseGender(object.gender),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation)
      };
  
      return newPtData;
    }
  
    throw new Error('Incorrect data: some fields are missing');
  };


