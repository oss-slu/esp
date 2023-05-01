import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dashboard:any;
  
  constructor() {
    this.dashboard = window.location.pathname
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
