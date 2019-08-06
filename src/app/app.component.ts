import { AfterViewChecked, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatIconRegistry, MatRipple } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('ripple', { read: MatRipple, static: true }) ripple: MatRipple;
  title = 'app';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'angular',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/angular_solidBlack.svg')
    );

    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    this.ripple.launch(0, 0);
  }

  ngAfterViewInit(): void {

  }

  triggerRipple() {
    const point1 = this.ripple.launch(0, 0, { color: 'pink', centered: true, persistent: true, radius: 50 });
    const point2 = this.ripple.launch(0, 0, { color: 'yellow', centered: true, persistent: true, radius: 20 });

    setTimeout(() => {
      point1.fadeOut();
    }, 500);
  }

  clearRipple() {
    this.ripple.fadeOutAll();
  }
}
