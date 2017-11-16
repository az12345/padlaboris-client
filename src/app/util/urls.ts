export class Urls {

  static DOMAIN = 'https://padla-boris.herokuapp.com/';
  // static DOMAIN = 'http://localhost:9090/';

  static postAuth() {
    return Urls.DOMAIN + 'auth';
  }

  static getPatient(patientId: number) {
    return Urls.DOMAIN + 'patients/' + patientId;
  }

  static getPatientProcedures(patientId: number) {
    return Urls.DOMAIN + 'api/v1/patients/' + patientId + '/procedures';
  }

  static getPatientDiseases(patientId: number) {
    return Urls.DOMAIN + 'api/v1/patients/' + patientId + '/diseases';
  }
}
