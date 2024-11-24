import { Patient, Entry } from "../types";
import { useParams } from "react-router-dom";
import { Typography, Button } from '@mui/material';
import { useEffect, useState } from "react";
import patientsService from "../services/patients";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryData from "./EntryData";
import AddEntryForm from "./AddEntryForm";
import { AxiosError } from "axios";

const ViewPatient = () => {
  const [patient, setPatient] = useState<Patient | ''>('');
  const [show, setShow] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(()=> {
    patientsService.getByID(id as string)
    .then((data: Patient) => setPatient(data))
    .catch((error: unknown) => {
        if (error instanceof AxiosError) {
            console.error(error);
        }
    });
  });
  if (!patient) {
    return (
      <Typography variant="h3" >Patient data not found</Typography>
      );
    }

  return (
    <div className="App">
        <h2> {patient.name} 
            {patient.gender === "male" && <MaleIcon sx={{ color: 'black' }}  fontSize="medium" />}
            {patient.gender === "female" && <FemaleIcon sx={{ color: 'black' }}  fontSize="medium" />}
        </h2>
        <Typography variant="body2"> ssn: {patient.ssn} </Typography>
        <Typography variant="body2"> occupation: {patient.occupation}</Typography> 
        <AddEntryForm show={show} setShow={setShow} pt={patient} />
        <Typography variant="h6"  style={{ margin: "0.9em 0", fontWeight: "bold" }}> entries </Typography>
        {
          patient.entries.map((entry: Entry) => (
            <EntryData key={entry.id} entry={entry} />
          ))
        }
        <Button variant="contained" 
          onClick={() => setShow(true)}
          color="primary">
            ADD NEW ENTRY
        </Button>
    </div>
    );
};


export default ViewPatient;