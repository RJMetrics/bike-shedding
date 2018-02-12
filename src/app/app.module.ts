import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule,MatCheckboxModule, MatTableDataSource, MatFormFieldModule, MatInputModule,MatPaginatorModule  } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent} from './app.component';
import { ChartComponent} from './chart.component';
import { DataImportService } from './app.service';
import { ChartDataService } from './chart-data.service';
import { MatIconModule } from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  
  ],
  providers: [DataImportService,ChartDataService],
  bootstrap: [AppComponent,ChartComponent]
})
export class AppModule { }

