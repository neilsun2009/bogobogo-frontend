import { Component, OnInit, Input, ElementRef, Renderer2, Renderer, Sanitizer  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-para',
  templateUrl: './para.component.html',
  styleUrls: ['./para.component.less']
})
export class ParaComponent implements OnInit {

  @Input() para: {
    title: string;
    cover?: string;
    html: string;
  };
  @Input() primaryColor: string;
  @Input() secondaryColor: string;
  private titleTop: number;
  private contentTop: number;
  pendingTitle: boolean;
  pendingContent: boolean;
  sanitizedHTML: SafeHtml;
  resizeNumber: number;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) {
    this.pendingTitle = true;
    this.pendingContent = true;
    this.resizeNumber = 0;
  }

  ngOnInit() {
    this.sanitizedHTML = this.sanitizer.bypassSecurityTrustHtml(this.para.html);
    // timeout, to make sure result being accurate
    setTimeout(() => {
      this.calTops();
      this.scrollHandler();
      this.setImageClick();
      this.setProgressAnim();
    }, 500);
    window.addEventListener('resize', () => {
      const nowResizeNumber = ++this.resizeNumber;
      setTimeout(() => {
        if (nowResizeNumber !== this.resizeNumber) {
          return;
        }
        this.calTops();
        this.scrollHandler();
      }, 500);
    });
    window.addEventListener('scroll', () => {
      this.scrollHandler();
    });
  }

  // calculate title top & content top
  calTops() {
    const el = this.elementRef.nativeElement;
    this.titleTop = this.getElementTop(el);
    this.contentTop = this.getElementTop(el.getElementsByClassName('para')[0]);
    // console.log(this.titleTop, this.contentTop);
  }

  // get absolute element top, recursively
  getElementTop(el): number {
    let top = el.offsetTop,
      parent = el.offsetParent;
    while (parent !== null) {
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return top;
  }

  scrollHandler() {
    const screenTop = document.body.scrollTop || document.documentElement.scrollTop,
    // height = document.documentElement.offsetHeight,
      clientHeight = document.documentElement.clientHeight;
    if (this.pendingTitle && screenTop + clientHeight > this.titleTop + 50) {
      this.pendingTitle = false;
    }
    if (this.pendingContent && screenTop + clientHeight > this.contentTop + 50) {
      this.pendingTitle = false;
      this.pendingContent = false;
      // this.scrollHandler = () => {};
    }
  }

  setImageClick() {
    const images = this.elementRef.nativeElement.querySelectorAll('img');
    // console.log(images.length);
    for (let i = 0, len = images.length; i < len; ++i) {
      images[i].addEventListener('click', () => {
        window.open(images[i].src);
      });
    }
  }

  setProgressAnim() {
    const bars = this.elementRef.nativeElement.getElementsByClassName('bar');
    for (let i = 0, len = bars.length; i < len; ++i) {
      window.addEventListener('scroll', () => {
        const top = this.getElementTop(bars[i]),
          screenTop = document.body.scrollTop || document.documentElement.scrollTop,
          clientHeight = document.documentElement.clientHeight;
        if (screenTop + clientHeight > top + 50) {
          bars[i].className = 'bar';
        }
      });
    }
  }

}
