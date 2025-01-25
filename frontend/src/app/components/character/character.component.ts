import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-character',
  imports: [CommonModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent implements OnInit {
  

  raceInfo: any;
  
  // Object to manage the visibility of each menu
  menuVisibility: { [key: string]: boolean} = {
    getClasses: false,
    getRaces: false,
    getBackground: false,
  };
  
  constructor (private http: HttpClient){}
  
  ngOnInit(): void { // on page load fetch data from 5e api 
    // this.http.get('https://www.dnd5eapi.co/api/races').subscribe(data => {this.raceInfo = data;})
    // console.log(this.raceInfo.results[0].index); 
  }
 
  toggleSelectionScreen(menuName: keyof typeof this.menuVisibility){
    this.menuVisibility[menuName] = !this.menuVisibility[menuName];
  }
  
  
  
  //onFileSelected will preview the image
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const previewElement = document.getElementById('preview');
        if (previewElement && e.target?.result) {
          previewElement.innerHTML = `<img src="${e.target.result}">`;

        }
      };
      reader.readAsDataURL(file);
    }
  }
}
