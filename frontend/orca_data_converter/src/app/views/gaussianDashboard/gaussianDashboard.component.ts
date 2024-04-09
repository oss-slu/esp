import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { saveAs } from 'file-saver';

interface Brand {
  name: string;
  search_terms: string;
  sections: number[];
  specifyLines: string;
  use_total_lines: boolean;
  total_lines: number;
}

interface BrandsGroup {
  groupName: string;
  brands: Brand[];
}

@Component({
  selector: 'app-gaussianDashboard',
  templateUrl: '../dashboardView/dashboardView.component.html',
  styleUrls: ['../dashboardView/dashboardView.component.css']
})

export class GaussianDashboardComponent {

  fileType = 'Gaussian';
  fileExtension = '.log';
  brandGroups: BrandsGroup[] = [];
  selectedBrands: Brand[] = [];
  public fileName: string;
  selectedFile: File | null = null;
  searchTerms: string = '';
  specifyLines: string = '';
  sections: number[] = [];
  useTotalLines: boolean = false;
  totalLines: number = 0;
  
  constructor(private readonly http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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

  const data = {
    file_path: this.fileName.toString(),
    search_terms: [this.searchTerms],
    sections: this.sections,
    specifyLines: this.specifyLines.toString(),
    use_total_lines: this.useTotalLines,
    total_lines: this.totalLines.toString(),
  };

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