import { Entry } from "../types";
import OccHealthcareData from "./EntryDataTypes/OccHealthcareData";
import HospitalData from "./EntryDataTypes/HospitalData";
import HealthCheckData from "./EntryDataTypes/HealthCheckData";
import { assertNever } from "../utils";


const EntryData = ({ entry }: { entry: Entry })  => {

    switch (entry.type as string) {
      case 'Hospital' :
        return ( <HospitalData entry={entry} /> );
      case 'OccupationalHealthcare' :
        return ( <OccHealthcareData entry={entry} />);
      case 'HealthCheck' :
        return ( <HealthCheckData entry={entry} />);
      default:
        return assertNever(entry);
    }

};

export default EntryData;