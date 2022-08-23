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
        if(this.x < 800){
            this.saltando = true;
        }
    }
    lanzarFlechas(){
        const lanzaFlecha = new Flechas(this.x + this.w, this.y + 80, 70, 80, flechaImg);
        flechasArray.push(lanzaFlecha);
        console.log("lanzando flechas!!")
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

// PISO
function dibujarPiso(){
    ctx.beginPath();
    ctx.moveTo(0,650);
    ctx.lineTo(1600,650);
    ctx.lineWidth = 4;
    ctx.fillStyle = "green";
    ctx.fillRect(0,650, 1600,300);
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
    let alturaRandom = Math.floor(Math.random() * (700 - 500) + 500)
    if (num == 4){
        const enemigo = new Enemigo (1700, alturaRandom, 200, 170,enemigoImg);
        enemigosArray.push(enemigo);
    }
}

        //INICIAR JUEGO
function iniciarJuego(){
    const heroe = new Heroe(50,600,450,300,100, heroeImg);
    teclas(heroe);
    console.log(heroe);
    heroe.dibujarse();

  
//SET INTERVAL
    setInterval(()=>{
        ctx.clearRect(0,0,1600,900);
        dibujarPiso();
        heroe.dibujarse();
        headerDatos();

        //salto
        if(heroe.saltando === true){
            //altura max de salto
            if(heroe.y > 300){ //tope
                heroe.y -= 12; // la "rapidez"
                heroe.x += 5; // avanza
            }else{ //bajarlo
                console.log("bajate")
                heroe.saltando = false;
            }
        }
         //no estas saltando?
         if (heroe.saltando === false && heroe.y < 600){
            heroe.y += 5;
        }
        enemigosArray.forEach((enemigo, i) =>{
            enemigo.dibujarse();
            if( enemigo.x <= heroe.x + heroe.w){
                enemigosArray.splice(i,1);
                heroe.vida -= 25;
                if(heroe.vida < 25){
                    console.log("Moriste")
                }
            }
        });
        flechasArray.forEach((flecha) => {
            flecha.dibujarse();
        })
    crearEnemigos();
},1000/100);
}

iniciarJuego();
