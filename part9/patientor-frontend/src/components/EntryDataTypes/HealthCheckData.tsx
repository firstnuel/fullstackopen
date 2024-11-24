import { HealthCheckEntry , HealthCheckRating } from "../../types";
import { Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const HealthCheckData = ({ entry }: { entry: HealthCheckEntry }) => {

    let healthcolor: string ;
      switch (entry.healthCheckRating as number) {
        case HealthCheckRating.Healthy:
          healthcolor = "green";
          break;
        case HealthCheckRating.CriticalRisk:
          healthcolor = "lightGreen";
          break;
        case HealthCheckRating.LowRisk:
          healthcolor = "yellow";
          break;
        default:
          healthcolor = "red";
      }


    return (
      <div style={{ border: '2px solid black', margin: '10px', padding: '5px'}}>
          <Typography variant="body1">{entry.date}
          <MedicalInformationIcon sx={{ color: 'black' }}  fontSize="medium" />
          </Typography>
          <Typography variant="body2" style={{ fontStyle: 'italic'}}>{entry.description}</Typography>
          <FavoriteIcon sx={{ color: healthcolor || 'black' }}  fontSize="medium" />  
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
        </div>
        );
};

export default HealthCheckData;

