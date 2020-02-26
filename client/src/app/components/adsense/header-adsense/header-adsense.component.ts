import { Component, OnInit, AfterViewChecked, HostListener } from '@angular/core';
import { pcAdsense1, pcAdsense2, pcAdsense3, pcAdsense4, spAdsense } from '../../../shared/variables/adsenses';

@Component({
  selector: 'app-header-adsense',
  templateUrl: './header-adsense.component.html',
  styleUrls: ['./header-adsense.component.scss'],
})
export class HeaderAdsenseComponent implements OnInit, AfterViewChecked {
  spView: boolean;
  canDisplay: boolean;

  constructor() { }

  ngOnInit() {
    this.canDisplay = false;
    this.handleResizeWindow(window.innerWidth);
  }

  ngAfterViewChecked() {
    if (!this.spView) {
      const pcFlag1 = document.getElementById('header-pc-flag-1');
      if (!pcFlag1) {
        const div = document.getElementById('header-pc-adsence-1');
        div.insertAdjacentHTML('afterbegin', '<input type="hidden" id="header-pc-flag-1">');
        div.insertAdjacentHTML('afterbegin', pcAdsense1);
      }

      const pcFlag2 = document.getElementById('header-pc-flag-2');
      if (!pcFlag2) {
        const div = document.getElementById('header-pc-adsence-2');
        div.insertAdjacentHTML('afterbegin', '<input type="hidden" id="header-pc-flag-2">');
        div.insertAdjacentHTML('afterbegin', pcAdsense2);
      }

      const pcFlag3 = document.getElementById('header-pc-flag-3');
      if (!pcFlag3) {
        const div = document.getElementById('header-pc-adsence-3');
        div.insertAdjacentHTML('afterbegin', '<input type="hidden" id="header-pc-flag-3">');
        div.insertAdjacentHTML('afterbegin', pcAdsense3);
      }

      const pcFlag4 = document.getElementById('header-pc-flag-4');
      if (!pcFlag4) {
        const div = document.getElementById('header-pc-adsence-4');
        div.insertAdjacentHTML('afterbegin', '<input type="hidden" id="header-pc-flag-4">');
        div.insertAdjacentHTML('afterbegin', pcAdsense4);
      }
    } else {
      const spFlag = document.getElementById('header-sp-flag');
      if (!spFlag) {
        const div = document.getElementById('header-sp-adsence');
        div.insertAdjacentHTML('afterbegin', '<input type="hidden" id="header-sp-flag">');
        div.insertAdjacentHTML('afterbegin', spAdsense);
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.handleResizeWindow(window.innerWidth);
  }

  private handleResizeWindow(width: Number) {
    if (768 >= width) {
      this.spView = true;
    } else {
      this.spView = false;
    }
    this.canDisplay = true;
  }

}
