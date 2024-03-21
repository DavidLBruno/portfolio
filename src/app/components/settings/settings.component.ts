import { Component, Input, TemplateRef, inject } from '@angular/core';
import {
  NgbActiveModal,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
  imports: [NgbDatepickerModule],
})
export class SettingsComponent {
  activeModal = inject(NgbActiveModal);

  @Input() name: string = '';
}
