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
                init: async () => await document.querySelector('.switch').addEventListener('click', async () => this.sleep(2000).then(async () => await this.slide('start'))),
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
                    return await this.sleep(500);
                }
            },
            'whatIs': {
                html: 'rating/whatIs',
                init: async () => await document.querySelector('#whatInfluences').addEventListener('click', async () => this.slide('whatInfluences')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'whatInfluences': {
                html: 'rating/whatInfluences',
                init: async () => await document.querySelector('#writePosts').addEventListener('click', async () => this.slide('writePosts')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'writePosts': {
                html: 'rating/writePosts',
                init: async () => await document.querySelector('#answers').addEventListener('click', async () => {
                    document.querySelector('.modal-interactive').classList.toggle('active');
                    this.animateValueDelay('.left-counter', 0, 50, 500, 500);
                    this.animateValueDelay('.right-counter', 0, 100, 500, 500);
                    this.sleep(3000).then(async () => await this.slide('answers'))
                }),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'answers': {
                html: 'rating/answers',
                init: async () => await document.querySelector('#sendComment').addEventListener('click', async () => {
                    document.querySelector('.input-interactive').classList.toggle('active');
                    this.animateValueDelay('.left-counter', 50, 90, 500, 500);
                    this.animateValueDelay('.right-counter', 100, 150, 500, 500);
                    this.sleep(3000).then(async () => await this.slide('comments'))
                }),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'comments': {
                html: 'rating/comments',
                init: async () => await document.querySelector('#sendComment').addEventListener('click', async () => {
                    document.querySelector('.input-interactive').classList.toggle('active');
                    this.animateValueDelay('.left-counter', 90, 150, 500, 500);
                    this.animateValueDelay('.right-counter', 150, 300, 500, 500);
                    this.sleep(2500).then(async () => await this.slide('collected'))
                }),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'collected': {
                html: 'rating/collected',
                init: async () => await document.querySelector('#more').addEventListener('click', async () => this.slide('more')),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'more': {
                html: 'rating/more',
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            }
        };

    }

}