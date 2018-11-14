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
                html: 'rating/intro',
                init: async () => await document.querySelector('.switch').addEventListener('click', async () => this.sleep(2000).then(async () => await this.slide('cover'))),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1500);
                }
            },
            'cover': {
                html: 'a-coin/cover',
                init: async () => await document.querySelector('#whatIs').addEventListener('click', async () => this.slide('whatIs')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'whatIs': {
                html: 'a-coin/whatIs',
                init: async () => await document.querySelector('#howToGet').addEventListener('click', async () => this.slide('likes')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'likes': {
                html: 'a-coin/likes',
                init: async () => await document.querySelector('#toggle-heart').addEventListener('click', async () => {
                    document.querySelector('#toggle-heart').parentNode.parentNode.classList.toggle('active');
                    this.animateValueDelay('.wallet', 0, 100, 500, 500);
                    this.sleep(3000).then(async () => await this.slide('comments'))
                }),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'comments': {
                html: 'a-coin/comments',
                init: async () => await document.querySelector('#sendComment').addEventListener('click', async () => {
                    document.querySelector('#sendComment').parentNode.parentNode.classList.toggle('active');
                    this.animateValueDelay('.wallet', 100, 300, 500, 600);
                    this.sleep(3000).then(async () => await this.slide('services'))
                }),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'services': {
                html: 'a-coin/services',
                init: async () => await document.querySelector('#signUp').addEventListener('click', async () => {
                    document.querySelector('#signUp').parentNode.parentNode.classList.toggle('active');
                    this.animateValueDelay('.wallet', 300, 500, 500, 1000);
                    this.sleep(3000).then(async () => await this.slide('collected'))
                }),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'collected': {
                html: 'a-coin/collected',
                init: async () => await document.querySelector('#whatToSpend').addEventListener('click', async () => this.slide('spend')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'spend': {
                html: 'a-coin/spend',
                init: async () => await document.querySelector('#more').addEventListener('click', async () => this.slide('more')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'more': {
                html: 'a-coin/more',
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            }
        };

    }

}