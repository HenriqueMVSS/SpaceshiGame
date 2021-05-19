
//alert("ola mundo");

let dirxJ, diryJ, jog, velJ,pjX,pjY;
let jogo, vidaPlaneta;
let frames;
let tamTelaW, tamTelaH;
let velT, tmpCriaBombas;
let contBombas,bombasTotal,velB;

function teclaBaixo(){

let tecla =event.keyCode;
	if(tecla ==38){ //valor 37 == Cima

		diryJ=-1
	}else if(tecla == 40){ //valor 40 == Baixo
		diryJ=1
	}

	if(tecla ==37){ //valor 37 == Esquerda
		dirxJ=-1

	}else if(tecla == 39){ //valor 39 == Direita
		dirxJ=1
	}
	if (tecla == 32){ //valor 32 == Espaço
		// TIRO
		atira(pjX+17,pjY);
	}
}

function teclaCima(){
	let tecla=event.keyCode;

	if((tecla ==38 )||(tecla ==40 )){
		diryJ = 0;		
	}
	if((tecla ==37 )||(tecla ==39 )){
		dirxJ = 0;		
	}
}

// inicia o jogo
function comecar(){
jogo = true;
document.getElementById("telaMsg").style.display = 'none';

}

//finaliza o jogo
function fimDejogo(){
		document.getElementById("telaMsg").style.display = 'block';
	 	jog.remove();
	    jogo = false;
	    
	   document.location.reload(true);
	   
}

// cria as bombas e faz ela aparecer na tela
function criaBomba(){
	if(jogo){
		let y=0;
		let x = Math.random() * tamTelaW;
		let bomba = document.createElement("div");
		let att1 = document.createAttribute("class");
		let att2 = document.createAttribute("style");
		att1.value="bombaClass";
		att2.value="top:"+y+"px; left:"+x+"px;";
		bomba.setAttributeNode(att1);
		bomba.setAttributeNode(att2);
		document.body.appendChild(bomba);


	}
}

// controle das bombas
function controlaBombas(){

	bombasTotal = document.getElementsByClassName("bombaClass")
	let tam = bombasTotal.length;
	for(var i =0;  i<tam; i++){
		if(bombasTotal[i]){
		let posiI = bombasTotal[i].offsetTop;
	
		posiI+=velB;
		bombasTotal[i].style.top=posiI+"px";	
			if(posiI>tamTelaH){
				vidaPlaneta -=10;
				bombasTotal[i].remove();
				document.getElementById("barraPlaneta").style.width=vidaPlaneta+"px";
				if(vidaPlaneta ==0){
					alert("FIM DE JOGO");
					fimDejogo();
				}
			}
			
		}
	}

}

// controla colisão da nae com as bombas
function colisaoNaveBomba(){
	bombasTotal = document.getElementsByClassName("bombaClass");
	let tam = bombasTotal.length;
	for(var i =0;  i<tam; i++){
		if(bombasTotal[i]){
		
			if(
 	 		(
 	 			(jog.offsetTop<=(bombasTotal[i].offsetTop+20))&&
 	 			((jog.offsetTop+27)>=(bombasTotal[i].offsetTop))	
 	 		)
 	 		&&
 	 		(
 	 			(jog.offsetLeft<=(bombasTotal[i].offsetLeft+20))&&
 	 			((jog.offsetLeft+20)>=(bombasTotal[i].offsetLeft))
 	 		)
 	 		){
				 	alert("FIM DE JOGO!!");
				 	fimDejogo();

 	 		 
 	 		}

		}
		}

	}


//}


