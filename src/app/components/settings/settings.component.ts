import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Select } from '../../interfaces/select.interface';
import { TranslocoPipe } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

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

  languaje: Select[] = [
    {
      title: 'Español',
      value: 'es',
    },
    {
      title: 'Ingles',
      value: 'en',
    },
  ];

  constructor(public activeModal: NgbActiveModal) {}

  changeForm(select: Select): void {
    this.settings.patchValue({
      languaje: select.value,
    });
    this.activeLanguaje = select.title;
  }

  ngOnInit(): void {
    this.subscription = this.settings.valueChanges.subscribe((values) => {});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
