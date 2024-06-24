import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private dynamoUrl = 'https://render-backend-o1ba.onrender.com/sensordata/';
  private sensorUrl = 'https://render-backend-o1ba.onrender.com/latestsensordata/';
  private predictionUrl = 'https://render-backend-o1ba.onrender.com/predictglucose/';

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
