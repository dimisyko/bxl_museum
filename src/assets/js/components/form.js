import gsap from "gsap";

export default class form{
    constructor(){
        this.form = document.querySelector('form')
        this.childForm = {
            lastname : document.getElementById('lastName'),
            firstname : document.getElementById('firstName'),
            email : document.getElementById('email'),
            confirMail : document.getElementById('emailconfirm'),
            error : document.querySelector('.erreur'),
        }
            this.btn = document.querySelector('.cta')
            this.regex = /^(([^<>()[\]\\.,;:#\s@"]+(\.[^<>()[\]\\.,;:#\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            this.event()
    }
    formContant(e){
            e.preventDefault()
            if (this.childForm.lastname.value.trim('') == '' || this.childForm.firstname.value.trim('') == '' || this.childForm.email.value.trim('') == '' || this.childForm.confirMail.value.trim('') == '') {
                this.childForm.error.textContent = "Les champs sont vides"
            }else if(this.childForm.email.value.trim('') != this.childForm.confirMail.value.trim('')){
                this.childForm.error.textContent = "Les emails ne sont pas identiques"
            }else if(!this.childForm.email.value.trim('').match(this.regex)){
                this.childForm.error.textContent = "La syntaxe de l'email n'est pas correct"  
            }else{
               this.ajax()
            }
    }
    ajax(){
        let xml = new XMLHttpRequest()
        const data = new FormData(this.form)
        xml.addEventListener('load', () =>{
            if(xml.readyState === 4 && xml.status === 200){
            this.childForm.error.textContent = xml.responseText
            gsap.to('fieldset>div,form p', {
                duration: 0.8,
                stagger: 0.2,
                opacity : 0,
                y: '-100%',
                delay : 0.5,
                onComplete : () =>{
                    this.form.remove(), this.btn.remove()
                }
            })
            }
        })
         xml.open('POST', 'message_ajax.php', true)
         xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
         xml.send(data)
    }
    clkBtn(){
            this.form.style.opacity = 1
            this.form.style.visibility = "visible"
            this.btn.style.opacity = 0
    }
    event(){
        if(this.form){
            this.form.addEventListener('submit', this.formContant.bind(this))
            this.btn.addEventListener('click', this.clkBtn.bind(this))
        }
    }
}

