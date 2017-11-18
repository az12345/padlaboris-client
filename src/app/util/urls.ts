export class Urls {

  static DOMAIN = 'https://padla-boris.herokuapp.com/';
  // static DOMAIN = 'http://localhost:9090/';

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

  static putPatientDisease(patientId: number) {
    return Urls.postPatientDisease(patientId);
  }

  static deletePatientDisease(patientId: number, diseaseId: number) {
    return Urls.getPatientDiseases(patientId) + '/' + diseaseId;
  }

  static postPatientProcedure(patientId: number) {
    return Urls.DOMAIN + 'api/v1/patients/' + patientId + '/procedures';
  }

  static getDiseaseRecipes(diseaseId: number) {
    return Urls.DOMAIN + 'api/v1/diseases/' + diseaseId + '/recipes';
  }

  static postDiseaseRecipe(diseaseId: number) {
    return Urls.getDiseaseRecipes(diseaseId);
  }

  static putDiseaseRecipe(diseaseId: number) {
    return Urls.getDiseaseRecipes(diseaseId);
  }

  static deleteDiseaseRecipe(diseaseId: number, recipeId: number) {
    return Urls.getDiseaseRecipes(diseaseId) + '/' + recipeId;
  }
}
