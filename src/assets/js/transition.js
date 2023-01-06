import gsap from "gsap";

export default class transition {
    constructor(){
        this.svg = document.querySelector('.bg')
        this.path = this.svg.querySelector('path')
        this.links = document.querySelectorAll('.link')
        this.tlInter()
}

    tlLeave() {
        this.svg.style.zIndex = 999
        const tlLeave = gsap.timeline()
        tlLeave.set(this.path, {
            attr: { d: 'M 0 100 Q 50 100 100 100 V 100 Q 50 100 0 100 Z' }
        })
        tlLeave.to(this.path,{
            attr : {'d' : "M 0 100 Q 50 100 100 100 V 80 Q 50 0 0 80 Z"},
            duration: 0.7,
            ease: 'power4.in',
        },)
        tlLeave.to(this.path,{
            attr : {'d' : "M 0 100 Q 50 100 100 100 V 0 Q 50 0 0 0 Z"},
            duration: 0.4,
            ease: 'power2',
        })
    }

    tlInter() {
        this.clk()
        const tl = gsap.timeline()
        tl.set(this.path, {
            attr: { d: 'M 0 100 Q 50 100 100 100 V 0 Q 50 0 0 0 Z' }
        })
        tl.to(this.path,{
            attr : {'d' : "M 0 80 Q 50 0 100 80 V 0 Q 50 0 0 0 Z"},
            duration: 0.7,
            ease: 'power4.in',
        },)
        tl.to(this.path,{
            attr : {'d' : "M 0 0 Q 50 0 100 0 V 0 Q 50 0 0 0 Z"},
            duration: 0.4,
            ease: 'power2',
        })
        tl.to('.opacity', {
            opacity: 1,
            duration: 1
        })
    }

    clk(){
        this.links.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                const attr = link.getAttribute('href')
                this.tlLeave()
                setTimeout(() => {
                    window.location.href = attr
                }, 1200);
            })
        })
    }
}