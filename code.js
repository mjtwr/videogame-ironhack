let btnStart = document.getElementsByClassName("start")[0];
btnStart.addEventListener("click", () =>{
    clearInterval(idInterval);
    iniciarJuego();
});
let btnStart2 = document.getElementsByClassName("start")[1];
btnStart2.addEventListener("click", () =>{
    clearInterval(idInterval);
    iniciarJuego();
});
//ID INTERVAL
let idInterval;

//CANVAS
let lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d");

//MODALES
const modal = document.querySelector(".modal");
const modalWinner = document.querySelector(".modal-winner");
const closeButton = document.querySelector(".close-button");
const closeButtonWinner = document.querySelector(".close-button-winner");

function toggleModalWinner() {
    modalWinner.classList.toggle("show-modal")
}

function toggleModal() {
    modal.classList.toggle("show-modal")
}
closeButton.addEventListener("click", toggleModal);
closeButtonWinner.addEventListener("click", toggleModalWinner);

//IMAGENES
const heroeImg = new Image()
heroeImg.src = "images/ashitaka1.png";

const enemigoImg = new Image()
enemigoImg.src = "images/pig.png";

const flechaImg = new Image()
flechaImg.src = "images/arrow.png"

const maskImg = new Image()
maskImg.src = "images/mask.png"

const halfMaskImg = new Image ()
halfMaskImg.src = "images/half-mask.png"

const livesImg = new Image ()
livesImg.src = "images/lives.png"

const scoreImg = new Image ()
scoreImg.src = "images/score.png"

const tituloImg = new Image ()
tituloImg.src = "images/titulo.png"

const floorImg = new Image ()
floorImg.src = "images/floor.png"

//ARRAYS DE ENEMIGOS, FLECHAS Y MASCARAS
let enemigosArray = [];
let flechasArray = [];
let mascarasArray =[];


//PERSONAJE: ASHITAKA
class Heroe {
    constructor(x,y,w,h,vida,image) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vida = vida;
        this.image = image;
        this.score = 0;
    }
    avanzar(){
        if(this.x + this.w < 1350){
            this.x += 40;
        }
    }
    retroceder(){
        if(this.x > 30){
            this.x -= 40;
        }
    }
    subir(){
        if(this.y > 490){
            this.y -= 40;
        }
    }
    bajar(){
        if(this.y <= 750){ 
            this.y += 40;
        }
    }
    saltar(){
        if(this.x < 800){
            this.saltando = true;
        }
    }
    
    lanzarFlechas(){
        const lanzaFlecha = new Flechas(this.x + this.w, this.y + 80, 70, 80, flechaImg);
        flechasArray.push(lanzaFlecha);
    }
    morir(){}
    dibujarse(){
        ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
    }
}

//ENEMIGO: BOARS
class Enemigo {
    constructor(x,y,w,h,image) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
    }
    dibujarse(){
        //ctx.fillStyle = "white"
        //ctx.fillRect(this.x,this.y,this.w, this.h);
        ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
        this.x -= 4;
    }
}

//FLECHAS -- LANZAR
class Flechas {
    constructor(x,y,w,h,image) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
    }
    dibujarse(){
        ctx.drawImage(this.image, this.x ,this.y,this.w, this.h);
        this.x += 4;   
    }
}

//MASCARAS
class Mascaras {
    constructor(x,y,w,h,image) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
    }
    dibujarse(){
        ctx.drawImage(this.image, this.x ,this.y,this.w, this.h);
        this.x -= 4;   
    }
}

//VIDAS
class Vidas {
    constructor(x,y,w,h,image) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
    }
    dibujarse(){
        ctx.drawImage(this.image, this.x ,this.y,this.w, this.h);
    } 
}
let vida1 = new Vidas (210,50,80,80, halfMaskImg);
let vida2 = new Vidas (210,50,80,80, maskImg);
let vida3 = new Vidas (300,50,80,80, halfMaskImg);
let vida4 = new Vidas (300,50,80,80, maskImg);
let vida5 = new Vidas (390,50,80,80, halfMaskImg);
let vida6 = new Vidas (390,50,80,80, maskImg);

const vidasArray = [vida1, vida2, vida3, vida4, vida5, vida6];
function dibujarVidas(heroevida){
    for (let i = 0; i < heroevida; i++) {
        vidasArray[i].dibujarse();
    }
   
}

