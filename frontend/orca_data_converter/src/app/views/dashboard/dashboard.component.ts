import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SelectItem} from 'primeng/api';

interface Brand {
  name: string;
  id: string;
}

interface BrandsGroup {
  groupName: string;
  brands: Brand[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  brandGroups: BrandsGroup[] = [];
  selectedBrands: Brand[] = [];

  constructor() { }

    ngOnInit() {
      this.brandGroups = [
          {
              groupName: "Sports",
              brands: [
                  {
                      name: "Adidas",
                      id: "sports_1"
                  },
                  {
                      name: "Puma",
                      id: "sports_2"
                  },
                  {
                      name: "Nike",
                      id: "sports_3"
                  },
                  {
                      name: "HRX",
                      id: "sports_4"
                  },
              ]
          },
          {
              groupName: "Transport",
              brands: [
                  {
                      name: "Delhivery",
                      id: "trans_1"
                  },
                  {
                      name: "DHL",
                      id: "trans_2"
                  },
                  {
                      name: "FedEx",
                      id: "trans_3"
                  }
              ]
          },
          {
              groupName: "Clothing",
              brands: [
                  {
                      name: "Peter England",
                      id: "clothing_1"
                  },
                  {
                      name: "Allen Solly",
                      id: "clothing_2"
                  }
              ]
          }
      ];
  }
  }


