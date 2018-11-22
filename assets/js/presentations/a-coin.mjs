import Presentation from '../presentation.mjs';

export default class Acoin extends Presentation {

    constructor(props = {}) {

        super(props);

        Object.assign(this.data, {
            title: 'А-коины',
            index: '01',
            header: 'Каждое действие на сайте приносит деньги',
            entrySlide: 'intro'
        });

        this.slides = {
            'intro': {
                html: 'a-coin/intro',
                init: async () => await this.bindAction('.switch', async () => {
                    document.querySelector('.switch').parentNode.classList.toggle('active', true);
                    await this.sleep(2000).then(async () => await this.slide('cover'));
                }, 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1500);
                }
            },
            'cover': {
                html: 'a-coin/cover',
                init: async () => await this.bindAction('#whatIs', async () => this.slide('whatIs'), 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'whatIs': {
                html: 'a-coin/whatIs',
                init: async () => await this.bindAction('#howToGet', async () => this.slide('likes'), 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'likes': {
                html: 'a-coin/likes',
                init: async () => await this.bindAction('#toggle-heart', async () => {
                    document.querySelector('#toggle-heart').parentNode.parentNode.classList.toggle('active');
                    this.animateValueDelay('.wallet', 0, 100, 500, 500);
                    this.sleep(3000).then(async () => await this.slide('comments'))
                }, 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'comments': {
                html: 'a-coin/comments',
                init: async () => await this.bindAction('#sendComment', async () => {
                    document.querySelector('#sendComment').parentNode.parentNode.classList.toggle('active');
                    this.animateValueDelay('.wallet', 100, 300, 500, 600);
                    this.sleep(3000).then(async () => await this.slide('services'))
                }, 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'services': {
                html: 'a-coin/services',
                init: async () => await this.bindAction('#signUp', async () => {
                    document.querySelector('#signUp').parentNode.parentNode.classList.toggle('active');
                    this.animateValueDelay('.wallet', 300, 500, 500, 1000);
                    this.sleep(3000).then(async () => await this.slide('collected'))
                }, 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'collected': {
                html: 'a-coin/collected',
                init: async () => await this.bindAction('#whatToSpend', async () => this.slide('spend'), 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'spend': {
                html: 'a-coin/spend',
                init: async () => await this.bindAction('#more', async () => this.slide('more'), 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'more': {
                html: 'a-coin/more',
                init: this.initMorePresentationsSlide.bind(this),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            }
        };

    }

}