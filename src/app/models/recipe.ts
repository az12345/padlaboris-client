import {Disease} from "./disease";

export class Recipe {

  id: number;
  issueDate: number;
  expireDate: number;
  medicineName: string;
  dosage: string;
  disease: Disease;

}
