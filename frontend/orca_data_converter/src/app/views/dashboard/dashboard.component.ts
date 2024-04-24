import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { saveAs } from 'file-saver';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface SearchTerms {
  searchTerm: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: '../dashboard/dashboard.component.html',
  styleUrls: ['../dashboardView/dashboardView.component.css']
})

export class DashboardComponent{

  fileType = 'ORCA';
  fileExtension = '.txt';
  public fileName: string | undefined;
  selectedFile: File | null = null;
  //searchTerms: { term: string, cycles?: string[], data?: string[], lines?: string[] }[] = [];
  specify_lines: string = '';
  sections: string = '';
  useTotalLines: boolean = false;
  totalLines: number = 0;
  searchTermDisabled: boolean = false;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);
  // visible = true;
  // selectable = true;
  // removable = true;
  //tags: string[] = [];
  searchTerms: SearchTerms[] = [];


  constructor(private readonly http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("file name full:", event.target.value);
    if(this.selectedFile){
      this.fileName = this.selectedFile.name;
     } // Store filename for display
    this.fileName = this.selectedFile?.name;
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    
    if (value) {
      this.searchTerms.push({searchTerm:value}); // Add to tags array for chip creation
    }
    
    // Clear the input value after adding the chip
     // Clear the input value
     event.chipInput!.clear();
  }

  remove(searchTerm: SearchTerms): void {
    const index = this.searchTerms.indexOf(searchTerm);
    if (index >= 0) {
      this.searchTerms.splice(index, 1);
      this.announcer.announce(`Removed ${searchTerm}`);
    }
  }

  trackBySearchTerm(index: number, searchTag: SearchTerms): string {
    return searchTag.searchTerm; // Use a unique identifier for tracking, here assuming 'name' is unique
  }

  edit(searchTag: SearchTerms, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(searchTag);
      return;
    }

    // Edit existing fruit
    const index = this.searchTerms.indexOf(searchTag);
    if (index >= 0) {
      this.searchTerms[index].searchTerm = value;
    }
  }

  // disableSearchTerm() {
  //   this.searchTermDisabled = true;
  // }

  onSubmit() {
    if (!this.selectedFile || !this.fileName) {
      alert('Please select a file.');
      return;
    }
    
    const data: any ={
      file_path: this.fileName.toString(),
      //search_terms: this.searchTerms.map(item => item.term),
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

  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
 
}