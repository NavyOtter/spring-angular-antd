import { Component, OnInit } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss']
})
export class FullscreenComponent implements OnInit {

  status = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
    this.status = !screenfull.isFullscreen;
  }
}
