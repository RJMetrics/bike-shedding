import { Component, ViewChild } from '@angular/core';
import { DataImportService } from './app.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'chart',
  templateUrl: './chart.html',
  styleUrls: ['./app.component.css']
})
export class ChartComponent {

  ELEMENT_DATA: any;  

  chart = [];
  
  constructor(private pLoanService: DataImportService) {
    
 }

  ngOnInit() {
    this.pLoanService.getTripDetails()
      .subscribe(res => {
        
        console.log('he', res);

        let temp_max = res['list'].map(res => res.main.temp_max)
        let temp_min = res['list'].map(res => res.main.temp_min)
        let alldates = res['list'].map(res => res.dt)

        let weatherDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
        })

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        })

      })
  }
}
