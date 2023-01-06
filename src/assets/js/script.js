import tlGsap from "./components/tlGsap.js";
import form from "./components/form.js"
import transition from "./global/transition.js"
import '../style/style.scss';
import parallax from "./components/parallax.js";
import { getOffset } from "./global/offsetEl.js"
import cursor from "./global/cursor.js";

class app {
    constructor() {
        this.el = {
            link : document.querySelectorAll('.link'),
            btnUp : document.querySelector('.arrowUp'),
            afterExpo : document.querySelector('.intro'),
            istImg : document.querySelector('.list-img-anim')
        }
        new parallax()
        new transition()
        new cursor()
        new form()
        this.event()
        tlGsap()
    }
    currentLink(){
        for (let index = 0; index < this.el.link.length; index++) {
            const href = this.el.link[index].getAttribute('href').replace(window.location.origin, "")
            window.location.pathname == href ? this.el.link[index].classList.add('active') : this.el.link[index].classList.remove('active')
        }
    }
    afterColorExpo() {
        if (this.el.afterExpo) {
            const data = this.el.afterExpo.getAttribute('data-color')
            this.el.afterExpo.style.setProperty('--color', data)
        }
    }
    animImg() {
        if (this.el.istImg) {
            const offset = getOffset(this.el.istImg).top
            const PosBounding = offset - window.innerHeight / 3.5
            if (PosBounding > window.innerHeight || -PosBounding > window.innerHeight) return
            this.el.istImg.style.transform = 'translate3d(' + PosBounding * 0.5 + 'px, 0px, 0px)'
        }
    }
    scrollTop(){
       window.scrollTo({
        top : 0,
        behavior : "smooth"
       })
    }
    event() {
        this.afterColorExpo()
        this.currentLink()
        if(this.el.btnUp){
            this.el.btnUp.addEventListener('click', this.scrollTop.bind(this))
        }
        window.addEventListener('scroll', this.animImg.bind(this))
    }
}
new app()