import { HospitalEntry } from "../../types";
import { Typography } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalData = ({ entry }: { entry: HospitalEntry }) => {

    return (
        <div style={{ border: '2px solid black', margin: '10px', padding: '5px'}}>
          <Typography variant="body1">{entry.date}
            <LocalHospitalIcon sx={{ color: 'black' }}  fontSize="medium" />
          </Typography>
          <Typography variant="body2" style={{ fontStyle: 'italic'}}>{entry.description}</Typography>
          <Typography variant="body2">
            discharged:  {entry.discharge?.date} - {entry.discharge?.criteria}
          </Typography>
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
        </div>
        );
};

export default HospitalData;

