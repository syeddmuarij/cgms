import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../api/api.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cgms';
  usersdata: any;
  health_data: any;
  predict_data: any;
  showResult: boolean = false;

  userform = new FormGroup({
    GENDER: new FormControl(''),
    AGE: new FormControl(''),
    NIR: new FormControl('')
  });

  constructor(private healthdata: ApiService) {}

  get GENDER() {
    return this.userform.get('GENDER');
  }

  get AGE() {
    return this.userform.get('AGE');
  }

  get NIR() {
    return this.userform.get('NIR');
  }

  sendvalue(data: any) {
    console.log("formdata", data);
  }

  fetchDynamoHealthData() {
    const formData = this.userform.value;
    this.healthdata.getLatestDynamoData(formData).subscribe(
      (result) => {
        this.usersdata = result;
        console.log(result);
      },
      (error) => {
        console.error('Error syncing dynamo data:', error);
      }
    );
  }

  FetchUserHealthData() {
    this.healthdata.getLatestSensorData().subscribe((result) => {
      console.log(result);
      this.health_data = result;

      // Set form control value for L
      if (this.health_data && this.health_data.L) {
        this.userform.patchValue({ NIR: this.health_data.L });
      }
    });
  }

  Sendheartdata(data: any) {
    this.healthdata.predictGlucose(data).subscribe(
      (result) => {
        console.log('Prediction result:', result);
        this.predict_data = result;
        this.showResult = true;
        console.log('showResult set to true');
      },
      (error) => {
        console.error('Error predicting glucose:', error);
        if (error.error) {
          console.error('Error details:', error.error);
        }
      }
    );
  }
}
