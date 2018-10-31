// Randerizar usuarios
var params = new URLSearchParams(window.location.search);

// referencia JQUERY


let divUsuarios= $("#divUsuarios");


 function randerizarUsuarios(personas){

    console.log('>??????????');
    let html="";
    html+='<li>';
    html+='<a href="javascript:void(0)" class="active">Chat de <span>'+params.get("sala")+'</span></a>';
    html+='</li>';

    console.log("Personas : "+personas.length);
    for (let index = 0; index < personas.length; index++) {
 
        html+='<li>';
        html+='<a data-id='+personas[index].id+' href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+personas[index].nombre+' <small class="text-success">online</small></span></a>';
        html+='</li>';
        
    }
    divUsuarios.html(html);
}

