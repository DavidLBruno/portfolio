import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Select } from '../../interfaces/select.interface';
import { TranslocoPipe } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { ChangeLanguajeService } from '../../services/change-languaje/change-languaje.service';
import { Button } from '../../interfaces/button.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDropdownModule, TranslocoPipe],
})
export class SettingsComponent implements OnInit {
  settings = new FormGroup({
    languaje: new FormControl(''),
  });
  subscription!: Subscription;
  activeLanguaje: string = 'Idioma';

  configsParams: Button[] = [
    {
      title: 'settings.buttons.title.lan',
      option: [
        {
          title: 'settings.buttons.title.lan.es',
          value: 'es',
        },
        {
          title: 'es',
          value: 'en',
        },
      ],
    },
    {
      title: 'settings.buttons.title.theme',
      option: [
        {
          title: 'es',
          value: 'dark',
        },
        {
          title: 'es',
          value: 'light',
        },
      ],
    },
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private languajeService: ChangeLanguajeService
  ) {}

  changeForm(select: Select): void {
    this.settings.patchValue({
      languaje: select.value,
    });
  }

  ngOnInit(): void {
    this.activeLanguaje = this.languajeService.getLanguaje();

    this.subscription = this.settings.valueChanges.subscribe((values) => {
      if (values.languaje) {
        this.languajeService.change(values.languaje);
        this.activeLanguaje = this.languajeService.getLanguaje();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
