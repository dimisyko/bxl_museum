export default class cursor{
    constructor(){
        this.curseur = document.querySelector('.cursor')
        this.pos ={
        posX : { init : 0, posMouse : 0, ease : 10},
        posY : { init : 0, posMouse : 0, ease : 10}
        }
        this.event()
    }
    ease(start, end, ease){
        return start += (end - start) / ease
    }
    posCursor(e){
        this.pos.posX.posMouse = e.pageX
        this.pos.posY.posMouse = e.pageY - window.pageYOffset
    }
    raf(){
        for (const key in this.pos) {
            this.pos[key].init = this.ease(this.pos[key].init, this.pos[key].posMouse, this.pos[key].ease)
        }
        this.curseur.style.transform = "translate3d("+this.pos.posX.init+"px,"+this.pos.posY.init+"px, 0) translate(-50%, -50%)"
        this.run = requestAnimationFrame(this.raf.bind(this))
    }
    destroyed(){
        document.removeEventListener('mousemove', this.posCursor.bind(this))
        cancelAnimationFrame(this.run)
    }
    event(){
        this.raf()
        "ontouchstart" in window ? this.destroyed() : document.addEventListener('mousemove', this.posCursor.bind(this))
    }
}