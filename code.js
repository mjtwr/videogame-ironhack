let btnStart = document.getElementsByClassName("start")[0];
//btnStart.addEventListener("click", () =>{
    console.log("Inicia el Juegooo!");
//});

//CANVAS
let lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d");
console.log(lienzo);

//IMAGENES
const heroeImg = new Image()
heroeImg.src = "images/ashitaka1.png";

const enemigoImg = new Image()
enemigoImg.src = "images/pig.png";

const flechaImg = new Image()
flechaImg.src = "images/arrow.png"


//ARRAYS DE ENEMIGOS Y FLECHAS
const enemigosArray = [];
const flechasArray = [];

//PERSONAJE: ASHITAKA
class Heroe {
    constructor(x,y,w,h,vida,image) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vida = vida;
        this.image = image;
    }
    avanzar(){
        if(this.x + this.w < 1350){
            this.x += 25;
        }
    }
    retroceder(){
        if(this.x > 0){
            this.x -= 25;
        }
    }
    saltar(){
        if(this.x < 600){
            this.saltar = true;
        }
    }
    lanzarFlechas(){
        const flecha = new Flechas(this.x + this.w, this.y + 20, 40, 80, flechaImg);
        flechasArray.push(flecha);
        console.log("lanzando flechas!!")
    }
    morir(){}
    dibujarse(){
        ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
    }
}

//ENEMIGO: BOARS
class Enemigo {
    constructor(x,y,w,h,vida,image) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vida = vida;
        this.image = image;
    }
    dibujarse(){
        ctx.fillStyle = "white"
        ctx.fillRect(this.x,this.y,this.w, this.h);
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);    
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
        ctx.fillStyle = "red"
        ctx.fillRect(this.x,this.y,this.w, this.h);
        ctx.drawImage(this.image, this.x ,this.y,this.w, this.h);
        this.x += 4;   
    }
}

// PISO
function dibujarPiso(){
    ctx.beginPath();
    ctx.moveTo(0,500);
    ctx.lineTo(1400,500);
    ctx.lineWidth = 4;
    ctx.fillStyle = "green";
    ctx.fillRect(0,500, 1400,200);
    ctx.stroke();
    ctx.closePath();

}
//dibujarPiso();

//ENCABEZADO
function headerDatos() {
    ctx.font = "30px Open Sans";
    ctx.fillStyle = "black";
    ctx.fillText("Princess Mononoke", 580, 80);
    ctx.fillText("Vida", 25, 80);
    ctx.fillText("Score", 1100, 80);

}
headerDatos();
//ESCUCHAR TECLAS
function teclas(heroe) {
    document.addEventListener("keyup", (evento)=> {
        console.log("teclaaa", evento.code);
        switch (evento.code) {
            case "ArrowUp":
                //console.log("Saltar");
                heroe.saltar();
                break;
            case "ArrowRight":
                //console.log("Avanza");
                heroe.avanzar();
                break;
            case "ArrowLeft":
                //console.log("Back up");
                heroe.retroceder();
                break;
            case "Space":
                //console.log("Lanza flechaaa");
                heroe.lanzarFlechas();
                break;
        }
    });
}
teclas();

//CREAR ENEMIGOS RANDOM
function crearEnemigos(){
    const num = Math.floor(Math.random() * 180)
    if (num == 3){
        const enemigo = new Enemigo (1200, 380, 180, 150, enemigoImg);
        enemigosArray.push(enemigo);
    }
}

        //INICIAR JUEGO
function iniciarJuego(){
    const heroe = new Heroe(50,400,300,200,100, heroeImg);
    teclas(heroe);
    console.log(heroe);
    heroe.dibujarse();

  
//SET INTERVAL
    setInterval(()=>{
        ctx.clearRect(0,0,1400,700);
        dibujarPiso();
        heroe.dibujarse();
        headerDatos();

        //salto
        if(heroe.saltar === true){
            //altura max de salto
            if(heroe.y > 100){ //tope
                heroe.y -= 12; // la "rapidez"
                heroe.x += 5; // avanza
            }else{ //bajarlo
                console.log("bajate")
                heroe.saltar = false;
            }
           
        }
         //no estas saltando?
         if (heroe.saltar === false && heroe.y < 290){
            heroe.y += 12;
        }
        enemigosArray.forEach((enemigo, index) =>{
            enemigo.dibujarse();
            if( enemigo.x <= heroe.x + heroe.w){
                enemigosArray.splice(i,1);
            }
        })
        crearEnemigos();
//});
}

iniciarJuego();
