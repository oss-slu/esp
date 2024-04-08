import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule }
    from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GDashboardComponent } from './views/gaussianDashboard/gdashboard.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MultiSelectModule } from "primeng/multiselect";
import { Dashboard1Component } from './views/dashboard1/dashboard1.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    GDashboardComponent,
    DashboardComponent,
    Dashboard1Component
  ],
  exports: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
