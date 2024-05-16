import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { Router, NavigationEnd, RouterModule } from '@angular/router'
import { Item } from '../../interfaces/items.interface'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { SettingsComponent } from '../settings/settings.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  standalone: true,
})
export class NavbarComponent {
  hamburguer: boolean = false
  routeActually = ''
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
  ]
  icon = faGear

  constructor(
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routeActually = this.router.url
      }
    })
  }

  ngOninit() {}

  handleMenu() {
    this.hamburguer = !this.hamburguer
  }

  open() {
    this.modalService.open(SettingsComponent)
  }
}
