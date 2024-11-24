import { EmployerEntry } from "../../types";
import { Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

const OccHealthcareData = ({ entry }: { entry: EmployerEntry }) => {

    return (
        <div style={{ border: '2px solid black', margin: '10px', padding: '5px'}}>
          <Typography variant="body1">{entry.date}
            <WorkIcon sx={{ color: 'black' }}  fontSize="medium" /> 
            <span style={{ fontStyle: 'italic'}}>{entry.employerName}</span>
          </Typography>
          <Typography variant="body2" style={{ fontStyle: 'italic'}}>{entry.description}</Typography>
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
        </div>
        );
};

export default OccHealthcareData;

