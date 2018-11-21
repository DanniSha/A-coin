import ACoinPresentation from './presentations/a-coin.mjs';
import RatingPresentation from './presentations/rating.mjs';
import ServicesPresentation from './presentations/services.mjs';

export default class TerminalApp {

    constructor({htmlPath = 'assets/html/', idleTimeout = localStorage.getItem('debug') ? false : 20000} = {}) {

        this.TerminalApp = this;

        this.parameters = {
            htmlPath,
            idleTimeout
        };

        this.presentations = {
            'a-coin': new ACoinPresentation({TerminalApp: this}),
            'rating': new RatingPresentation({TerminalApp: this}),
            'services': new ServicesPresentation({TerminalApp: this})
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

    async prepareWrapper() {
        const rootWrapper = document.createElement('main');
        this.root = rootWrapper;
        const footerWrapper = document.createElement('footer');
        const fullscreenToggleButton = document.createElement('button');
        fullscreenToggleButton.classList.toggle('fullscreen', true);
        fullscreenToggleButton.onclick = this.toggleFullScreen;
        footerWrapper.appendChild(fullscreenToggleButton);
        document.body.innerHTML = '';
        document.body.appendChild(rootWrapper);
        document.body.appendChild(footerWrapper);
    }

    async preparePresentations() {
        const PreparingQueue = await Promise.all(Object.entries(this.presentations).map(async presentationItem => {
            presentationItem[1].data.id = presentationItem[0];
            return await presentationItem[1].preloadSlides()
        }));
        await this.prepareWrapper();
        return await this.init();
    }

    async showTerminalMenu(historyPush = true) {

        const menuDescription = document.createElement('section');
        menuDescription.classList.add('title');
        menuDescription.style.marginTop = '400rem';
        menuDescription.setAttribute('data-slide-swith', '');
        menuDescription.innerText = 'Сервисное меню';

        const menuWrapper = document.createElement('section');
        menuWrapper.classList.add('buttons');
        menuWrapper.style.marginTop = '223rem';
        menuWrapper.setAttribute('data-slide-swith', '');

        await this.renderPresentationsLinks({targetNode: menuWrapper});

        /*Object.entries(this.presentations).forEach((presentation => {
            const presentationLink = document.createElement('button');
            presentationLink.innerText = presentation[1].data.title;
            presentationLink.onclick = this.initPresentation.bind(this, presentation[0], null, true);
            menuWrapper.appendChild(presentationLink);
        }));*/

        await this.unloadPage();

        if (historyPush) history.pushState(null, this.data.title, '');

        this.root.appendChild(menuDescription);

        this.root.appendChild(menuWrapper);

    }

    initPresentation(presentation, slide, historyPush = true) {

        // this.currentPresentation = this.presentations[presentation];

        // this.currentSlide = false;

        this.resetIdleTimer();

        if (!this.parameters.defaultPresentation) this.parameters.defaultPresentation = presentation;

        return this.presentations[presentation].init(slide, historyPush);

    }

    async renderPresentationsLinks({targetNode, excludePresentation = false} = {}) {
        targetNode.innerHtml = '';
        Object.entries(this.TerminalApp.presentations).forEach((presentation => {
            if (presentation[0] === excludePresentation) return;
            const presentationLink = document.createElement('button');
            presentationLink.innerText = presentation[1].data.title;
            this.TerminalApp.presentations['a-coin'].bindAction(presentationLink, this.TerminalApp.initPresentation.bind(this, presentation[0], null, true));
            // presentationLink.onclick = async () => await this.TerminalApp.presentations['a-coin'].bindAction().then();
            targetNode.appendChild(presentationLink);
        }));
    }

    resetIdleTimer() {
        if (this.idleTimeout) clearTimeout(this.idleTimeout);
        if (this.parameters.idleTimeout) this.idleTimeout = setTimeout(this.triggerIdleTimer.bind(this), this.parameters.idleTimeout);
    }

    triggerIdleTimer() {
        if (this.TerminalApp.currentSlideId && this.TerminalApp.currentPresentation && ((this.TerminalApp.currentPresentation.data.entrySlide !== this.TerminalApp.currentSlideId) || (this.TerminalApp.currentPresentation.data.id !== this.parameters.defaultPresentation)))
            this.initPresentation(this.parameters.defaultPresentation || this.TerminalApp.currentPresentation.data.id);
        this.resetIdleTimer();
    }

    async unloadPage(emptyBody = true) {

        if (this.TerminalApp.currentSlide && this.TerminalApp.currentSlide.exit) await this.TerminalApp.currentSlide.exit();

        if (emptyBody) this.root.innerHTML = '';

        this.currentSlide = false;
        this.currentSlideId = false;

        return await true;
    }

    toggleFullScreen() {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

}

window.App = new TerminalApp();