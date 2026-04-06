import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

 createMysqlDateRangeArray(fromDate, toDate) {
    var dateRange = [fromDate];
    var splitDate = fromDate.split('-');

    while (dateRange[dateRange.length - 1] !== toDate) {
        splitDate[2] = parseInt(splitDate[2]) + 1;
        if (!this.isValidDate(splitDate[1], splitDate[2], splitDate[0])) {
            splitDate[2] = 1;
            splitDate[1] = parseInt(splitDate[1]) + 1;
            if (!this.isValidDate(splitDate[1], splitDate[2], splitDate[0])) {
                splitDate[1] = 1;
                splitDate[0] = parseInt(splitDate[0]) + 1;
            }
        }
        dateRange.push(this.padZero(splitDate[0], 4) + '-' + this.padZero(splitDate[1], 2) + '-' + this.padZero(splitDate[2], 2));
    }

    return dateRange;
}

isValidDate(month, day, year) {
    var d = new Date(year, month - 1, day);
    return d && (d.getMonth() + 1) === parseInt(month) && d.getDate() === parseInt(day) && d.getFullYear() === parseInt(year);
}

padZero(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

  createMysqlDateRangeArray11(fromDate, toDate) {
    var dateRange = [fromDate];
    var splitDate = fromDate.split('-');
    while (dateRange[dateRange.length - 1] !== toDate) {
      if (!this.isValidDate(splitDate[1], ++splitDate[2], splitDate[0])) {
          if (!this.isValidDate(++splitDate[1], 1, splitDate[0])) {
              splitDate[2] = splitDate[1] = 1;
              splitDate[0]++;
          }
      }
      dateRange.push(
          splitDate[0].toString().padEnd(4, '0') +
          '-' +
          splitDate[1].toString().padEnd(2, '0') +
          '-' +
          splitDate[2].toString().padEnd(2, '0')
      );
    }
    return dateRange;
}

// isValidDate(year, month, day) {
//   var d = new Date(year, month, day);

//   return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
// }

  checkPeakSeason(fromDate, toDate){
    const splitFromDate = fromDate.split('-');
    const splitToDate = toDate.split('-');
    if(this.intersect(splitFromDate[0] + '-12-17', splitToDate[0] + '-12-31', fromDate, toDate)){
      return "Winter";
    } else if(this.intersect(splitFromDate[0] + '-03-27', splitToDate[0] + '-04-14', fromDate, toDate)){
      return "Spring";
    } else if(this.intersect(splitFromDate[0] + '-06-15', splitToDate[0] + '-09-15', fromDate, toDate)){
      return "Summer";
    } else {
      return "";
    }
  }

  intersect(start1, end1, start2, end2) {
    const range_min = new Date(start1);
    const range_max = new Date(end1);
    const start = new Date(start2);
    const end = new Date(end2);
    if (start >= range_min && end <= range_max) {
      return true;
    } else {
      return false;
    }
  }


}
