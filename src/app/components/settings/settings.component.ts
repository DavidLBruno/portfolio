import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Select } from '../../interfaces/select.interface';
import { TranslocoPipe } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { ChangeSettingService } from '../../services/change-settings/change-settings.service';
import { Button } from '../../interfaces/button.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDropdownModule, TranslocoPipe],
})
export class SettingsComponent implements OnInit {
  settings: FormGroup = new FormGroup({
    languaje: new FormControl(''),
    theme: new FormControl(''),
  });

  subscription!: Subscription;

  configsParams: Button[] = [
    {
      title: 'SETTINGS.BUTTONS.LANGUAJE.TITLE',
      form: 'languaje',
      option: [
        {
          title: 'SETTINGS.BUTTONS.LANGUAJE.OPTIONS.SPANISH',
          value: 'es',
        },
        {
          title: 'SETTINGS.BUTTONS.LANGUAJE.OPTIONS.ENGLISH',
          value: 'en',
        },
      ],
    },
    {
      title: 'SETTINGS.BUTTONS.THEME.TITLE',
      form: 'theme',
      option: [
        {
          title: 'SETTINGS.BUTTONS.THEME.OPTIONS.DARK',
          value: 'dark',
        },
        {
          title: 'SETTINGS.BUTTONS.THEME.OPTIONS.LIGHT',
          value: 'light',
        },
      ],
    },
  ];

  constructor(
    public activeModal: NgbActiveModal,
    public settingsService: ChangeSettingService,
  ) {}

  changeForm(select: Select, form: string): void {
    this.settings.patchValue({
      [form]: select.value,
    });
  }

  ngOnInit(): void {
    this.settings.controls['languaje'].patchValue(
      this.settingsService.getLanguaje(),
    );

    this.subscription = this.settings.controls[
      'languaje'
    ].valueChanges.subscribe(values => {
      this.settingsService.change(values || 'en');
    });
  }

  getOptions(select: Select[], formValue: string) {
    console.log(select, formValue);
    const result = select.find(element => element.value == formValue)?.title;
    return result;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
