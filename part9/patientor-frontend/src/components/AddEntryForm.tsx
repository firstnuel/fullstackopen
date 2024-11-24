import {  TextField, Grid, Button, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState, SyntheticEvent, useEffect } from 'react';
import diagnosesService from '../services/diagnoses';
import patientsService from '../services/patients';
import { Centre, NewEntry, Diagnosis, Leave, Discharge, Patient } from '../types';
import { AxiosError } from "axios";

interface ShowProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    pt: Patient
}


const AddEntryForm = ( { show, setShow, pt }: ShowProps ) => {
  const [selectedType, setSelectedType] = useState<Centre | "">("");
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');
  const [rating, setRating] = useState('');
  const [employer, setEmployer] = useState('');
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [selctdCodes, setSelctdCodes] = useState<string[]>([]);

  const diaCodes: Array<Diagnosis['code']> = Object.values(diagnoses).map(d => d.code);
  
  const [diagCodes, setDiagCodes] = useState('');
  const onCancel = () => setShow(false);

  const onCodeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      if (value) {
        setDiagCodes(value);
      }
    }
  };

  const submit = async (e: SyntheticEvent) => {
    e. preventDefault();

    const newData: NewEntry = {
        date,
        specialist,
        type: selectedType as Centre,
        description,
        diagnosisCodes: selctdCodes,
        ...(rating && { rating }),
        ...(employer && { employerName: employer }),
        ...(startDate && endDate && {
            sickLeave : { startDate, endDate } as Leave
        }),
        ...(dischargeDate && criteria && {
            discharge: { date: dischargeDate, criteria } as Discharge
        })
    };
    try {
        const newEntry = await patientsService.addEntry(newData, pt.id);
        if (newEntry){
            pt.entries = [...(pt.entries), newEntry];
            setShow(false);

        }
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error(error.message);
        }
    }
  };

  useEffect(() => {
    diagnosesService.getAll()
      .then((data: Diagnosis[]) => setDiagnoses([...data]))
      .catch((error: unknown) => {
        if (error instanceof AxiosError) {
          console.error(error);
        }
      });
  }, []); 

  const addCode = () => {
    setSelctdCodes(selctdCodes.concat(diagCodes));
    setDiagCodes('');
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value as Centre);
  };

if (!show) return null;

return (
    <div style={{ border: '2px dashed black', margin: '10px', padding: '5px' }}>
      <h3>New HealthCheck Entry</h3>
      <div>
      <label htmlFor="centre-select">Select Entry Type: </label>
      <select
        id="centre-select"
        value={selectedType}
        onChange={handleSelect}
      >
        <option value="" disabled>
          Choose here
        </option>
        <option value="OccupationalHealthcare">Occupational Healthcare</option>
        <option value="Hospital">Hospital</option>
        <option value="HealthCheck">Health Check</option>
      </select>
      {selectedType && <p>Selected Centre: {selectedType}</p>}
    </div>
      <form onSubmit={submit} id="myForm">
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ marginBottom: "10px" }}
        />
        {selectedType === 'OccupationalHealthcare' &&  
        <TextField
          label="Employer"
          fullWidth
          value={employer}
          onChange={({ target }) => setEmployer(target.value)}
          style={{ marginBottom: "10px" }}
        />
        }
        {selectedType === 'HealthCheck' &&  
        <TextField
          label="HealthCheck Rating"
          type="number"
          inputProps={{ max: 4, min: 0 }}
          fullWidth
          value={rating}
          onChange={({ target }) => setRating(target.value)}
          style={{ marginBottom: "20px" }}
        />}

        <InputLabel>Diagnosis Code</InputLabel>
        <div  style={{ display: "flex", marginBottom: 10 }}>
        <Select
          label="Diagnosis Codes"
          fullWidth
          value={diagCodes}
          onChange={onCodeChange}
        >
        {diaCodes.map(option =>
          <MenuItem
            key={option}
            value={option}
          >
            {option
          }</MenuItem>
        )}
        </Select>
        <Button
         style={{ height: '4em'}}
          variant="contained"
          color="primary"
          onClick = {addCode}
        >
          Add Code
         </Button>
        </div>
        <div style={{ marginBottom: "10px" }}>Selected Diagnosis Codes: {selctdCodes.join(', ')}</div>

        {selectedType === 'OccupationalHealthcare' &&  
            <>
          <InputLabel style={{ marginBottom: "5px" }}>Sick Leave</InputLabel>
          <div style={{ display: "flex", marginBottom: 10 }}>
            <TextField
            label="Start"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={({ target }) => setStartDate(target.value)}
            style={{ marginBottom: "10px" }}
            />
            <TextField
            label="End"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={({ target }) => setEndDate(target.value)}
            style={{ marginBottom: "10px" }}
            />
          </div>
            </>
        }

        {selectedType === 'Hospital' &&  
            <>
          <InputLabel style={{ marginBottom: "5px" }}>Discharge</InputLabel>
          <div style={{ display: "flex", marginBottom: 10}}>
            <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
            style={{ marginBottom: "10px" }}
            />
            <TextField
            label="Criteria"
            fullWidth
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
            style={{ marginBottom: "10px" }}
            />
          </div>
            </>
        }

        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};  

export default AddEntryForm;