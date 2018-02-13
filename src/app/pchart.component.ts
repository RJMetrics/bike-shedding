import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartDataService } from './chart-data.service';

@Component({
    selector: 'piechart',
    templateUrl: './pchart.component.html',
    styleUrls: ['./pchart.component.css']
  })

  export class PieComponent implements OnInit {
    @ViewChild('pieCanvas') pieCanvas: ElementRef;
    pieChart = [];
    Zero: any = [0, 0, 0];
    Thirty: any = [0, 0, 0];
    // WalkUp: any = [0, 0, 0];
    // Indego30: any = [0, 0, 0];
    // IndegoFlex: any = [0, 0, 0];


    constructor(private chartService: ChartDataService) {}

    ngOnInit() {
        const data = this.chartService.getJSON().subscribe((res) => {
          console.log('data', res.data);
          res.data.forEach(item => {
            this.categorize((new Date(item.start_time)).getMonth(), item.plan_duration);
            return res.data;
          });
          this.generatePieChart();
        });
      }

      generatePieChart() {
        this.pieChart = new Chart(this.pieCanvas.nativeElement.getContext('2d'), {
          type: 'doughnut',
          data: {
            labels: ["January", "February", "March"],
              datasets: [
                  {
                    data: [this.Zero[0], this.Zero[1], this.Zero[2]],
                    label: "January",
                  
                    backgroundColor: [
                      'rgba(203, 238, 243, 1)',
                      'rgba(118, 222, 333, 7)',
                      'rgba(95, 105, 114, 1)'
                    ],
                      
                    // borderColor: 'rgba(118, 222, 333, 7)',
                    // borderWidth: 1
                    
                  },
                  {
                    data: [this.Thirty[0], this.Thirty[1], this.Thirty[2]],
                    label: "February",
                    backgroundColor: [
                      'rgba(203, 238, 243, 1)',
                      'rgba(118, 222, 333, 7)',
                      'rgba(95, 105, 114, 1)'
                    ]     
                  },
                 
                ]
          },
          options: {
            legend: {
              
               labels: {
                  usePointStyle: true
               }
            },
            responsive: true
          },
         
        });
      }
    
    
      categorize(month: number, planType: string) {
        switch(planType) {
          case '0': 
            this.Zero[month]++;
          case '30':
            this.Thirty[month]++;
          default:
            break;
        }
      }
    }
    