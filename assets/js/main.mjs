import ACoinPresentation from './presentations/a-coin.mjs';

export default class TerminalApp {

    constructor({htmlPath = 'assets/html/', idleTimeout = 20000} = {}) {

        this.TerminalApp = this;

        this.parameters = {
            htmlPath,
            idleTimeout
        };

        this.presentations = {
            'a-coin': new ACoinPresentation({TerminalApp: this}),
            // 'rating': new RatingPresentation(),
            // 'services': new ServicesPresentation()
        };

        this.preparePresentations();

        window.addEventListener('popstate', async event => event.state ? await this.initPresentation(event.state.presentation, event.state.slide, false) : await this.showTerminalMenu(false));

        document.addEventListener('click', this.resetIdleTimer.bind(this));

    }

    async init() {
        if (history.state && history.state.slide && history.state.presentation) return await this.initPresentation(history.state.presentation, history.state.slide, false);
        if (location.search.length > 1 && location.hash > 1) return await this.initPresentation(location.search.substr(1), location.hash.substr(1), false);
        return await this.showTerminalMenu(false);
    }

    async preparePresentations() {
        const PreparingQueue = await Promise.all(Object.entries(this.presentations).map(async presentationItem => {
            presentationItem[1].data.id = presentationItem[0];
            return await presentationItem[1].preloadSlides()
        }));
        return await this.init();
    }

    async showTerminalMenu(historyPush = true) {

        const menuDescription = document.createElement('section');
        menuDescription.classList.add('description-section');
        menuDescription.setAttribute('data-slide-swith', '');
        menuDescription.innerHTML = `<div class="header">Сервисное меню</div>`;

        const menuWrapper = document.createElement('section');
        menuWrapper.classList.add('button-section');
        menuWrapper.setAttribute('data-slide-swith', '');

        Object.entries(this.presentations).forEach((presentation => {
            const presentationLink = document.createElement('button');
            presentationLink.innerText = presentation[1].data.title;
            presentationLink.onclick = this.initPresentation.bind(this, presentation[0], null, true);
            menuWrapper.appendChild(presentationLink);
        }));

        await this.unloadPage();

        if (historyPush) history.pushState(null, this.data.title, '');

        document.body.appendChild(menuDescription);

        document.body.appendChild(menuWrapper);

    }

    initPresentation(presentation, slide, historyPush = true) {

        // this.currentPresentation = this.presentations[presentation];

        // this.currentSlide = false;

        this.resetIdleTimer();

        return this.presentations[presentation].init(slide, historyPush);

    }

    resetIdleTimer() {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = setTimeout(this.triggerIdleTimer.bind(this), this.parameters.idleTimeout);
    }

    triggerIdleTimer() {
        if (this.TerminalApp.currentSlideId && this.TerminalApp.currentPresentation && this.TerminalApp.currentPresentation.data.entrySlide !== this.TerminalApp.currentSlideId)
            this.initPresentation(this.TerminalApp.currentPresentation.data.id);
        this.resetIdleTimer();
    }

    async unloadPage(emptyBody = true) {

        if (this.TerminalApp.currentSlide && this.TerminalApp.currentSlide.exit) await this.TerminalApp.currentSlide.exit();

        if (emptyBody) document.body.innerHTML = '';

        this.currentSlide = false;
        this.currentSlideId = false;

        return await true;
    }

}

window.App = new TerminalApp();