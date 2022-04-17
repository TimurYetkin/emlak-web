import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageOptions } from '../model/page-options.model';

const API_URL = `${environment.BASE_URL}/emlak`;

@Injectable({
  providedIn: 'root',
})
export class EmlakService {
  constructor(private readonly http: HttpClient) {}

  getAllEmlakList(formRef: any, pageOptions: PageOptions): Observable<any> {
    return this.http.post(
      API_URL + '/list?page=' + pageOptions.page + '&size=' + pageOptions.size,
      formRef
    );
  }

  getEmlak(id: number): Observable<any> {
    return this.http.get(API_URL + '/' + id);
  }

  saveEmlak(emlak: any): Observable<any> {
    return this.http.post(API_URL, emlak);
  }

  updateEmlak(emlak: any): Observable<any> {
    return this.http.put(API_URL + '/' + emlak.id, emlak);
  }

  removeEmlak(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
