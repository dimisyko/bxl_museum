export default class parallax{
    constructor(){
        this.imgs = document.querySelectorAll('.image-parallax')
        this.eventParallax()
    }
    getPosMouse(e){
        const posCursor = {
            x: e.offsetX - 90,
            y: e.offsetY - 80
        }
        return posCursor
    }
    eventParallax(){
        this.imgs.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                el.style.transform = 'translate3d(' + this.getPosMouse(e).x + 'px, ' +this.getPosMouse(e).y + 'px, 0px)'
            })
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate3d(0px, 0px, 0px)'
            })
        })
    }
}