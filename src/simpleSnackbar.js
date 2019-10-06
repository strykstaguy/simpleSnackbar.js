class simpleSnackbar {
    constructor(message, options) {
        this.id = Math.floor(Math.random() * 1000000);
        this.message = message;
        this.defaults = {
            type: 'default',
        };
        this.options = simpleSnackbar.extend(this.defaults, options);

        const snackbars = document.createElement('div');
        snackbars.classList.add('ss-snackbars');
        snackbars.setAttribute('aria-live', 'polite');
        snackbars.setAttribute('aria-atomic', 'true');

        document.querySelector('body').append(snackbars);

        this.init();
    }

    init() {
        const snackbars = document.querySelector('.ss-snackbars');
        const snackbar = document.createElement('div');
        const close = document.createElement('button');

        snackbar.classList.add('ss-snackbar');
        snackbar.setAttribute('role', 'alert');
        snackbar.setAttribute('aria-live', 'assertive');
        snackbar.setAttribute('aria-atomic', 'true');
        snackbar.setAttribute('data-id', this.id.toString());
        snackbar.classList.add(`ss-snackbar-${this.options.type}`);
        snackbar.innerHTML = `<div class="ss-snackbar-body">${this.message}</div>`;

        close.classList.add('ss-close');
        close.innerHTML = '<span class="ss-icon"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></span>';
        close.addEventListener('click', () => {
            this.hide();
        });

        snackbar.append(close);
        snackbars.append(snackbar);

        this.icon();
    }

    icon() {
        if (this.options.type !== 'default') {
            const snackbar = document.querySelector(`.ss-snackbar[data-id="${this.id}"`);
            const icon = document.createElement('div');

            icon.classList.add('ss-snackbar-icon');
            icon.innerHTML = '<span class="ss-icon"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg></span>';
            snackbar.prepend(icon);
        }
    }

    show() {
        setTimeout(() => {
            document.querySelector(`.ss-snackbar[data-id="${this.id}"`).classList.add('ss-snackbar-active');
        }, 100);
    }

    hide() {
        document.querySelector(`.ss-snackbar[data-id="${this.id}"`).classList.remove('ss-snackbar-active');
    }

    toggle() {
        document.querySelector(`.ss-snackbar[data-id="${this.id}"`).classList.toggle('ss-snackbar-active');
    }

    static extend(defaults, options) {
        const extended = {};

        if (defaults) {
            const keys = Object.keys(defaults);

            keys.forEach((value) => {
                if (Object.prototype.hasOwnProperty.call(defaults, value)) {
                    extended[value] = defaults[value];
                }
            });
        }

        if (options) {
            const keys = Object.keys(options);

            keys.forEach((value) => {
                if (Object.prototype.hasOwnProperty.call(options, value)) {
                    extended[value] = options[value];
                }
            });
        }

        return extended;
    }
}

export default simpleSnackbar;
