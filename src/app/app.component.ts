import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatTableDataSource, MatPaginator } from '@angular/material';
import { DataImportService } from './app.service';
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { Chart } from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})

export class AppComponent {
  displayedColumns = ['bike_id', 'trip_id', 'start_time', 'end_time', 'passholder_type', 'trip_route_category'];
  ELEMENT_DATA: any;
  dataSource = new MatTableDataSource();    
  
  constructor(private pLoanService: DataImportService) {
    this.getLoansPortfolio();

    
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getLoansPortfolio() {
    this.pLoanService.getTripDetails()
      .subscribe(
      (data) => {
        if (typeof (data) !== 'undefined' && data !== null) {
          console.log(data);
          this.dataSource.data = data.data;

          
        }
      }
      );

      
  }
 

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
}



export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

