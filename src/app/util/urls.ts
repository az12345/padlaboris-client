export class Urls {

  // static DOMAIN = 'https://padla-boris.herokuapp.com/';
  static DOMAIN = 'http://localhost:9090/';

  static postAuth() {
    return Urls.DOMAIN + 'auth';
  }

  static getPatient(patientId: number) {
    return Urls.DOMAIN + 'patients/' + patientId;
  }

  static putPatient() {
    return Urls.DOMAIN + '/patients';
  }

  static getPatientProcedures(patientId: number) {
    return Urls.DOMAIN + 'api/v1/patients/' + patientId + '/procedures';
  }

  static getPatientDiseases(patientId: number) {
    return Urls.DOMAIN + 'api/v1/patients/' + patientId + '/diseases';
  }

  static postPatientDisease(patientId: number) {
    return Urls.getPatientDiseases(patientId);
  }

  static deletePatientDisease(patientId: number, diseaseId: number) {
    return Urls.getPatientDiseases(patientId) + '/' + diseaseId;
  }

  static postPatientProcedure(patientId: number) {
    return Urls.DOMAIN + 'api/v1/patients/' + patientId + '/procedures';
  }
}
