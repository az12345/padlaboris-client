import {Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import {Router} from "@angular/router";

declare var $: any;

@Injectable()
export class HttpHandler extends Http {

  constructor(backend: XHRBackend,
              options: RequestOptions,
              public http: Http,
              private router: Router) {
    super(backend, options);
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options)
      .catch(this.handleError);
  }

  public handleError = (error: Response) => {
    if (error.status === 403) {
      const self = this;
      $('.load-screen').addClass('on');

      setTimeout(function () {
        $('.load-screen').removeClass('on');
        self.router.navigate(['/login']);
      }, 300);
    }
    return Observable.throw(error);
  }
}
