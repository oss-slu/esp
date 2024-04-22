import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {MatChipInputEvent} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { saveAs } from 'file-saver';




@Component({
  selector: 'app-dashboard',
  templateUrl: '../dashboardView/dashboardView.component.html',
  styleUrls: ['../dashboardView/dashboardView.component.css']
})

export class DashboardComponent{

  fileType = 'ORCA';
  fileExtension = '.txt';
  public fileName: string;
  selectedFile: File | null = null;

  visible = true;
  selectable = true;
  removable = true;
  Tags: string[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.Tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.Tags.indexOf(tag);

    if (index >= 0) {
      this.Tags.splice(index, 1);
    }
  }
  

  searchTerms: string = '';
  specify_lines: string = '';
  sections: string = '';
  useTotalLines: boolean = false;
  totalLines: number = 0;


  constructor(private readonly http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    this.fileName = this.selectedFile ? this.selectedFile.name : '';
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
  

    // console.log("file name full:", event.target.value);
    // if(this.selectedFile){
    //   this.fileName = this.selectedFile.name;
    //  } // Store filename for display
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
        this.fileName = response.filename;
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }


  onSubmit() {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }
    
    const data: any ={
      file_path: this.fileName.toString(),
      search_terms: this.searchTerms.split(","),
      sections: this.sections.split(','),
      specify_lines: this.specify_lines.toString(),
    };

    if (this.useTotalLines) {
      data.use_total_lines = this.useTotalLines;
    }

    if (this.totalLines) {
      data.total_lines = this.totalLines;
    }
    
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.post('http://localhost:5000/find-sections', data, { headers, responseType: 'blob' })
    .subscribe(
      (response) => {
        const blob = response; // Already a Blob object
        this.downloadDocument(blob); // Call function to download
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  downloadDocument(blob: Blob) {
    saveAs(blob, 'output.docx'); // Specify filename
  }
}