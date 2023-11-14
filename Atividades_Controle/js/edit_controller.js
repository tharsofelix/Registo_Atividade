
function load_form_from_session_storage(myForm){
    let registroObject = JSON.parse(sessionStorage.registro);
    myForm.supervisor.value = registroObject.supervisor;
    myForm.atividade.value = registroObject.atividade;
    myForm.responsavel.value = registroObject.responsavel;
    myForm.categoria.value = registroObject.categoria;
    myForm.temOrcamento.value = registroObject.temOrcamento;
    myForm.prazo.value = registroObject.prazo;
    myForm.orcamento.value = String(registroObject.orcamento).replace(".",",");
    myForm.dataInicio.value = registroObject.dataInicio;
    myForm.dataConclusao.value = registroObject.dataConclusao;
    myForm.descricao.value = registroObject.descricao;
    sessionStorage.removeItem("registro");
    

}
function prepare_jason_to_request (myForm){
    const formData = new FormData(myForm);
    const dataJson = {}
    formData.forEach((value,key) =>(dataJson[key] = value));
    console.log(dataJson);
    dataJson["orcamento"] = dataJson["orcamento"].replace(",",".");
    if(dataJson["temOrcamento"] == 'N'){
        dataJson["orcamento"] = 0  
        }
    return JSON.stringify(dataJson);
}


function incluir_registro(myForm){
    let div_msg = document.getElementById("msg");
    fetch("http://localhost:8080/registros",{
        headers:{
            "content-Type": "application/json"
        },
        body:prepare_jason_to_request(myForm),
            method:"POST"
    })
    .then(res =>{
        if(res.status == 201){
            div_msg.innerHTML = 
            "<div class='alert alert-success' role='alert'>"+
                "registro Cadastrado com sucesso."+
                "</div>"
            myForm.reset();
        }else{
            div_msg.innerHTML = 
            "<div class='alert alert-danger' role='alert>"+
                "Erro ao incluir o registro"+ res +
                "</div>"
        }
    })
    .catch(err => {
        div_msg.innerHTML =
        "<div class='alert alert-danger' role='alert>"+
            "Erro ao incluir o registro"+ err +
        "</div>"
    })
}

function alterar_registro(myForm){
    let registroId = sessionStorage.registroId;
    let div_msg = document.getElementById("msg");
    let url = "http://localhost:8080/registros/"+ registroId;

    fetch(url,{
        headers:{
            "content-Type": "application/json"
        },
        body:prepare_jason_to_request(myForm),
            method:"PUT"
    })
    .then(res =>{
        if(res.status == 200){
            div_msg.innerHTML = 
            "<div class='alert alert-success' role='alert'>"+
                "registro alterado com sucesso."+
                "</div>"
            myForm.reset();
        }else{
            div_msg.innerHTML = 
            "<div class='alert alert-danger' role='alert>"+
                "Erro ao alterar o registro"+ res +
                "</div>"
        }
    })
    .catch(err => {
        div_msg.innerHTML =
        "<div class='alert alert-danger' role='alert>"+
            "Erro ao alterar o registro"+ err +
        "</div>"
    })
}

window.onload = function(){
    let myForm = document.getElementById("idform");

    if(!sessionStorage.getItem("registro")){
        myForm.addEventListener("submit",function(e){
            e.preventDefault();
            incluir_registro(myForm);
        });
    }else{
        load_form_from_session_storage(myForm);
        myForm.addEventListener("submit",function(e){
            e.preventDefault();
            alterar_registro(myForm);
            
        });
    }

    document.getElementById("btnvoltar").addEventListener("click",function(e){
        e.preventDefault;
        window.location.replace("listaratividades.html");
    });
    


}