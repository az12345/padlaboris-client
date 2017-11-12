import {Headers} from "@angular/http";

export class HeaderUtils {

  static withJson() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return headers;
  }

  static withToken() {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem("token"));
    return headers;
  }

  static withJsonAndToken() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', localStorage.getItem("token"));
    return headers;
  }

}