// controla as colisões
function colisaoTiroBomba(tiro){
 let tam = bombasTotal.length;
 for (var i =0; i<tam; i++) {
 	 if(bombasTotal[i]){
 	 	if(
 	 		(
 	 			(tiro.offsetTop<=(bombasTotal[i].offsetTop+20))&&
 	 			((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop))	
 	 		)
 	 		&&
 	 		(
 	 			(tiro.offsetLeft<=(bombasTotal[i].offsetLeft+20))&&
 	 			((tiro.offsetLeft+6)>=(bombasTotal[i].offsetLeft))
 	 		)
 	 		){
 	 		 bombasTotal[i].remove();
 	 		 tiro.remove();
 	 		 contBombas--;
			 document.getElementById("valBombas").innerHTML = contBombas;
			 if(contBombas==0){

			 	alert("PARABENS GANHADOR!!");
			 	document.getElementById("h1Texto").innerHTML = "PARABENS GANHADOR!!";

			 	fimDejogo();

			 }
 	 		}

 	 }
 }
}

function atira(x,y){

	//criar elementos e propriedades para a ação de tiro
	let tiro = document.createElement("div"); // cria elemento div 
	let att1 = document.createAttribute("class"); //cria atributo classe
    let att2 = document.createAttribute("style"); //cria atributo style
    att1.value="tiroJog"; // define nome da classa
    att2.value="top:"+y+"px;left:"+x+"px;"; // seta posição do tiro
    tiro.setAttributeNode(att1);// adiciona atributo no elemento
    tiro.setAttributeNode(att2); // adiciona atributo no elemento
    document.body.appendChild(tiro); // adiciona elemento no body
    //alert(y +"----"+ x);
}
//controla os tiros
function contrleTiro(){

	let tiros = document.getElementsByClassName("tiroJog");//pegar elementos da classe tiroJog
	let barraPlaneta = document.getElementsByClassName("barraPlaneta");
	let tam= tiros.length; // pegar o tamanho do vetor
	for (var i =0; i<tam;i++) {
		if(tiros[i]){
			let posicaoTiro = tiros[i].offsetTop;
			posicaoTiro -=velT;
			tiros[i].style.top=posicaoTiro+"px";
			colisaoTiroBomba(tiros[i])
				if (posicaoTiro<0){
				tiros[i].remove(); //remove o elemento tiro da tela quando sai quando a posiçãoe menor que zeso
				

			}
		}
	}
}

function controlaJogadro(){
// posiciona jogador
pjY+=diryJ*velJ;
pjX+=dirxJ*velJ;
//Define novo posição;
jog.style.top = pjY+"px";
jog.style.left = pjX+"px";
testeColisoes();
colisaoNaveBomba();
}

function testeColisoes() {
	// testa as colisões entre o personagem e os cantos direito e esquerdo da tela
    if (pjX + (23.5 * 2) >= tamTelaW) {
        pjX -= velJ;
    }
    if(pjX <= 0){
    	pjX += velJ;
    }
	// testa as colisões entre o personagem e os cantos superior e inferior da tela
    if (pjY + (23.5 * 2) >= tamTelaH ) {
        pjY -= velJ;
    }
    if(pjY <= 0){
    	pjY += velJ;
    }

 }

function gameLoop(){
 if(jogo){

 	//FUNÇÕES DE CONTROLE
 	controlaJogadro();
 	contrleTiro();
 	controlaBombas();
 }
frames = requestAnimationFrame(gameLoop);

}

function inicia(){
jogo = false;

//Iniciar variaveis
//inicia Tela
tamTelaH = window.innerHeight;
tamTelaW = window.innerWidth;
//inicia jogador
dirxJ = 0;
diryJ = 0;
pjX = tamTelaW/2;
pjY = tamTelaH/2;
velJ = 5;
velT = 5;
jog = document.getElementById("naveJog");
jog.style.top = pjY+"px";
jog.style.left = pjX+"px";
// inica Bombas
clearInterval(tmpCriaBombas);
contBombas = 10;
velB=3;
tmpCriaBombas=setInterval(criaBomba,1700);
// vida planeta 
vidaPlaneta = 300;

gameLoop();
}

window.addEventListener("load",inicia);
document.addEventListener("keydown",teclaBaixo);
document.addEventListener("keyup",teclaCima);