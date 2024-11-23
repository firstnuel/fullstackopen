import { Weather, Visibility, NewDiaryEntry } from "./types";
import { z } from 'zod';

export const NewDiarySchema = z.object({
    date: z.string().date(),
    weather: z.nativeEnum(Weather),
    visibility: z.nativeEnum(Visibility),
    comment: z.string()
});

export const errorMsg = (msg: string, setErr: (msg: string) => void) => {
    setErr(msg)
    setTimeout(() => {
        setErr('')
    }, 3000)
}

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewDiarySchema.parse(object);
};

