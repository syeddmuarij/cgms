import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private dynamoUrl = 'http://localhost:8000/sensordata/';
  private sensorUrl = 'http://localhost:8000/latestsensordata/';
  private predictionUrl = 'http://localhost:8000/predictglucose/';

  constructor(private http: HttpClient) { }

  getLatestDynamoData(data: any): Observable<any> {
    return this.http.post<any>(this.dynamoUrl, data);
  }

  getLatestSensorData(): Observable<any> {
    return this.http.get<any>(this.sensorUrl);
  }

  predictGlucose(data: any): Observable<any> {
    return this.http.post<any>(this.predictionUrl, data);
  }
}
