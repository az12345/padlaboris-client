import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  get(url: string) {
    let response: Response;
    this.http.get(url).subscribe(r => response = r);
  }
}
