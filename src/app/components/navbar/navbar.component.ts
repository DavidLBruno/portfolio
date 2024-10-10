import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Item } from '../../interfaces/items.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from '../settings/settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { TranslocoModule } from '@ngneat/transloco';

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
  items: Item[] = [
    {
      title: 'NAVBAR.BUTTONS.HOME',
      link: '',
    },
    {
      title: 'NAVBAR.BUTTONS.PROJECTS',
      link: 'projects',
    },
    {
      title: 'NAVBAR.BUTTONS.ABOUT',
      link: 'about',
    },
    {
      title: 'NAVBAR.BUTTONS.TECNOLOGIES',
      link: 'tecnologies',
    },
  ];
  icon = faGear;

  constructor(
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routeActually = this.router.url;
      }
    });
  }

  ngOninit() {}

  handleMenu() {
    this.hamburguer = !this.hamburguer;
  }

  open() {
    this.modalService.open(SettingsComponent);
  }
}
