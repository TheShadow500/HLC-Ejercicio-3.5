const botones = ["botonAnadir", "botonSacar", "botonLongitud", "botonMostrar", "botonVolver1", "botonVolver2", "botonVolver3", "botonVolver4", "botonValidar"];

botones.forEach(botonId => {
    const boton = document.getElementById(botonId);
    boton.addEventListener("click", function(event){
        if(botonId.startsWith("botonVolver")){
            mostrarMain("botonVolver");
        }
        else{
            mostrarMain(botonId);
        }
    });
});

let pila;
inicializarPila();

// Inicializa a 20 espacios e introduce un * que indique que ese elemento del array no corresponde con datos.
function inicializarPila(){
    pila = Array(20).fill("*");
    console.log(pila);
}

// Función que recibe una pila y devuelve el número de elementos que tiene
function longitudPila(pila){
    let contador = 0;

    pila.forEach(valor => {
        if(valor != "*"){
            contador++;
        }
    });
    return contador;
}

// Función que recibe una pila y que devuelve si la pila está vacía, no tiene elementos.
function estaVaciaPila(pila){
    let contador = longitudPila(pila);

    if(contador == 0){
        return true;
    }
    else{
        return false;
    }
}

// Función que recibe una pila y que devuelve si la pila está llena.
function estaLLenaPila(pila){
    let contador = longitudPila(pila);
    if(contador == 20){
        return true;
    }
    else{
        return false;
    }
}

// función que recibe una cadena de caracteres y una pila, y añade la cadena a la pila, si no está llena. si esta llena muestra un mensaje de error.
function addPila(pila, cadena){

    if(document.getElementById("cadenaInsertar").value == ""){
        document.getElementById("mensajeAnadir").innerHTML = "EL CAMPO NO PUEDE QUEDAR VACÍO";
    }
    else{
        let contador = longitudPila(pila);

        if(contador < 20){
            let insertado = false;
            for(let i = 0; i < pila.length && !insertado; i++){
                if(pila[i] == "*"){
                    pila[i] = cadena;
                    insertado = true;
                }
            }
            document.getElementById("mensajeAnadir").innerHTML = "CADENA INSERTADA";
            document.getElementById("cadenaInsertar").value = "";
        }
        else{
            document.getElementById("mensajeAnadir").innerHTML = "LA PILA NO DISPONE DE HUECOS";
        }
    }
}

// Función que recibe una pila y devuelve el último elemento añadido y lo borra de la pila. Si la pila está vacía muestra un mensaje de error.
function sacardelaPila(pila){
    let estado = estaVaciaPila(pila);

    if(estado){
        document.getElementById("sacarPila").innerHTML = "LA PILA ESTA VACÍA";
    }
    else{
        let encontrado = false;
        for(let i = pila.length - 1; i >= 0 && !encontrado; i--){
            if(pila[i] != "*"){
                document.getElementById("sacarPila").innerHTML = "VALOR EXTRAÍDO Y ELIMINADO: " + pila[i];
                pila[i] = "*";
                encontrado = true;
            }
        }
    }
}

function escribirPila(pila){
    document.getElementById("mostrarPila").innerHTML = "";
    document.getElementById("mostrarPila").innerHTML = "CONTENIDO DE LA PILA:<br>";
    pila.forEach(valor => {
        if(valor != "*"){
            document.getElementById("mostrarPila").innerHTML += "<br>" + valor;
        }
    });
}

// Funcion que muestra el menu segun la opción elegida y llama a su correspondiente función
function mostrarMain(botonPulsado){
    document.getElementById("menu").style.display = "none";
    document.getElementById("anadir").style.display = "none";
    document.getElementById("sacar").style.display = "none";
    document.getElementById("longitud").style.display = "none";
    document.getElementById("mostrar").style.display = "none";

    if(botonPulsado == "botonAnadir"){
        document.getElementById("anadir").style.display = "flex";
        document.getElementById("mensajeAnadir").innerHTML = "";
    }
    else if(botonPulsado == "botonSacar"){
        document.getElementById("sacar").style.display = "flex";
        sacardelaPila(pila);
    }
    else if(botonPulsado == "botonLongitud"){
        document.getElementById("longitud").style.display = "flex";
        let contador = longitudPila(pila);
        if(contador == 0){
            document.getElementById("longitudPila").innerHTML = "LA PILA ESTA VACÍA";
        }
        else{
            document.getElementById("longitudPila").innerHTML = "LA PILA TIENE " + contador + " ELEMENTOS"
        }
    }
    else if(botonPulsado == "botonMostrar"){
        document.getElementById("mostrar").style.display = "flex";
        escribirPila(pila);
    }
    else if(botonPulsado == "botonValidar"){
        document.getElementById("anadir").style.display = "flex";
        addPila(pila, document.getElementById("cadenaInsertar").value);
        document.getElementById("cadenaInsertar").value = "";
    }
    else if(botonPulsado == "botonVolver"){
        document.getElementById("menu").style.display = "flex";
    }
}