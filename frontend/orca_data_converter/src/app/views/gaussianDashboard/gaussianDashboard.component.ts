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
  selector: 'app-gaussianDashboard',
  templateUrl: './gaussianDashboard.component.html',
  styleUrls: ['./gaussianDashboard.component.css']
})

export class GaussianDashboardComponent implements OnInit{

  brandGroups: BrandsGroup[] = [];
  selectedBrands: Brand[] = [];
  public fileName: string;
  selectedFile: File | null = null;

  constructor(private readonly http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
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
    this.checkEmpty();
    this.http.post('https://github.com/oss-slu/orca_converter/blob/main/Backend/Backend/API.py', null).subscribe();
    console.log(this.fileName);
    console.log(this.selectedBrands);
    return this.selectedBrands, this.fileName;
  }

  onUpload() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://localhost:5000/upload', formData).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}