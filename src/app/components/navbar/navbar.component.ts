import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Item } from '../../interfaces/items.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from '../settings/settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { TranslocoModule } from '@ngneat/transloco';
import { ChangeSettingService } from '../../services/change-settings/change-settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterModule, FontAwesomeModule, TranslocoModule],
  standalone: true,
})
export class NavbarComponent {
  hamburguer: boolean = false;
  routeActually = '';
  scrolled = false;
  isDark = true;

  items: Item[] = [
    { title: 'NAVBAR.BUTTONS.HOME', link: '' },
    { title: 'NAVBAR.BUTTONS.PROJECTS', link: 'projects' },
    { title: 'NAVBAR.BUTTONS.ABOUT', link: 'about' },
    { title: 'NAVBAR.BUTTONS.TECNOLOGIES', link: 'tecnologies' },
  ];

  iconGear = faGear;
  iconSun = faSun;
  iconMoon = faMoon;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private settingsService: ChangeSettingService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routeActually = this.router.url;
      }
    });

    this.settingsService.theme$.subscribe(theme => {
      this.isDark = theme === 'dark';
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY > 20;
      });
    }
  }

  ngOninit() {}

  handleMenu() {
    this.hamburguer = !this.hamburguer;
  }

  open() {
    this.modalService.open(SettingsComponent);
  }

  toggleTheme() {
    this.settingsService.toggleTheme();
  }
}
