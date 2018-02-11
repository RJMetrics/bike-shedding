import {Injectable} from '@angular/core';
import { HttpModule } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class DataImportService {
  constructor(private _http: HttpClient) {}
  public getTripDetails(): Observable<any> {
    return this._http.get
    ('/assets/dumps/IndegoQ1.json');
  }
}
