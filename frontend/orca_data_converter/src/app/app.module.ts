import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule }
    from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MultiSelectModule } from "primeng/multiselect";
import { Dashboard1Component } from './views/dashboard1/dashboard1.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    Dashboard1Component
  ],
  exports: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MultiSelectModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
