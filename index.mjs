export default class Acoin {
    constructor() {
        this.presentations = [];
        return this.init();
    }

    async init() {
        let targetPresentation = location.search.length > 1 ? location.search.substr(1) : 'first';
        return this.loadPresentation(targetPresentation);
    }

    async loadPresentation(name) {
        try {
            this.presentations[name] = await import('./' + name + '.mjs');
            return new this.presentations[name].default(this);
        } catch (e) {
            alert('Не удалось загрузить презентацию "' + name + '"');
            throw (e);
        }
    }
}