import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public options = [
    {
      label: 'Cartesian Coordinates (Angstroem)',
      value: {
        label: 'Category-1',
        childOptions: [
          {
            label: 'Section 1',
            value: {
              label: 'Sub-Category-1-1',
              childOptions: []
            }
          },
          {
            label: 'Section 2',
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
      label: 'Cartesian Coordinates (A.U.)',
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

  public onPanelHide($event) {
    console.log($event);
  }
}
