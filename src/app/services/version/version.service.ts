import { Injectable } from '@angular/core';
const packagejson = require('../../../../package.json');

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  constructor() {}

  getVersion(): string {
    const version = packagejson.version;
    return version;
  }
}
