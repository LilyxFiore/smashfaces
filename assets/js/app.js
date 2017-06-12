var intent = 0, contMex = 0, contLima = 0, points = 0;
var name, option, array;

/** asignado estados vacios al array de Peru y Mexico */
peru.forEach(function(e){ e.status = null; })
mexico.forEach(function(e){ e.status = null;})

/** Iniciando index.html con imagen aleatoria de sede Lima **/
array = peru;
option = $("option").val();
randomImage(array, option , array.length);

/** función que cambia imagen aleatoriamente **/
function randomImage(array, option , n){
  var numRandom = random(n);
  if(contMex == mexico.length || contLima == peru.length){  //si la cantidad de images mostradas es igual al tamaño del arreglo, termina el juego **/
    $("#inputName").val("");
    $("#result").text("Juego terminado");
  }

  else{ //cuando  el status del array es null
    if(array[numRandom].status == null){
      if(option == "mexico"){contMex++;}
      if(option == "peru"){contLima++;}

      array[numRandom].status="selected";
      $("#photo").fadeIn(1000).attr("src", "assets/img/"+ option +"/" + array[numRandom].image);
      $("#inputName").val("");
      $("#result").text("");

      name = array[numRandom].name;
      console.log("Contadores => Mex: "+ contMex + " - Lima: " + contLima);
    }

    else{ //cuando repite la imagen
      console.log("repeat image, change " + n);
      name = randomImage(array, option, n);
    }
    return name;
  }
}

/** evento que dispara cuando se cambia las opciones del  select **/
$("#sedes").change(function(){
  option = $(this).val();   // se obtiene el valor de las opciones
  intent = 0;
  if(option == "mexico"){
    array = mexico;
  }
  if(option == "peru"){
    array = peru;
  }
  name = randomImage(array, option, array.length);
});

/** evento al hacer click en el botón comprobar **/
$("#check").click(function(){
  var inputName = $("#inputName").val();
  if(inputName.length != ""){ // cuando el inputName no está vacío
    if(inputName.toLowerCase().trim() == name.toLowerCase()){  //si es correcto
      points +=5;
      changeImg(array, option, array.length, points, "Excelente Arcetaste");
    }

    else{  // si es incorrecto
      intent++;
      $("#result").text("Sigue Intentando ... Intento Nº "+intent);
    }

    if(intent == 5){ // cuando paso los 5 intentos
      points--;
      changeImg(array, option, array.length, points, "No te quedan más intentos");
    }
  }

  // cuando el inputName está vacío
  else{ alert("Ingrese un nombre");  }
});

/** función random que devuelve un número aleatorio hasta la longitud del array **/
function random(n){ return (Math.random()*n).toFixed(0); }

/** función que cambia de imagen si la respuesta es correcta o si se acabó el número de intentos **/
function changeImg(array, option , n, points, message){
  intent = 0;
  $("#result").text(message);
  $("#points").text(points);
  $("img").fadeOut(2300);
  setTimeout(function(){
    name = randomImage(array, option, n);
  },2000);
}
