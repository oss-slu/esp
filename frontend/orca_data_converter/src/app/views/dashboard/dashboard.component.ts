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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
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

    const data = {
      file_path: this.fileName.toString(),
      search_terms: this.searchTerms,
      sections: this.sections,
      specifyLines: this.specifyLines.toString(),
      use_total_lines: this.useTotalLines,
      total_lines: this.totalLines.toString(),
    };
  
    // const formData = new FormData();
    // formData.append('file_path', JSON.stringify(this.fileName));
    // console.log("filename", this.fileName);
    // formData.append('search_terms', this.searchTerms);
    // console.log(this.searchTerms);
    // formData.append('sections', JSON.stringify(this.sections)); // Convert array to string
    // console.log(this.sections);
    // formData.append('specifyLines', JSON.stringify(this.specifyLines));
    // console.log(this.specifyLines);
    // formData.append('use_total_lines', JSON.stringify(this.useTotalLines)); // Convert boolean to string
    // console.log(this.useTotalLines);
    // formData.append('total_lines', JSON.stringify(this.totalLines)); // Convert number to string
    // console.log(this.totalLines);
    // console.log("formData", formData)

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.post<any>('http://localhost:5000/find-sections', data, { headers })
      .subscribe(
        (response) => {
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
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