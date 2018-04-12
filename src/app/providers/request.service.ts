import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { environment as env } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { LocalStorage, LocalStorageService } from './webstorage';
import { Http, Request, RequestMethod, RequestOptions, Headers, URLSearchParams, Response } from '@angular/http';;

@Injectable()
export class RequestService {
  @LocalStorage() private token: string;

  constructor(
    private router: Router,
    private http: Http,
    private localStorage: LocalStorageService) { }

  setToken(token): void {
    this.token = token;

    if (token == null) {
      this.localStorage.remove('token')
    }
  }

  getToken(): string {
    return this.token;
  }

  get(path: string, query: Object, args: any = {}) {
    let searchParams: URLSearchParams = new URLSearchParams();
    let headersOptions = {};

    if (!args.external) {
      for (let field in query) {
        searchParams.set(field, query[field]);
      }
    }

    if (this.getToken()) {
      headersOptions['Authorization'] = this.getToken();
    }

    let headers = new Headers(headersOptions);

    let options = new RequestOptions({
      method: RequestMethod.Get,
      url: path,
      headers: headers,
      search: searchParams
    });

    return this.http.request(new Request(options))
      .map((res: Response) => res.json())
      .catch((err: any) => this.requestMetaCatchObservable(err));
  }

  post(path: string, params: Object, args: any = {}) {
    let headersOptions = {
      'Content-Type': 'text/plain'
    };

    if (this.getToken()) {
      headersOptions['Authorization'] = this.getToken();
    }

    let headers = new Headers(headersOptions);

    let body = {};
    for (let field in params) {
      body[field] = params[field];
    }

    let options = new RequestOptions({
      method: RequestMethod.Post,
      url: path,
      headers: headers,
      body: body
    });

    return this.http.request(new Request(options))
      .map((res: Response) => res.json())
      .catch((err: any) => this.requestMetaCatchObservable(err));
  }

  requestMetaCatchObservable(err): Observable<any> {
    return Observable.throw(err || 'Server Error');
  }

}