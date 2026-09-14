import { TestBed } from '@angular/core/testing';
import { VersionService } from './version.service';
import { version } from '../../../../package.json';

describe('VersionService', () => {
  it('returns the package.json version', () => {
    const service = TestBed.inject(VersionService);
    expect(service.getVersion()).toBe(version);
    expect(service.getVersion()).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
