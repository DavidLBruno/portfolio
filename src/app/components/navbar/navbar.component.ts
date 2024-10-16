import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('itemContainer') itemContainer: ElementRef | undefined;
  @ViewChild('nav') nav: ElementRef | undefined;
  hamburguer: boolean = false;
  routeActually = '';
  heigthElements: number = 4;
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const itemContainer = this.itemContainer;
    if (itemContainer) {
      for (let i = 0; i < itemContainer.nativeElement.children.length; i++) {
        itemContainer.nativeElement.children[i].style.height =
          this.heigthElements + 'rem';
      }
    }
  }

  handleMenu() {
    this.hamburguer = !this.hamburguer;

    const itemContainer = this.itemContainer;
    const nav = this.nav;

    if (itemContainer && nav) {
      if (this.hamburguer) {
        nav.nativeElement.style.height =
          this.heigthElements * itemContainer.nativeElement.children.length +
          5 +
          'rem';
      } else {
        nav.nativeElement.style.height = '0';
      }
    }
  }

  open() {
    this.modalService.open(SettingsComponent);
  }
}
