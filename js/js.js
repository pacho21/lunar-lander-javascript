var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;

/*variables propias*/
var hayCombustible=true;
var end=false;
var game=false;


//al cargar por completo la página...
window.onload = function(){
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	
	//encender motor al apretar space y apagar al levantar.
	document.onkeydown = pulsarKey;
	document.onkeyup = motorOff;
	
	document.getElementById("alien").onclick=function(){
		if(game==false){
			game=true;
			start();
		}else{
			stop();
			restart();
		}
	}
	document.getElementById("power").onclick=function(){
		if(game==true){
			motorOn();
		}
	}
	//hacer click en jugar para empezar la partida y Empezar a mover nave
		document.getElementById("game").onclick = function(){
		game=true;
		start();
	}	
document.getElementById("reiniciar").onclick = function(){
		restart();
	}

	
}

//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	if(game){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=Math.round(v);
	y +=v*dt;
	document.getElementById("altura").innerHTML=Math.round(y);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<75 && y>0){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();
		end=true;
		winOrLose();
	}
	}
}
function motorOn(){
	if (hayCombustible && !end && game){
	a=-g;
	document.getElementById("ship").src='img/nave-fire.png';
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
	}
}
function motorOff(){
	a=g;
	if(!end){
	document.getElementById("ship").src='img/nave.png';
	clearInterval(timerFuel);
	timerFuel=null;
	}
}
function actualizarFuel(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
	if(hayCombustible&& !end && game){
		fuel-=0.1;
		if (fuel <= 0) {
			hayCombustible = false;
			fuel = 0;
			motorOff();
		}
	}
	document.getElementById("fuel").innerHTML=Math.round(fuel);	

}

function winOrLose() {
		document.getElementById("altura").innerHTML = 0.00.toFixed(2);	
		var puntuacion=Math.round(v*fuel);
			if (puntuacion<0){
				document.getElementById("mensaje").innerHTML="Has perdido";
 				document.getElementById("mensaje").style.display = "block";
			}else{
			if (v > 5) {
			document.getElementById("ship").src = "img/explozion.png";
					document.getElementById("mensaje").innerHTML="Has perdido";
				document.getElementById("mensaje").style.display = "block";
		} else {
			document.getElementById("mensaje").innerHTML = "Has Ganado, tu puntuaci\u00F3n es: "+puntuacion+" estrellas";
			document.getElementById("mensaje").style.display = "block";
		}
	}
	stop();
}

//metodo para reiniciar la partida
function restart() {
	y = 10; 
	v = 0;
	g = 1.622;
	a = g;
	dt = 0.016683;
	timer=null;
	timerFuel=null;
	fuel=100;
	hayCombustible=true;
	end=false;
	game=false;
	document.getElementById("fuel").innerHTML = '100';
	document.getElementById("velocidad").innerHTML = '100';
	document.getElementById("altura").innerHTML='70';
	document.getElementById("ship").src="img/nave.png";
	document.getElementById("mensaje").style.display = "none";
	document.getElementById("nave").style.top = y+"%"; 
	stop();
}

function pulsarKey() {
	var key = event.which || event.keyCode;
	switch (key) {
		case 32: //SPACE --> motorOn
			if(game=true){
			motorOn();
		}
	}
}