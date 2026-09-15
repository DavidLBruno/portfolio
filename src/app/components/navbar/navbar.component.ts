import { Component, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { TranslocoModule } from '@jsverse/transloco';
import { map } from 'rxjs';
import { Item } from '../../interfaces/items.interface';
import { SettingsComponent } from '../settings/settings.component';
import { ChangeSettingService } from '../../services/change-settings/change-settings.service';
import { PreferenceMotionService } from '../../services/preference-motion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterModule, FontAwesomeModule, TranslocoModule],
})
export class NavbarComponent {
  private modalService = inject(NgbModal);
  private settingsService = inject(ChangeSettingService);
  private motion = inject(PreferenceMotionService);

  hamburguer = signal(false);
  scrolled = signal(false);
  isDark = toSignal(this.settingsService.theme$.pipe(map(t => t === 'dark')), {
    initialValue: true,
  });

  items: Item[] = [
    { title: 'NAVBAR.BUTTONS.HOME', link: '' },
    { title: 'NAVBAR.BUTTONS.PROJECTS', link: 'projects' },
    { title: 'NAVBAR.BUTTONS.ABOUT', link: 'about' },
    { title: 'NAVBAR.BUTTONS.TECNOLOGIES', link: 'tecnologies' },
  ];

  iconGear = faGear;
  iconSun = faSun;
  iconMoon = faMoon;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
  }

  handleMenu() {
    this.hamburguer.update(open => !open);
  }

  closeMenu() {
    this.hamburguer.set(false);
  }

  open() {
    this.modalService.open(SettingsComponent, {
      centered: true,
      scrollable: true,
      windowClass: 'settings-modal',
      ariaLabelledBy: 'settings-title',
      ariaDescribedBy: 'settings-description',
    });
  }

  toggleTheme(event?: Event) {
    this.motion.run('theme', () => this.settingsService.toggleTheme(), event);
  }
}
