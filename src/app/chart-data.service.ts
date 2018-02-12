import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';

@Injectable()
export class ChartDataService {
  constructor(private http: HttpClient) {
      this.getJSON().subscribe(data => {
      });
  }

  public getJSON(): Observable<any> {
      return this.http.get("../assets/IndegoQ12017.json")
  }
}
