import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  @Input() ratioX = 0;
  @Input() ratioY = 1;

  initialTop = 0;
  initialLeft = 0;

  constructor(private ref: ElementRef) {
    this.initialTop = this.ref.nativeElement.getBoundingClientRect().top;
    this.initialLeft = this.ref.nativeElement.getBoundingClientRect().left;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.ref.nativeElement.style.top = (this.initialTop - (window.scrollY * this.ratioY)) + 'px';
    this.ref.nativeElement.style.left = (this.initialLeft + (window.scrollY * this.ratioX)) + 'px';
  }


}
