
export class Helpers {
    static formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    static studentGridColumns() {
        return [
            { field: 'student_name', headerName: 'Name', cell: (element: any) => `${element.student_name}` },
            { field: 'student_unique_code', headerName: 'Unique Code', cell: (element: any) => `${element.student_unique_code}` }
        ]
    }

    static familyGridColumns() {
        return [
            { field: 'family_no', headerName: 'Family No', cell: (element: any) => `${element.family_no}` },
            { field: 'father_name', headerName: 'Family Name', cell: (element: any) => `${element.father_name}` }
        ]
    }

}