import {Patient} from "./patient";

export class Disease {

  id: number;
  diseaseName: string;
  diseaseClass: string;
  diseaseCode: string;
  diseaseDescription: string;
  startDate: number;
  endDate: number;
  patient: Patient;
}
