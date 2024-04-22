import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import {firstValueFrom} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dashboard:string;
  
  
  constructor(private http: HttpClient, private router: Router) {
    this.dashboard = this.router.url;
  }

  async ngOnInit(): Promise<void> {
    await this.fetchData(); 
  }

  async fetchData(): Promise<void>{
    try {
      const data = await firstValueFrom(this.http.get<any>('http://localhost:5000/api/data'));
      console.log('Data from Flask:', data);
      //assuming Flask endpoint returns options data
      this.options = data.options;  
    } catch (error){
      console.error('Error fetching data:', error);
    }
  }

  async sendMessage(message: string): Promise<void>{
    try {
      const response = await firstValueFrom(this.http.post<any>('http://localhost:4200/api/message', {message})); 
      console.log('Response from Flask:', response);
    }catch (error){
      console.error('Error sending message:', error);
    }
  }
  
  public options = [
    {
      label: 'Category-1',
      value: {
        label: 'Category-1',
        childOptions: [
          {
            label: 'Sub-Category-1-1',
            value: {
              label: 'Sub-Category-1-1',
              childOptions: []
            }
          },
          {
            label: 'Sub-Category-1-2',
            value: {
              label: 'Sub-Category-1-2',
              childOptions: []
            }
          }
        ],
        selectedChildOptions: []
      }
    },
    {
      label: 'Category-2',
      value: {
        label: 'Category-2',
        childOptions: [
          {
            label: 'Sub-Category-2-1',
            value: {
              label: 'Sub-Category-2-1',
              childOptions: []
            }
          },
          {
            label: 'Sub-Category-2-2',
            value: {
              label: 'Sub-Category-2-2',
              childOptions: []
            }
          },
          {
            label: 'Sub-Category-2-3',
            value: {
              label: 'Sub-Category-2-3',
              childOptions: []
            }
          }
        ],
        selectedChildOptions: []
      }
    },
    {
      label: 'Category-3',
      value: {
        label: 'Category-3',
        childOptions: [
          {
            label: 'Sub-Category-3-1',
            value: {
              label: 'Sub-Category-3-1',
              childOptions: []
            }
          },
          {
            label: 'Sub-Category-3-2',
            value: {
              label: 'Sub-Category-3-2',
              childOptions: []
            }
          }
        ],
        selectedChildOptions: []
      }
    }
  ];

  public onPanelHide($event: any) {
    console.log($event);
  }

}
