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

const maskImg = new Image()
maskImg.src = "images/mask.png"
console.log(maskImg);

const halfMaskImg = new Image ()
halfMaskImg.src = "images/half-mask.png"



//ARRAYS DE ENEMIGOS Y FLECHAS
const enemigosArray = [];
const flechasArray = [];
const mascarasArray =[];


//console.log(mascarasArray);

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
}//         instanciar un objeto
let vida1 = new Vidas (150,50,80,80, halfMaskImg);
let vida2 = new Vidas (150,50,80,80, maskImg);
let vida3 = new Vidas (230,50,80,80, halfMaskImg);
let vida4 = new Vidas (230,50,80,80, maskImg);
let vida5 = new Vidas (310,50,80,80, halfMaskImg);
let vida6 = new Vidas (310,50,80,80, maskImg);

const vidasArray = [vida1, vida2, vida3, vida4, vida5, vida6];
//console.log(vidasArray)
function dibujarVidas(heroevida){
    for (let i = 0; i < heroevida; i++) {
        vidasArray[i].dibujarse();
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
function headerDatos(vida, score) {
    ctx.font = "30px Open Sans";
    ctx.fillStyle = "black";
    ctx.fillText("Princess Mononoke", 580, 80);
    ctx.fillText(`Vida:`, 25, 80);
    ctx.fillText(`Score: ${score}`, 1100, 80);

}
headerDatos();
//ESCUCHAR TECLAS
function teclas(heroe) {
    document.addEventListener("keyup", (evento)=> {
        console.log("teclaaa", evento.code);
        switch (evento.code) {
            case "ArrowUp":
                heroe.subir();
                //console.log("Saltar");
                
                break;
            case "ArrowRight":
                //console.log("Avanza");
                heroe.avanzar();
                break;
            case "ArrowLeft":
                //
                console.log("Back up");
                heroe.retroceder();
                break;
            case "KeyC":
                //console.log("Lanza flechaaa");
                heroe.lanzarFlechas();
                break;
            case "Space":
                //console.log("Lanza flechaaa");
                heroe.saltar();
                break;
            case "ArrowDown":
                console.log("Baja");
                heroe.bajar();
                break;
        }
    });
}
teclas();

//CREAR ENEMIGOS RANDOM
function crearEnemigos(){
    let num = Math.floor(Math.random() * 100)
    let alturaRandom = Math.floor(Math.random() * (700 - 500) + 500)
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
        //console.log("mascaraa");
     }
}


//INICIAR JUEGO
function iniciarJuego(){
    const heroe = new Heroe(50,600,350,200,6, heroeImg);
    teclas(heroe);
    //console.log(heroe);
    heroe.dibujarse();

  
//SET INTERVAL
    setInterval(()=>{
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
                //console.log("bajate")
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
                } else {
                    alert("perdiste");

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
                        if(heroe.score == 200) {
                            alert("ganaste");
                        }
                }
            })
        })
      
        
    crearEnemigos();
    crearMascaras();
},10);
}

iniciarJuego();
