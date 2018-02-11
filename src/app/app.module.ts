import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule,MatCheckboxModule, MatTableDataSource, MatFormFieldModule, MatInputModule,MatPaginatorModule  } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DataImportService } from './app.service';

@NgModule({
  declarations: [
    AppComponent
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
    MatPaginatorModule
  ],
  providers: [DataImportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
