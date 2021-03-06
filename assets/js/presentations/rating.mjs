import Presentation from '../presentation.mjs';

export default class Rating extends Presentation {

    constructor(props = {}) {

        super(props);

        Object.assign(this.data, {
            title: 'Рейтинг на PROFILES',
            index: '02',
            header: 'Каждая оценка повышает рейтинг',
            entrySlide: 'intro'
        });

        this.slides = {
            'intro': {
                html: 'rating/intro',
                init: async () => await document.querySelector('.switch').addEventListener('click', async () => this.sleep(5000).then(async () => await this.slide('start'))),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'start': {
                html: 'rating/start',
                init: async () => await document.querySelector('#whatIs').addEventListener('click', async () => this.slide('whatIs')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'whatIs': {
                html: 'rating/whatIs',
                init: async () => await document.querySelector('#whatInfluences').addEventListener('click', async () => this.slide('whatInfluences')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'whatInfluences': {
                html: 'rating/whatInfluences',
                init: async () => await document.querySelector('#writePosts').addEventListener('click', async () => this.slide('writePosts')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'writePosts': {
                html: 'rating/writePosts',
                init: async () => await document.querySelector('#answers').addEventListener('click', async () => this.slide('answers')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'answers': {
                html: 'rating/answers',
                init: async () => await document.querySelector('#sendComment').addEventListener('click', async () => this.slide('comments')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'comments': {
                html: 'rating/comments',
                init: async () => await document.querySelector('#sendComment').addEventListener('click', async () => this.slide('collected')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'collected': {
                html: 'rating/collected',
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