export class ConfirmDialogModel {
    constructor(public title: string = 'Confirm Action', public message: string = 'Are you sure you want to discard changes?', public minHeight: string = '200px', public minWidth: string = '600px') {
    }
}

export class CommentsDialog {
    constructor(public title: string = 'Choose a Language',  public minHeight: string = '200px', public minWidth: string = '600px') {
    }
}

export class SelectLanguageDialog {
    constructor(public title: string = 'Choose a Language',  public minHeight: string = '60px', public minWidth: string = '100px') {
    }
}