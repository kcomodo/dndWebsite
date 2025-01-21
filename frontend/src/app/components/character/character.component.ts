import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-character',
  imports: [CommonModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  
  activeTab: string = 'Race Info' // Default active tab
  
  OpenCharInfoTab(tabPage: string): void { 
    this.activeTab = tabPage; 
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
