import { TestBed } from '@angular/core/testing';

import { ChangeLanguajeService } from './change-languaje.service';

describe('ChangeLanguajeService', () => {
  let service: ChangeLanguajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeLanguajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
