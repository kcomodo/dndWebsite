import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-character',
  imports: [CommonModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent implements OnInit {
  raceNames: string[] = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Half-Orc', 'Halfling', 'Human', 'Tiefling'];
  
  // on page load fetch data from 5e api this test will be done with dragon born 
  constructor (private http: HttpClient){};
  raceInfo: any;
  
  ngOnInit(): void {
    this.http.get('https://www.dnd5eapi.co/api/races').subscribe(data => {this.raceInfo = data;})
    console.log(this.raceInfo.results[0].index); 
  }
  
  get raceMenuDropDown(): number {
    return this.raceNames.length
  }
  
  
  // Tab Changing Effect Function
  activeTab: string = 'Race Info' // Default active tab
  OpenCharInfoTab(tabPage: string): void { this.activeTab = tabPage; }
  
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
