import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

export default function tlGsap() {
        const imgScaleDetect = document.querySelector('.img-scale')
        const imgScale = document.querySelector('.image-scale')
        const bgDetect = document.querySelector('.bg-fixed')
        const bg = document.querySelector('.bg-transi')
        if (imgScaleDetect && imgScale && bgDetect && bg) {
            const scaleImg = gsap.timeline({
                scrollTrigger: {
                    trigger: imgScaleDetect,
                    start: 'top top',
                    pin: true,
                    scrub: true
                }
            })
            scaleImg.to(imgScale, {
                width: '100vw',
                height: '100vh',
            })
            const bgTransi = gsap.timeline({
                scrollTrigger: {
                    trigger: bgDetect,
                    start: 'top top',
                    pin: true,
                    scrub: true
                }
            })
            bgTransi.to(bg, {
                height: '100%',
            })
        }
        const sect = gsap.utils.toArray('.container-expo')
        const expo = document.querySelector('.actuelle-exposition')
        if (expo) {
            gsap.to(expo, {
                xPercent: -100 * (sect.length - 1),
                scrollTrigger: {
                    trigger: '.actuelle-exposition',
                    start: 'center center',
                    pin: true,
                    scrub: 0.8,
                    end: () => "+=" + expo.offsetWidth
                }
            })
        }
        const imgExpo = document.querySelectorAll('.list img')
        imgExpo.forEach(function (imgsExpo) {
            gsap.from(imgsExpo, {
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                duration: 1,
                scrollTrigger: {
                    trigger: imgsExpo,
                    start: 'top center',
                }
            })
        })
}