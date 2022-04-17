import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageOptions } from '../model/page-options.model';

const API_URL = `${environment.BASE_URL}/musteri`;

@Injectable({
  providedIn: 'root',
})
export class MusteriService {
  constructor(private readonly http: HttpClient) {}

  getAllMusteriList(pageOptions: PageOptions): Observable<any> {
    return this.http.get(
      API_URL + '?page=' + pageOptions.page + '&size=' + pageOptions.size
    );
  }

  getAllMusteriListByIsletmeId(
    isletmeId: number,
    pageOptions: PageOptions
  ): Observable<any> {
    return this.http.get(
      API_URL +
        '/by-isletme/' +
        isletmeId +
        '?page=' +
        pageOptions.page +
        '&size=' +
        pageOptions.size
    );
  }

  getMusteriListValueLabel() {
    return this.http.get(API_URL + '/list-value-label');
  }

  getMusteriByIsletmeListValueLabel(isletmeId: number) {
    return this.http.get(
      API_URL + '/list-by-isletme/value-label?isletmeId=' + isletmeId
    );
  }

  getMusteri(id: number): Observable<any> {
    return this.http.get(API_URL + '/' + id);
  }

  saveMusteri(musteri: any): Observable<any> {
    return this.http.post(API_URL, musteri);
  }

  updateMusteri(musteri: any): Observable<any> {
    return this.http.put(API_URL + '/' + musteri.id, musteri);
  }

  removeMusteri(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
