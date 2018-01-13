import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

import { Criteria } from '../model/criteria';
import { Page } from '../model/page';

@Injectable()
export class UserService {

  private resourceUrl = `api/users`;

  constructor(private http: HttpClient) { }

  get(id: number): Observable<User> {
    return this.http.get(`${this.resourceUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post(this.resourceUrl, user);
  }

  update(user: User): Observable<User> {
    return this.http.put(this.resourceUrl, user);
  }

  query(criteria?: Criteria): Observable<Page<User>> {
    let params = new HttpParams();
    if (criteria) {
      params.set('page', String(criteria.page));
      params.set('size', String(criteria.size));
      if (criteria.sort) {
        params.set('sort', criteria.sort);
      }
      params.set('filter', criteria.filter);
    }
    return this.http.get<Page<User>>(this.resourceUrl, { params: params });
  }
}
