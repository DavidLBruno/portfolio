import { TestBed } from '@angular/core/testing';

import { ChangeSettingService } from './change-settings.service';

describe('ChangeSettingService', () => {
  let service: ChangeSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
