// El código va aquí -> 

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");


let alertValidaciones = document.getElementById("alertValidaciones");
let tablaListaCompras = document.getElementById("tablaListaCompras");

let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
//limpia toda la lista de compras incluyendo los campos

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");


let precio = 0;
let isValid=true; //sirve para la bandera
let contador = 0;
let costoTotal=0;
let totalEnProductos=0;

let datos = new Array();


//Lia roda la lista de compras incluyendo los campos
btnClear.addEventListener("click", function(event){

    event.preventDefault();//evita la funcionalidad por defaul del boton
    txtNombre.value=""; //limpiar campo
    txtNumber.value=""; //limpiar campo ; sustituye el valor de antes por uno vacio
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border=""; //limpiar campo
    txtNumber.style.border="";
    contador = 0;
    costoTotal=0;
    totalEnProductos=0;
    contadorProductos.innerText = contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText= `$ ${costoTotal.toFixed(2)}`;
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos",totalEnProductos);
    localStorage.setItem("costoTotal",costoTotal);
    localStorage.removeItem("datos");
    datos = new Array();//se establece en el boton de clear
    cuerpoTabla.innerHTML="";
    txtNombre.focus();
   
});

function validarCantidad(){
    if(txtNumber.value.length ==0){
        return false;
    }//que el valor sea si o si un numero mayor o igual que cero
        if(isNaN(txtNumber.value)){
            return false;
        }
        if(Number(txtNumber.value) <=0){
            return false;
        }

    
    
    return true;
}//validar cantidad

function getPrecio(){ //inventar un precio
        return parseInt((Math.random()*90)*100)/100; //para tres decimales es por 1000
}//getPrecio


btnAgregar.addEventListener("click", function (event) {
   
    event.preventDefault();
   
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border=""; //limpiar campo
    txtNumber.style.border="";
    isValid=true;//cada vez que precione el boton se convierte en true porque el boton lo puede poner falso, para refrescar la variable
    txtNombre.value = txtNombre.value.trim();
    txtNumber.value = txtNumber.value.trim();
    if(txtNombre.value.length<3){//si nombre es menor que 3 envia un arlert
        alertValidacionesTexto.insertAdjacentHTML("beforeend",`
        El <strong>Nombre </strong> no es correcto. </br>`);
        alertValidaciones.style.display="block";// remplazo del display: none por un display: block
        txtNombre.style.border="solid red thin";
        isValid=false;
    }

   
    if(! validarCantidad()){//SI NO ME IMPRIMES ESTA CANTIDAD

        alertValidacionesTexto.insertAdjacentHTML("beforeend",`
        La <strong>Cantidad </strong> no es correcta. </br>`);
        alertValidaciones.style.display="block";
        txtNumber.style.border="solid red thin";
        isValid=false;
    }

    //asignacion de precios si ya paso las validaciones debe de dar el precio al azar.
    //deficion de bandera es para saber si el valor es valido o no.
    if(isValid){
        contador++;
        precio=getPrecio();
                                    //agregar los renglones a la tabla
        row = `<tr>
        <td>${contador}</td>
        <td>${txtNombre.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>
        `;
        //elemento cadena donde se puede guardar
        // elemento = {propiedad:nombre propiedad}
        let elemento = `{"id": ${contador},
                        "nombre": "${txtNombre.value}", 
                        "cantidad": ${txtNumber.value},
                        "precio": ${precio}
    
    }`;
    //a txt se le pone comillas al nombre porque es string, con number no es necesario ya que es numeros

    //el let json lo convierte a cadena para meterlo a datos

        datos.push(JSON.parse(elemento));//metiendo el objeto en el arreglo
        console.log(datos);
        localStorage.setItem("datos",JSON.stringify(datos));//local storage solo guarda cadenas, datos es un arreglo de objetos que tiene todos los elementos de la tabla




        //guradar en local storage

        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        contadorProductos.innerText = contador;
        totalEnProductos+=parseFloat(txtNumber.value);
        productosTotal.innerText=totalEnProductos;
        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerText= `$ ${costoTotal.toFixed(2)}`;

        localStorage.setItem("contadorProductos", contador);
        localStorage.setItem("totalEnProductos",totalEnProductos);
        localStorage.setItem("costoTotal",costoTotal);
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();
    }//if isValid

});

//quiero que cuando la pagina carqueg termine  guardes esa infromacacion y me la asignes
//cuando termine de ejecutar la ventana haz la sisguente funcion

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("contadorProductos") != null){
        contador =this.localStorage.getItem("contadorProductos");
        totalEnProductos=this.localStorage.getItem("totalEnProductos");
        costoTotal=Number(this.localStorage.getItem("costoTotal"));

        contadorProductos.innerText = contador;
        productosTotal.innerText=totalEnProductos;
        precioTotal.innerText= `$ ${costoTotal.toFixed(2)}`;

    }//if !=null


    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) =>{                       /*r= funcion, cada registro lo pasas a r*/
          let row =  `<tr>
        <td>${r.id}</td>
        <td>${r.nombre}</td>
        <td>${r.cantidad}</td>
        <td>${r.precio}</td>
        </tr>`;

            cuerpoTabla.insertAdjacentHTML("beforeend",row)
        });//foreach
    }//datos !null

});//window load

