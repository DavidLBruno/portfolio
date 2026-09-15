import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChangeSettingService } from './services/change-settings/change-settings.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TranslocoModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly router = inject(Router);
  title = 'Bruno David – Full Stack Developer';

  constructor() {
    const settings = inject(ChangeSettingService);
    settings.setLanguage();
    settings.initTheme();
  }
}
