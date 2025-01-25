import { Component, OnInit } from '@angular/core';
import { CarouselComponent, CarouselInnerComponent, CarouselItemComponent, ThemeDirective, CarouselControlComponent} from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-landingpage',
  imports: [ThemeDirective, CarouselComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselControlComponent, RouterLink],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'

})
export class LandingPageComponent implements OnInit {
  constructor() {
  }
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  ngOnInit(): void {
    this.slides[0] = {
      src: 'site-logo.png'

    };
    this.slides[1] = {
      src: 'favicon.png'
    };
    this.slides[2] = {
     // src: './assets/img/vue.jpg'
    };
  }
}
