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
    OneWay: any = [0, 0, 0];
    RoundTrip: any = [0, 0, 0];
    WalkUp: any = [0, 0, 0];
    Indego30: any = [0, 0, 0];
    IndegoFlex: any = [0, 0, 0];


    constructor(private chartService: ChartDataService) {}

    ngOnInit() {
        const data = this.chartService.getJSON().subscribe((res) => {
          console.log('data', res.data);
          res.data.forEach(item => {
            this.categorize((new Date(item.start_time)).getMonth(), item.passholder_type);
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
            // labels1: ["W", "30", "flex"],
              datasets: [
                  {
                    data: [this.WalkUp[0], this.Indego30[0], this.IndegoFlex[0]],
                    label: "January",
                    backgroundColor: 'rgba(203, 238, 243, 1)',
                    // borderColor: 'rgba(118, 222, 333, 7)',
                    // borderWidth: 1
                  },
                  {
                    data: [this.WalkUp[1], this.Indego30[1], this.IndegoFlex[1]],
                    label: "February",
                    backgroundColor: 'rgba(95, 105, 114, 1)',
                    // borderColor: 'rgba(0, 0, 0, 1)',
                    // borderWidth: 1      
                  },
                  {
                    data: [this.WalkUp[2], this.Indego30[2], this.IndegoFlex[2]],
                    label: "March",
                    backgroundColor: 'rgba(95, 105, 114, 1)',
                    // borderColor: 'rgba(0, 0, 0, 1)',
                    // borderWidth: 1      
                  }
                ]
          },
          options: {
              responsive: true
          }
        });
      }
    
    
      categorize(month: number, passType: string) {
        switch(passType) {
          case 'Walk-up': 
            this.WalkUp[month]++;
          case 'Indego30':
            this.Indego30[month]++;
            case 'IndegoFlex':
            this.IndegoFlex[month]++;
          default:
            break;
        }
      }
    }
    