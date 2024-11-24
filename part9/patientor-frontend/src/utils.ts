import { Entry } from "./types";

export const assertNever = (value: never | Entry): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };