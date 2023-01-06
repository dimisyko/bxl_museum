export default class cursor{
    constructor(){
        this.curseur = document.querySelector('.cursor')
        this.initPos = { x : 0, y : 0},
        this.newPos = { x : 0, y : 0}
        this.event()
    }
    ease(start, end, ease){
        return start += (end - start) / ease
    }
    posCursor(e){
        this.initPos.x = e.pageX
        this.initPos.y = e.pageY - window.pageYOffset
    }
    raf(){
        this.newPos.x = this.ease(this.newPos.x, this.initPos.x, 10)
        this.newPos.y = this.ease(this.newPos.y, this.initPos.y, 10)
        this.curseur.style.transform = "translate3d("+this.newPos.x+"px,"+this.newPos.y+"px, 0) translate(-50%, -50%)"
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