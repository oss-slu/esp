import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SelectItem} from 'primeng/api';
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
  searchTerms: string = '';
  specify_lines: string = '';
  sections: string = '';
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