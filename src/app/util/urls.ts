export class Urls {

  static DOMAIN = 'https://padla-boris.herokuapp.com/';

  static getPatientProcedures(patientId: number) {
    return Urls.DOMAIN + 'api/v1/patients/' + patientId + '/procedures';
  }

}
