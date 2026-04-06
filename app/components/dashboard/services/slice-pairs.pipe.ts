


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slicePairs' })
export class SlicePairsPipe implements PipeTransform {
  transform(tickets: any[]): any[][] {
    const result: any = [];
    for (let i = 0; i < tickets.length; i += 2) {
      result.push([tickets[i], tickets[i + 1]]);
    }
    return result;
  }
}