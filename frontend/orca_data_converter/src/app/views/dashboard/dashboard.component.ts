import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SelectItem} from 'primeng/api';

interface Brand {
  name: string;
  search_terms: string;
  sections: number;
  specifyLines: string;
  use_total_lines: boolean;
  lines: number;
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
  public fileName: string;

  constructor(private readonly http: HttpClient) { }

    ngOnInit() {
      this.brandGroups = [
          {
              groupName: "Cartesian Coordinates (Angstroem)",
              brands: [
                  {
                    name: "Row 1",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 2",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 3",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 4",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 4,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 5",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 5,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 6",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 6,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 7",
                    search_terms: "cartesian coordinates (angstroem)",
                    sections: 7,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
              ]
          },
          {
              groupName: "Cartesian Coordinates (A.U.)",
              brands: [
                  {
                    name: "Row 1",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 2",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 3",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 4",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 4,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 5",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 5,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 6",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 6,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 7",
                    search_terms: "cartesian coordinates (a.u.)",
                    sections: 7,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  }
                  
              ]
          },
          {
              groupName: "Internal Coordinates (Angstroem)",
              brands: [
                  {
                    name: "Row 1",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 2",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 3",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 4",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 4,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 5",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 5,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 6",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 6,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  },
                  {
                    name: "Row 7",
                    search_terms: "internal coordinates (angstroem)",
                    sections: 7,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                  }
              ]
          },
          {
            groupName: "Internal Coordinates (A.U.)",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 4",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 4,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 5",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 5,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 6",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 6,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 7",
                    search_terms: "internal coordinates (a.u.)",
                    sections: 7,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Basis Set Information",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "basis set information",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "basis set information",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "basis set information",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 4",
                    search_terms: "basis set information",
                    sections: 4,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Orbital Energies",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "orbital energies",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "orbital energies",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Mulliken Atomic Charges",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "mulliken atomic charges",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "mulliken atomic charges",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Mulliken Reduced Orbital Charges",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "mulliken reduced orbital charges",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "mulliken reduced orbital charges",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Loewdin Atomic Charges",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "loewdin atomic charges",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "loewdin atomic charges",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Timings",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "timings",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "timings",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "timings",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 4",
                    search_terms: "timings",
                    sections: 4,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 5",
                    search_terms: "timings",
                    sections: 5,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 6",
                    search_terms: "timings",
                    sections: 6,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 7",
                    search_terms: "timings",
                    sections: 7,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 8",
                    search_terms: "timings",
                    sections: 8,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Vibrational Frequencies",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "vibrational frequencies",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "vibrational frequencies",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "vibrational frequencies",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Normal Modes",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "normal modes",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "normal modes",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "normal modes",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "IR Spectrum",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "ir spectrum",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "ir spectrum",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "ir spectrum",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Thermochemistry at 298.15K",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "thermochemsitry at 298.15k",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "thermochemistry at 298.15k",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "thermochemistry at 298.15k",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Inner Energy",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "inner energy",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "inner energy",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "inner energy",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Enthalpy",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "enthalpy",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "enthalpy",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "enthalpy",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Entropy",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "entropy",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "entropy",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "entropy",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Gibbs Free Energy",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "gibbs free energy",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "gibbs free energy",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "gibbs free energy",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
          {
            groupName: "Cartesian Gradient",
            brands: [
                {
                    name: "Row 1",
                    search_terms: "cartesian gradient",
                    sections: 1,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 2",
                    search_terms: "cartesian gradient",
                    sections: 2,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 3",
                    search_terms: "cartesian gradient",
                    sections: 3,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 4",
                    search_terms: "cartesian gradient",
                    sections: 4,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 5",
                    search_terms: "cartesian gradient",
                    sections: 5,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                },
                {
                    name: "Row 6",
                    search_terms: "cartesian gradient",
                    sections: 6,
                    specifyLines: "WHOLE",
                    use_total_lines: false,
                    lines: 0
                }
            ]
          },
      ];
  }

  checkEmpty(){
    var inputValueFile = (<HTMLInputElement>document.getElementById("customFile")).files?.length;
    var inputValueFileName = (<HTMLInputElement>document.getElementById("fileNameInput")).value;
    if (inputValueFileName === ""){
        alert("One or more inputs are empty.")
        return 0;
    }

    if (inputValueFile === 0) {
        alert("One or more inputs are empty.");
        return 0;
    }

    else{
        return 1;
    }
}

  runBackend(){
    if (this.checkEmpty() == 0) {
        return;
    }

    

    const inputFileElement = document.getElementById("customFile") as HTMLInputElement;
        if (!inputFileElement || !inputFileElement.files || inputFileElement.files.length == 0) {
            console.error('File input not found or no files selected.');
            alert('Please select a file to upload.');
            return;
        }
    
    const inputFile = inputFileElement.files[0]; 
        
    const formData = new FormData();
    formData.append('file', inputFile);
    formData.append('data', JSON.stringify({
        search_terms: "CARTESIAN COORDINATES",
        sections: "3",
        specifyLines: "WHOLE",
        use_Total_Lines: "FALSE",
        total_lines: "200",
    }));

    // this.selectedBrands.map(brand => brand.lines) --- hard coded brand above, work on fixing this next sprint.
    

    this.http.post('http://127.0.0.1:5000/find-sections', formData).subscribe({
        next: (response) => {
            console.log('Response from backend:', response);
            alert('Data sent to backend successfully.');
        },
        error: (error) => {
            console.error('Error from backend:', error);
            alert('Failed to send data to backend.');
        }
    });

    console.log(this.fileName);
    console.log(this.selectedBrands);
    return this.selectedBrands, this.fileName;
  }
}

