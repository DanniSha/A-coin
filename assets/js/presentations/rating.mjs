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
                // init: async () => await document.querySelector('.slider').addEventListener('click', async () => this.sleep(5000).then(async () => await this.slide('cover'))),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            }
        };

    }

}