import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Item } from '../../interfaces/items.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class NavbarComponent {
  hamburguer: boolean = false;
  routeActually = '';
  items: Item[] = [
    {
      title: 'Home',
      link: '',
    },
    {
      title: 'Proyectos',
      link: 'projects',
    },
    {
      title: 'Sobre mi',
      link: 'about',
    },
    {
      title: 'Tecnologias',
      link: 'tecnologies',
    },
    {
      title: 'Configuraciones',
      link: '',
    },
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeActually = this.router.url;
      }
    });
  }

  ngOninit() {}

  handleMenu() {
    this.hamburguer = !this.hamburguer;
  }

  private modalService = inject(NgbModal);

  open() {
    const modalRef = this.modalService.open(SettingsComponent);
    modalRef.componentInstance.name = 'World';
  }
}
