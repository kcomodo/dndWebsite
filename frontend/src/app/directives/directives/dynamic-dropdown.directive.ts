import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appDynamicDropdown]'
})
export class DynamicDropdownDirective implements OnChanges {
  @Input('menusDropdown') options: string[] = []; // Array of options
  
  constructor(private el: ElementRef) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.options) {
      const size = this.options.length
      this.el.nativeElement.size = size
    }
  }

}
