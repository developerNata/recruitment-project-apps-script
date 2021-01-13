import '../assets/css/style.css';
import '../assets/css/bootstrap.css';

class TestApp {
    credentials: string;

    constructor() {
        this.init();
        this.addTextarea();
        this.addCredentialsContainers();
        this.createModal();
    }

    appendStringAsHtml(appendedString: string, parentSelector: string): void {
        const parent: any = document.querySelector(parentSelector);
        if (parent) {
            parent.append(document.createRange().createContextualFragment(appendedString));
        }
    }

    openModal(): void {
        document.getElementById('modal').classList.add('modal-opened');
    }

    closeModal(): void {
        document.getElementById('modal').classList.remove('modal-opened');
    }

    setTextareaValue(isReverse: boolean): void {
        console.log(this.credentials);
        document.querySelector('#result-textarea').innerHTML = isReverse ? this.credentials.split("").reverse().join("") : this.credentials;
    }

    onSave = (): void => {
        const firstName: string = (<HTMLInputElement>document.getElementById('first_name')).value;
        const lastName: string = (<HTMLInputElement>document.getElementById("last_name")).value;
        if (firstName && lastName) {
            this.credentials = firstName + " " + lastName;
            document.querySelector('.credentials-container').innerHTML = this.credentials;
            document.querySelector('.credentials-container-reverse').innerHTML = this.credentials.split("").reverse().join("");
            console.log(this);
            console.log(this.closeModal);
            this.closeModal();
        }
    }

    createModal(): void {
        const modal : string = '<div class="modal" id="modal" tabindex="-1" role="dialog">' +
            '  <div class="modal-dialog" role="document">' +
            '    <div class="modal-content">' +
            '      <div class="modal-header">' +
            '        <h5 class="modal-title">Enter credentials</h5>' +
            '        <button type="button" class="close" id="close-modal" data-dismiss="modal" aria-label="Close">' +
            '          <span aria-hidden="true">&times;</span>' +
            '        </button>' +
            '      </div>' +
            '      <div class="modal-body">\n' +
            '       <div>' +
            '        <label for="first_name">First name</label>' +
            '        <input type="text" id="first_name" required name="first_name">' +
            '       </div>' +
            '       <div class="mt-2">' +
            '        <label for="last_name">Last name</label>' +
            '        <input required type="text" id="last_name" name="last_name">' +
            '       </div>' +
            '      </div>' +
            '      <div class="modal-footer">' +
            '        <button type="submit" id="save-button" class="btn btn-primary">Save changes</button>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>';
        this.appendStringAsHtml(modal, '.app-container');
        document.getElementById('close-modal').addEventListener('click', this.closeModal);
        document.getElementById('save-button').addEventListener('click', this.onSave);
    }

    addCredentialsContainers(): void {
        const credentialsContainer: string =
            '<p class="credentials-container"></p>' +
            '<p class="credentials-container-reverse"></p>'
        this.appendStringAsHtml(credentialsContainer, '.app-container');

        document.getElementsByClassName('credentials-container')[0].addEventListener('click', () => {
            this.setTextareaValue(false);
        })
        document.getElementsByClassName('credentials-container-reverse')[0].addEventListener('click', () => {
            this.setTextareaValue(true);
        })
    }

    addTextarea() {
        const textarea: string =
            '<div class="text-area">' +
            '<textarea disabled name="result" id="result-textarea" cols="30" rows="1"></textarea>' +
            '</div>';
        this.appendStringAsHtml(textarea, '.app-container');
    }

    init(): void {
        const initButton: string =
            '<div class="app-container text-center">' +
            '<button class="btn btn-secondary mt-5 mb-5" id="modal-open-button">Enter name</button>' +
            '</div>';
        this.appendStringAsHtml(initButton, 'body');
        document.getElementById('modal-open-button').addEventListener('click', this.openModal)
    }
}

new TestApp();