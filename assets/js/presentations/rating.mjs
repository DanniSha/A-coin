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
                init: async () => await this.bindAction('.switch', async () => {
                    document.querySelector('.switch').parentNode.classList.toggle('active', true);
                    this.sleep(2000).then(async () => await this.slide('start'))
                }, 3000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'start': {
                html: 'rating/start',
                init: async () => await this.bindAction('#whatIs', async () => this.slide('whatIs'), 3000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'whatIs': {
                html: 'rating/whatIs',
                init: async () => {
                    await this.bindAction('#whatInfluences', async () => this.slide('whatInfluences'), 3000);
                    // await document.querySelector('#whatInfluences').addEventListener('click', async () => await this.prepareAction().then(async () => this.slide('whatInfluences')));
                    await this.sleep(1500).then(() => document.querySelector('.background-cards').classList.toggle('animation', true));
                },
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'whatInfluences': {
                html: 'rating/whatInfluences',
                init: async () => await this.bindAction('#writePosts', async () => this.slide('writePosts'), 3000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'writePosts': {
                html: 'rating/writePosts',
                init: async () => await this.bindAction('#answers', async () => {
                    document.querySelector('.modal-interactive').classList.toggle('active');
                    this.animateValueDelay('.left-counter', 0, 50, 1000, 500);
                    this.animateValueDelay('.right-counter', 0, 100, 1000, 500);
                    this.sleep(3000).then(async () => await this.slide('answers'))
                }, 3000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'answers': {
                html: 'rating/answers',
                init: async () => await this.bindAction('#sendComment', async () => {
                    document.querySelector('.input-interactive').classList.toggle('active');
                    this.animateValueDelay('.left-counter', 50, 90, 1000, 500);
                    this.animateValueDelay('.right-counter', 100, 150, 1000, 500);
                    this.sleep(3000).then(async () => await this.slide('comments'))
                }, 3000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'comments': {
                html: 'rating/comments',
                init: async () => await this.bindAction('#sendComment', async () => {
                    document.querySelector('.input-interactive').classList.toggle('active');
                    this.animateValueDelay('.left-counter', 90, 150, 1000, 500);
                    this.animateValueDelay('.right-counter', 150, 300, 1000, 500);
                    this.sleep(2500).then(async () => await this.slide('collected'))
                }, 3000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    document.querySelector('.profileOnTop').classList.toggle('card-transformation-animation', true);
                    this.sleep(500).then(() => document.querySelector('.hidden-card').classList.toggle('show', true));
                    return await this.sleep(1000);
                }
            },
            'collected': {
                html: 'rating/collected',
                init: async () => {
                    await this.bindAction('#more', async () => this.slide('more'), 3000);
                    await this.sleep(1000).then(() => document.querySelector('.card').classList.toggle('top-animation', true));
                },
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'more': {
                html: 'a-coin/more',
                init: async () => {
                    await this.TerminalApp.renderPresentationsLinks({
                        targetNode: document.querySelector('#presentationsMenu'),
                        excludePresentation: this.data.id
                    });
                    if (this.TerminalApp.parameters.autoplay) this.sleep(3000).then(async () => await this.slide('intro'));
                },
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            }
        };

    }

}