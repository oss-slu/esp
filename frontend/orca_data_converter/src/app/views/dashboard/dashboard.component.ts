import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SelectItem} from 'primeng/api';

interface Brand {
  name: string;
  search_terms: string;
  sections: number;
//   specifyLines: string;
//   use_total_lines: boolean;
//   lines: number;
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
  private _options = {headers: new HttpHeaders ({ 'Content-Type' : 'application/json' })}

  brandGroups: BrandsGroup[] = [];
  selectedBrands: Brand[] = [];
  public fileName: string;

  constructor(private http: HttpClient) { }

    ngOnInit() {
      this.brandGroups = [
          {
              groupName: "Cartesian Coordinates (Angstroem)",
              brands: [
                  {
                    name: "Section 1",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 2",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 3",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 4",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 4,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 5",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 5,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 6",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 6,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 7",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 7,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
              ]
          },
          {
              groupName: "Cartesian Coordinates (A.U.)",
              brands: [
                  {
                    name: "Section 1",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 2",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 3",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 4",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 4,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 5",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 5,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 6",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 6,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 7",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 7,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  }
                  
              ]
          },
          {
              groupName: "Internal Coordinates (Angstroem)",
              brands: [
                  {
                    name: "Section 1",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 2",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 3",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 4",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 4,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 5",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 5,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 6",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 6,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  },
                  {
                    name: "Section 7",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 7,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                  }
              ]
          },
          {
            groupName: "Internal Coordinates (A.U.)",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 4",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 4,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 5",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 5,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 6",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 6,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 7",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 7,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Basis Set Information",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "basis set information",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "basis set information",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "basis set information",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 4",
                    search_terms: "basis set information",
                    sections: 4,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Orbital Energies",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "orbital energies",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "orbital energies",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Mulliken Atomic Charges",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "mulliken atomic charges",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "mulliken atomic charges",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Mulliken Reduced Orbital Charges",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "mulliken reduced orbital charges",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "mulliken reduced orbital charges",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Loewdin Atomic Charges",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "loewdin atomic charges",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "loewdin atomic charges",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Timings",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "timings",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "timings",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "timings",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 4",
                    search_terms: "timings",
                    sections: 4,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 5",
                    search_terms: "timings",
                    sections: 5,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 6",
                    search_terms: "timings",
                    sections: 6,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 7",
                    search_terms: "timings",
                    sections: 7,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 8",
                    search_terms: "timings",
                    sections: 8,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Vibrational Frequencies",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "vibrational frequencies",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "vibrational frequencies",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "vibrational frequencies",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Normal Modes",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "normal modes",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "normal modes",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "normal modes",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "IR Spectrum",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "ir spectrum",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "ir spectrum",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "ir spectrum",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Thermochemistry at 298.15K",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "thermochemsitry at 298.15k",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "thermochemistry at 298.15k",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "thermochemistry at 298.15k",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Inner Energy",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "inner energy",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "inner energy",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "inner energy",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Enthalpy",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "enthalpy",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "enthalpy",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "enthalpy",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Entropy",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "entropy",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "entropy",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "entropy",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Gibbs Free Energy",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "gibbs free energy",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "gibbs free energy",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "gibbs free energy",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                }
            ]
          },
          {
            groupName: "Cartesian Gradient",
            brands: [
                {
                    name: "Section 1",
                    search_terms: "cartesian gradient",
                    sections: 1,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 2",
                    search_terms: "cartesian gradient",
                    sections: 2,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 3",
                    search_terms: "cartesian gradient",
                    sections: 3,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 4",
                    search_terms: "cartesian gradient",
                    sections: 4,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 5",
                    search_terms: "cartesian gradient",
                    sections: 5,
                    // specifyLines: "WHOLE",
                    // use_total_lines: false,
                    // lines: 0
                },
                {
                    name: "Section 6",
                    search_terms: "cartesian gradient",
                    sections: 6,
                    // specifyLines: "WHOLE",
                    //use_total_lines: false,
                    //lines: 0
                }
            ]
          },
      ];
  }

  checkEmpty(){
    var uploadFileName = (<HTMLInputElement>document.getElementById("uploadFileName")).value;
    var inputValueFile = (<HTMLInputElement>document.getElementById("customFile")).files?.length;
    var inputValueFileName = (<HTMLInputElement>document.getElementById("fileNameInput")).value;

    let invalidCount = 0;

    if (inputValueFileName === ""){
        let inputBox = <HTMLInputElement>document.getElementById("fileNameInput");
        inputBox.style.borderColor = 'red';
        invalidCount += 1;
    }

    if (uploadFileName === ""){
        let inputBox = <HTMLInputElement>document.getElementById("uploadFileName");
        inputBox.style.borderColor = 'red';
        invalidCount  += 1;
    }

    if (inputValueFile === 0) {
        let inputBox = document.getElementById("file-label")
        inputBox!.style.borderColor = 'red';
        invalidCount += 1;
    }

    if (invalidCount > 0){
        alert("One or more inputs are empty.");
        return 0;
    }

    else{
        return 1;
    }
}

  convert(){

    var empty = this.checkEmpty();
    if (empty === 1){

        var file_path = (<HTMLInputElement>document.getElementById("uploadFileName")).value;
        var CustomFileName = (<HTMLInputElement>document.getElementById("fileNameInput")).value;

        //var file_path: string[] = [];
        //file_path.push(path);
        var search_terms: string[] = [];
        var sections: Array<Array<number>> = [];
        var data = {file_path, search_terms, sections, CustomFileName}

        let CCAN: number[] = [];
        let CCAU: number[] = [];
        let ICAN: number[] = [];
        let ICAU: number[] = [];
        let BSI: number[] = [];
        let OREN: number[] = [];
        let MAC: number[] = [];
        let MROC: number[] = [];
        let LAC: number[] = [];
        let TIM: number[] = [];
        let VIFR: number[] = [];
        let NM: number[] = [];
        let IRS: number[] = [];
        let THRM: number[] = [];
        let INEN: number[] = [];
        let ENTH: number[] = [];
        let ENTRO: number[] = [];
        let GFE: number[] = [];
        let CAGR: number[] = [];

        var tempArray: Array<Array<number>> = [CCAN, CCAU, ICAN, ICAU, BSI, OREN, MAC, MROC, LAC, TIM, VIFR, NM, IRS, THRM, INEN, ENTH, ENTRO, GFE, CAGR];

        for (var json of this.selectedBrands) {

            if (search_terms.length > 0){
                if (search_terms.includes(json.search_terms.toUpperCase()) === false){
                    search_terms.push(json.search_terms.toUpperCase());
                }
            }

            else{
                search_terms.push(json.search_terms.toUpperCase());
            }
            
            // sections.push(json.sections);

            if (json.search_terms === "cartesian coordinates (angstroem)"){
                CCAN.push(json.sections);
            }

            if (json.search_terms === "cartesian coordinates (a.u.)"){
                CCAU.push(json.sections);
            }

            if (json.search_terms === "internal coordinates (angstroem)"){
                ICAN.push(json.sections);
            }

            if (json.search_terms === "internal coordinates (a.u.)"){
                ICAU.push(json.sections);
            }

            if (json.search_terms === "basis set information"){
                BSI.push(json.sections);

            }

            if (json.search_terms === "orbital energies"){
                OREN.push(json.sections);
            }

            if (json.search_terms === "mulliken atomic charges"){
                MAC.push(json.sections);
            }

            if (json.search_terms === "mulliken reduced orbital charges"){
                MROC.push(json.sections);
            }

            if (json.search_terms === "loewdin atomic charges"){
                LAC.push(json.sections);
            }

            if (json.search_terms === "timings"){
                TIM.push(json.sections);
            }

            if (json.search_terms === "vibrational frequencies"){
                VIFR.push(json.sections);
            }

            if (json.search_terms === "normal modes"){
                NM.push(json.sections);
            }

            if (json.search_terms === "ir spectrum"){
                IRS.push(json.sections);
            }

            if (json.search_terms === "thermochemistry at 298.15k"){
                THRM.push(json.sections);
            }

            if (json.search_terms === "inner energy"){
                INEN.push(json.sections);
            }

            if (json.search_terms === "enthalpy"){
                ENTH.push(json.sections);
            }

            if (json.search_terms === "entropy"){
                ENTRO.push(json.sections);
            }
            
            if (json.search_terms === "gibbs free energy"){
                GFE.push(json.sections);
            }

            if (json.search_terms === "cartesian gradient"){
                CAGR.push(json.sections);
            }

        }

        for (var sentSections of tempArray){
            if (sentSections.length > 0){
                sentSections.sort();
                sections.push(sentSections);
            }
        }

        console.log(file_path);
        console.log(search_terms);
        console.log(sections);
        console.log(CustomFileName);
        console.log(data);

        this.http.post('http://127.0.0.1:5000/find-sections', data, {responseType: 'text'})
            .subscribe((res) => { console.log(res); });
        return 1;
    }
    else{
        console.log('fields were found empty');
        return 0;
    }
    
  }
}




