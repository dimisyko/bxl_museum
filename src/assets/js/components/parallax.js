export default class parallax{
    constructor(){
        this.imgs = document.querySelectorAll('.image-parallax')
        this.eventParallax()
    }
    getPosMouse(e, el){
        const posCursor = {
            x: (e.offsetX + 50) - el.offsetWidth / 2,
            y: e.offsetY - el.offsetHeight / 2
        }
        return posCursor
    }
    eventParallax(){
        this.imgs.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                el.style.transform = 'translate3d(' + this.getPosMouse(e, el).x + 'px, ' +this.getPosMouse(e, el).y + 'px, 0px)'
            })
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate3d(0px, 0px, 0px)'
            })
        })
    }
}