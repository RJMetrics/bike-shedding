import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartDataService } from './chart-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  chart = [];
  OneWay: any = [0, 0, 0];
  RoundTrip: any = [0, 0, 0];

  constructor(private chartService: ChartDataService) {}

  ngOnInit() {
    const data = this.chartService.getJSON().subscribe((res) => {
      console.log('data', res.data);
      res.data.forEach(item => {
        this.categorize((new Date(item.start_time)).getMonth(), item.trip_route_category);
        return res.data;
      });
      this.generateChart();
    });
  }

  generateChart() {
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ["January", "February", "March"],
          datasets: [
              {
                data: [this.OneWay[0], this.OneWay[1], this.OneWay[2]],
                label: "One Way Trips",
                backgroundColor: 'rgba(0, 153, 255, 0.2)',
                borderColor: 'rgba(0, 153, 255, 1)',
                borderWidth: 1
              },
              {
                data: [this.RoundTrip[0], this.RoundTrip[1], this.RoundTrip[2]],
                label: "Round Trips",
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1      
              }
            ]
      },
      options: {
          responsive: true
      }
    });
  }

  categorize(month: number, tripType: string) {
    switch(tripType) {
      case 'Round Trip': 
        this.RoundTrip[month]++;
      case 'One Way':
        this.OneWay[month]++;
      default:
        break;
    }
  }
}
