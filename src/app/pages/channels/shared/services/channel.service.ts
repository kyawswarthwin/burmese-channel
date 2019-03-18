import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ChannelService extends Parse.Object {
  searchable: string[] = ['name'];

  constructor() {
    super('Channel');
  }

  load(params: any = {}): Observable<ChannelService[]> {
    const { search, sortBy, page, limit = 25 } = params;
    let query = new Parse.Query(ChannelService);
    // Search
    if (search) {
      const queries = [];
      this.searchable.forEach((field, index) => {
        queries[index] = new Parse.Query(ChannelService);
        queries[index].matches(field, search, 'i');
      });
      query = Parse.Query.or(...queries);
    }
    // Sort
    if (sortBy) {
      if (sortBy.charAt(0) === '-') {
        query.descending(sortBy.substr(1));
      } else {
        query.ascending(sortBy);
      }
    }
    // Paginate
    if (page >= 0) {
      query.skip((page - 1) * limit);
      query.limit(limit);
    }
    return from(query.find());
  }

  get name(): string {
    return this.get('name');
  }

  get url(): string {
    return this.get('url');
  }
}
Parse.Object.registerSubclass('Channel', ChannelService);
