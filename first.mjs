export default class First {
    constructor(App) {
        this.App = App;
        this.pages = [this.first];
        this.importStyles();
        return this.page(0);
    }

    async page(number) {
        if (!this.pages[number]) return false;
        this.pageIndex = number;
        return await this.pages[number]();
    }

    async nextPage() {
        return await this.page(++this.pageIndex);
    }

    async first() {
        return await fetch('first/1.html').then(r => r.text())
            .then(r => document.body.innerHTML = r)
            .catch(console.error);
    }

    importStyles() {
        if (document.querySelector('#presentation-style[href="first.css"]')) return true;
        const stylesLink = document.createElement('link');
        stylesLink.id = 'presentation-style';
        stylesLink.rel = 'stylesheet';
        // stylesLink.type = 'text/css';
        stylesLink.href = 'first.css';
        // stylesLink.media = 'all';
        document.head.appendChild(stylesLink);
        return stylesLink;
    }
}