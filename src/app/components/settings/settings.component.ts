import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoPipe } from '@jsverse/transloco';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Select } from '../../interfaces/select.interface';
import { Button } from '../../interfaces/button.interface';
import { ChangeSettingService } from '../../services/change-settings/change-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  imports: [
    ReactiveFormsModule,
    NgbDropdownModule,
    TranslocoPipe,
    FontAwesomeModule,
  ],
})
export class SettingsComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  private settingsService = inject(ChangeSettingService);
  private destroyRef = inject(DestroyRef);

  settings = new FormGroup({
    languaje: new FormControl(''),
    theme: new FormControl(''),
  });
  faChevronDown = faChevronDown;

  configsParams: Button[] = [
    {
      title: 'SETTINGS.BUTTONS.LANGUAJE.TITLE',
      form: 'languaje',
      option: [
        { title: 'SETTINGS.BUTTONS.LANGUAJE.OPTIONS.SPANISH', value: 'es' },
        { title: 'SETTINGS.BUTTONS.LANGUAJE.OPTIONS.ENGLISH', value: 'en' },
      ],
    },
    {
      title: 'SETTINGS.BUTTONS.THEME.TITLE',
      form: 'theme',
      option: [
        { title: 'SETTINGS.BUTTONS.THEME.OPTIONS.DARK', value: 'dark' },
        { title: 'SETTINGS.BUTTONS.THEME.OPTIONS.LIGHT', value: 'light' },
      ],
    },
  ];

  ngOnInit(): void {
    this.settings.patchValue(
      {
        languaje: this.settingsService.getLanguaje(),
        theme: this.settingsService.getTheme(),
      },
      { emitEvent: false },
    );

    this.settings.controls.languaje.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => this.settingsService.change(value || 'es'));

    this.settings.controls.theme.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => this.settingsService.setTheme(value || 'dark'));
  }

  changeForm(select: Select, form: string): void {
    this.settings.patchValue({ [form]: select.value });
  }

  currentValue(form: string): string {
    return this.settings.get(form)?.value ?? '';
  }

  getOptions(select: Select[], formValue: string): string {
    return select.find(element => element.value === formValue)?.title ?? '';
  }
}
