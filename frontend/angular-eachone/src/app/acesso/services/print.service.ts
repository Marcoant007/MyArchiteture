import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class PrintService {
    isPrinting = false;
  
    constructor(private router: Router) { }
  
    printDocument(documentName: string, documentData) {
      this.isPrinting = true;
      this.router.navigate(['/',
        { outlets: {
          'print': ['print', documentName]
        }}], 
        { state: 
          { 
            documentData: documentData
          }
        });
        
    }
  
    onDataReady() {
      setTimeout(() => {
        window.print();
        this.isPrinting = false;
        this.router.navigate([{ outlets: { print: null }}]);
      });
    }
  }