import Presentation from '../presentation.mjs';

export default class Rating extends Presentation {

    constructor(props = {}) {

        super(props);

        Object.assign(this.data, {
            title: 'Услуги на PROFILES',
            index: '03',
            header: 'Продвигай свои услуги',
            entrySlide: 'intro'
        });

        this.slides = {
            'intro': {
                html: 'services/intro',
                init: async () => await document.querySelector('.switch').addEventListener('click', async () => this.sleep(5000).then(async () => await this.slide('whatIs'))),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'whatIs': {
                html: 'services/whatIs',
                init: async () => await document.querySelector('#accreditation').addEventListener('click', async () => this.slide('accreditation')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'accreditation': {
                html: 'services/accreditation',
                init: async () => await document.querySelector('#form').addEventListener('click', async () => this.slide('form')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'form': {
                html: 'services/form',
                init: async () => await document.querySelector('#done').addEventListener('click', async () => this.slide('done')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'done': {
                html: 'services/done',
                init: async () => await document.querySelector('#acoins').addEventListener('click', async () => this.slide('acoins')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'acoins': {
                html: 'services/acoins',
                init: async () => await document.querySelector('#promo').addEventListener('click', async () => this.slide('promo')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'promo': {
                html: 'services/promo',
                init: async () => await document.querySelector('#leads').addEventListener('click', async () => this.slide('leads')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'leads': {
                html: 'services/leads',
                init: async () => await document.querySelector('#more').addEventListener('click', async () => this.slide('more')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'more': {
                html: 'rating/more',
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            }
        };

    }

}