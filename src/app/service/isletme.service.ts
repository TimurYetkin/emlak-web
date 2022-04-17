import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageOptions } from '../model/page-options.model';

const API_URL = `${environment.BASE_URL}/isletme`;

@Injectable({
  providedIn: 'root',
})
export class IsletmeService {
  constructor(private readonly http: HttpClient) {}

  getAllIsletmeList(pageOptions: PageOptions): Observable<any> {
    return this.http.get(
      API_URL + '?page=' + pageOptions.page + '&size=' + pageOptions.size
    );
  }

  getIsletme(id: number): Observable<any> {
    return this.http.get(API_URL + '/' + id);
  }

  getIsletmeListValueLabel() {
    return this.http.get(API_URL + '/list-value-label');
  }

  saveIsletme(isletme: any): Observable<any> {
    return this.http.post(API_URL, isletme);
  }

  updateIsletme(isletme: any): Observable<any> {
    return this.http.put(API_URL + '/' + isletme.id, isletme);
  }

  removeIsletme(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  saveIsletmeMusteri(isletmeMusteri: any): Observable<any> {
    return this.http.post(API_URL + '/musteri', isletmeMusteri);
  }

  removeIsletmeMusteri(musteriId: number, isletmeId: number): Observable<any> {
    return this.http.delete(
      `${API_URL}/musteri?musteriId=${musteriId}&isletmeId=${isletmeId}`
    );
  }
}