// PISO
function dibujarPiso(){
    ctx.drawImage(floorImg, 0,450,1600,500);
}

//ENCABEZADO
function headerDatos(vida, score) {
    ctx.font = "80px Open Sans";
    ctx.fillStyle = "white";
    ctx.fillText(`${score}`, 1400, 120);
    ctx.drawImage(livesImg, 10, 50, 190, 70);
    ctx.drawImage(scoreImg, 1200, 50, 190, 70);
    ctx.drawImage(tituloImg, 650, 50, 350, 150);
}

//ESCUCHAR TECLAS
function teclas(heroe) {
    document.addEventListener("keyup", (evento)=> {
        switch (evento.code) {
            case "ArrowUp":
                heroe.subir();
                
                break;
            case "ArrowRight":
                heroe.avanzar();
                break;
            case "ArrowLeft":
                 ("Back up");
                heroe.retroceder();
                break;
            case "KeyC":
                heroe.lanzarFlechas();
                break;
            case "Space":
                heroe.saltar();
                break;
            case "ArrowDown":
            
                heroe.bajar();
                break;
        }
    });
}

//CREAR ENEMIGOS RANDOM
function crearEnemigos(){
    let num = Math.floor(Math.random() * 100)
    let alturaRandom = Math.floor(Math.random() * (700 - 550) + 550)
    if (num == 6){
        const enemigo = new Enemigo (1700, alturaRandom, 200, 170,enemigoImg);
        enemigosArray.push(enemigo);
    }
}
//CREAR MASCARAS RANDOM
function crearMascaras(){
     let num = Math.floor(Math.random() * 300)
     if (num == 2) {
        const mask = new Mascaras (1700, 300, 100,100, maskImg);
        mascarasArray.push(mask);
     }
}

//INICIAR JUEGO
function iniciarJuego(){
    const heroe = new Heroe(50,600,350,200,6, heroeImg);
    teclas(heroe);
    heroe.dibujarse();
    enemigosArray = [];
    flechasArray = [];
    mascarasArray =[];

//SET INTERVAL
idInterval = setInterval(()=>{
        ctx.clearRect(0,0,1600,900);
        dibujarPiso();
        heroe.dibujarse();
        headerDatos(heroe.vida, heroe.score);
        dibujarVidas(heroe.vida);
        
        //salto
        if(heroe.saltando === true){
            //altura max de salto
            if(heroe.y > 200){ //tope
                heroe.y -= 12; // la "rapidez"
                heroe.x += 5; // avanza
            }else{ //bajarlo
                heroe.saltando = false;
            }
        }
         //no estas saltando?
         if (heroe.saltando === false && heroe.y < 600){
            heroe.y += 5;
        }
       
        enemigosArray.forEach((enemigo, i) =>{
            enemigo.dibujarse();
            if( enemigo.x <= heroe.x + heroe.w && enemigo.y <= heroe.y + heroe.h && heroe.y <= enemigo.y + enemigo.h){
                enemigosArray.splice(i,1);
                if (heroe.vida >= 1){
                    heroe.vida -= 1;
                    if (heroe.vida == 0){
                    clearInterval(idInterval);
                    toggleModal();
                } 
                }       
            }
        });
        mascarasArray.forEach((mask, i) => {
            mask.dibujarse();
            if (mask.x <= heroe.x + heroe.w && mask.y <= heroe.y + heroe.h && heroe.y <= mask.y + mask.h){
                 mascarasArray.splice(i, 1);
                 
                 if(heroe.vida <5){
                    heroe.vida += 1
                 }
             }
         });
        flechasArray.forEach((flecha, flechasArrayIndex) => {
            flecha.dibujarse();
            enemigosArray.forEach((enemigo, enemigosArrayIndex) =>{
                if (enemigo.x <= flecha.x + flecha.w && enemigo.y <= flecha.y + flecha.h && flecha.y <= enemigo.y + enemigo.h) {
                    enemigosArray.splice(enemigosArrayIndex, 1);
                    flechasArray.splice(flechasArrayIndex,1);
                    heroe.score += 10;
                        if(heroe.score > 200) {
                        clearInterval(idInterval);
                        toggleModalWinner();
                        }
                }
            })
        })
        
    crearEnemigos();
    crearMascaras();
},10);
}

iniciarJuego();
