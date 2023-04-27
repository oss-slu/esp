import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SelectItem} from 'primeng/api';

interface Brand {
  name: string;
  search_terms: string;
  sections: number;
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
              groupName: "Cartesian Coordinates (Angstroem)",
              brands: [
                  {
                      name: "Section 1",
                      search_terms: "cartesian coordinates (angstroem)",
                      sections: 1
                  },
                  {
                      name: "Section 2",
                      search_terms: "cartesian coordinates (angstroem)",
                      sections: 2
                  },
                  {
                      name: "Section 3",
                      search_terms: "cartesian coordinates (angstroem)",
                      sections: 3
                  },
                  {
                      name: "Section 4",
                      search_terms: "cartesian coordinates (angstroem)",
                      sections: 4
                  },
              ]
          },
          {
              groupName: "Cartesian Coordinates (A.U.)",
              brands: [
                  {
                      name: "Section 1",
                      search_terms: "cartesian coordinates (a.u.)",
                      sections: 1
                  },
                  {
                      name: "Section 2",
                      search_terms: "cartesian coordinates (a.u.)",
                      sections: 1
                  },
                  {
                      name: "Section 3",
                      search_terms: "cartesian coordinates (a.u.)",
                      sections: 1
                  }
              ]
          },
          {
              groupName: "Internal Coordinates (Angstroem)",
              brands: [
                  {
                      name: "Section 1",
                      search_terms: "internal coordinates (angstroem)",
                      sections: 1
                  },
                  {
                      name: "Section 2",
                      search_terms: "internal coordinates (angstroem)",
                      sections: 2
                  }
              ]
          },
          {
            groupName: "Internal Coordinates (A.U.)",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 1
                },
                {
                    name: "Section 2",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 2
                }
            ]
          },
          {
            groupName: "Basis Set Information",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "basis set information",
                    sections: 1
                },
                {
                    name: "Section 2",
                    search_terms: "basis set information",
                    sections: 2
                }
            ]
          },
          {
            groupName: "Orbital Energies",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "orbital energies",
                    sections: 1
                }
            ]
          },
          {
            groupName: "Mulliken Atomic Charges",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "mulliken atomic charges",
                    sections: 1
                }
            ]
          },
          {
            groupName: "Mulliken Reduced Orbital Charges",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "mulliken reduced orbital charges",
                    sections: 1
                }
            ]
          },
          {
            groupName: "Loewdin Atomic Charges",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "loewdin atomic charges",
                    sections: 1
                }
            ]
          },
          {
            groupName: "Timings",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "timings",
                    sections: 1
                }
            ]
          },
          {
            groupName: "Vibrational Frequencies",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "vibrational frequencies",
                    sections: 1
                }
            ]
          }
      ];
  }
  }


