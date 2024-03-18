import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

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

export class DashboardComponent implements OnInit {
  myForm: FormGroup;
  brandGroups: BrandsGroup[] = [];
  selectedBrands: Brand[] = [];
  fileName: string;
  message: string;

  constructor(private readonly http: HttpClient, private fb: FormBuilder) {
    // Initialize the form group with the necessary controls
    this.myForm = this.fb.group({
      customFile: [''],
      selectedBrands: [[]],
      message: [''],
      otherControl: [''], // Add other controls here
      // ...
    });
  }

  ngOnInit() {
    this.brandGroups = [
        {
            groupName: "Cartesian Coordinates (Angstroem)",
            brands: [
                {
                  name: "Section 1",
                  search_terms: "cartesian coordinates (angstroem)",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 2",
                  search_terms: "cartesian coordinates (angstroem)",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 3",
                  search_terms: "cartesian coordinates (angstroem)",
                  sections: 3,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 4",
                  search_terms: "cartesian coordinates (angstroem)",
                  sections: 4,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 5",
                  search_terms: "cartesian coordinates (angstroem)",
                  sections: 5,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 6",
                  search_terms: "cartesian coordinates (angstroem)",
                  sections: 6,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 7",
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
                  name: "Section 1",
                  search_terms: "cartesian coordinates (a.u.)",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 2",
                  search_terms: "cartesian coordinates (a.u.)",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 3",
                  search_terms: "cartesian coordinates (a.u.)",
                  sections: 3,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 4",
                  search_terms: "cartesian coordinates (a.u.)",
                  sections: 4,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 5",
                  search_terms: "cartesian coordinates (a.u.)",
                  sections: 5,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 6",
                  search_terms: "cartesian coordinates (a.u.)",
                  sections: 6,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 7",
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
                  name: "Section 1",
                  search_terms: "internal coordinates (angstroem)",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 2",
                  search_terms: "internal coordinates (angstroem)",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 3",
                  search_terms: "internal coordinates (angstroem)",
                  sections: 3,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 4",
                  search_terms: "internal coordinates (angstroem)",
                  sections: 4,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 5",
                  search_terms: "internal coordinates (angstroem)",
                  sections: 5,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 6",
                  search_terms: "internal coordinates (angstroem)",
                  sections: 6,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
                },
                {
                  name: "Section 7",
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
                  name: "Section 1",
                  search_terms: "internal coordinates (a.u.)",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "internal coordinates (a.u.)",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
                  search_terms: "internal coordinates (a.u.)",
                  sections: 3,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 4",
                  search_terms: "internal coordinates (a.u.)",
                  sections: 4,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 5",
                  search_terms: "internal coordinates (a.u.)",
                  sections: 5,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 6",
                  search_terms: "internal coordinates (a.u.)",
                  sections: 6,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 7",
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
                  name: "Section 1",
                  search_terms: "basis set information",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "basis set information",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
                  search_terms: "basis set information",
                  sections: 3,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 4",
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
                  name: "Section 1",
                  search_terms: "orbital energies",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
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
                  name: "Section 1",
                  search_terms: "mulliken atomic charges",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
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
                  name: "Section 1",
                  search_terms: "mulliken reduced orbital charges",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
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
                  name: "Section 1",
                  search_terms: "loewdin atomic charges",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
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
                  name: "Section 1",
                  search_terms: "timings",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "timings",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
                  search_terms: "timings",
                  sections: 3,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 4",
                  search_terms: "timings",
                  sections: 4,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 5",
                  search_terms: "timings",
                  sections: 5,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 6",
                  search_terms: "timings",
                  sections: 6,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 7",
                  search_terms: "timings",
                  sections: 7,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 8",
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
                  name: "Section 1",
                  search_terms: "vibrational frequencies",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "vibrational frequencies",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
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
                  name: "Section 1",
                  search_terms: "normal modes",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "normal modes",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
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
                  name: "Section 1",
                  search_terms: "ir spectrum",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "ir spectrum",
                  sections: 3,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
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
                  name: "Section 1",
                  search_terms: "thermochemsitry at 298.15k",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "thermochemistry at 298.15k",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
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
                  name: "Section 1",
                  search_terms: "inner energy",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "inner energy",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
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
                  name: "Section 1",
                  search_terms: "enthalpy",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "enthalpy",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
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
                  name: "Section 1",
                  search_terms: "entropy",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "entropy",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
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
                  name: "Section 1",
                  search_terms: "gibbs free energy",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "gibbs free energy",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
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
                  name: "Section 1",
                  search_terms: "cartesian gradient",
                  sections: 1,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 2",
                  search_terms: "cartesian gradient",
                  sections: 2,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 3",
                  search_terms: "cartesian gradient",
                  sections: 3,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 4",
                  search_terms: "cartesian gradient",
                  sections: 4,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 5",
                  search_terms: "cartesian gradient",
                  sections: 5,
                  specifyLines: "WHOLE",
                  use_total_lines: false,
                  lines: 0
              },
              {
                  name: "Section 6",
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

  async checkEmpty(): Promise<number> {
    const inputValueFile = (document.getElementById("customFile") as HTMLInputElement)?.files?.length;
    const inputValueFileName = this.fileName;
    if (inputValueFileName === "" || inputValueFile === 0) {
      alert("One or more inputs are empty.");
      return 0;
    } else {
      return 1;
    }
  }

  async onSubmitFile(event: any){
    const file = event.target.files[0];
  
    if (!file){
      console.error('No file selected.');
      return; 
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await firstValueFrom(this.http.post<any>('http://localhost:5000/api/upload', formData));
  
      console.log('Response from Flask:', response);
  
      if (response && response.message === 'File received successfully') {
        this.fileName = file.name;
        console.log('File received successfully:', this.fileName);
      } else {
        console.error('Error uploading file:', response);
      }
    } catch (error){
      console.error('Error uploading file:', error);
    }
  }
  

  async submitForm() {
    // Check for empty inputs or handle validation here
    const isEmpty = await this.checkEmpty();
    if(!isEmpty){
      console.error('One or more inputs are empty.');
      return; 
    }

    const formData = this.myForm.value;
    formData.fileName = this.fileName; 
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    try {
      const response = await firstValueFrom(this.http.post<any>('http://localhost:5000/api/submit', formData,{headers}));

      console.log('Response from Flask:', response);

      this.fileName = ''; 
    } catch (error) {
      console.error('Error submitting form data:', error); 
    }
  }

  async runBackend() {
    const isEmpty = await this.checkEmpty();

    if (!isEmpty) {
      console.error('One or more inputs are empty.');
    }

    const formData = new FormData(); 
    const fileInput = document.getElementById("customFile") as HTMLInputElement | null;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('file', fileInput.files[0]);
    } else {
      console.error('File input element not found or no files selected.');
      return;
    }

    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!uploadResponse.ok){
      console.error('Error uploading file:', uploadResponse.statusText);
      return;
    }

    const uploadData = await uploadResponse.json(); 

    if(uploadData.status !== 'success') {
      console.error('Error uploading file:', uploadData.message);
      return; 
    }

    const formDataForSubmit = this.myForm.value; 
    formDataForSubmit.fileName = this.fileName; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    
    this.http.post('http://localhost:5000/api/submit', formDataForSubmit, {headers})
      .subscribe(
        (response) => {
          console.log('Submission successful:', response);
        },
        (error) => {
          console.error('Error submitting data:', error);
        }
      );
    // Update the URL to your backend API endpoint
    this.http.post('http://localhost:5000/api/data', null).subscribe(response => {
      console.log('Backend response:', response);
    });

    console.log(this.fileName);
    console.log(this.selectedBrands);
  }
  
  sendMessage() {
    // Check if this.message is defined and not an empty string
    if (this.message !== undefined && this.message.trim() !== '') {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        this.http.post('http://localhost:5000/api/message', { message: this.message }, { headers })
            .subscribe(
                (response) => {
                    console.log('Message sent successfully:', response);
                },
                (error) => {
                    console.error('Error sending message:', error);
                }
            );
    } else {
        console.warn('Message is undefined or empty. Skipping send.');
    }
  }

  async uploadFile(){
    const formData = new FormData(); 
    formData.append('file', this.fileName);

    //send POST request
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if(!response.ok){
      console.error('Error message');
      return
    }

    const data = await response.json();
    this.displaySuccessMessage(data.message);
  }

  displaySuccessMessage(message: string){
    console.log('Success');
  }

}
