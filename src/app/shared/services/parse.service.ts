import { Injectable } from '@angular/core';
import * as Parse from 'parse';

import { ParseConfig } from '../models/parse.model';

@Injectable({
  providedIn: 'root'
})
export class ParseService {
  constructor() {}

  initialize(config: ParseConfig): void {
    Parse.initialize(config.appId);
    (Parse as any).serverURL = config.serverURL;
  }
}
