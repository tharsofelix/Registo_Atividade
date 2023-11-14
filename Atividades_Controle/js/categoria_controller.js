
function save_data_sessionstorage_redirect(data, registroId){
    sessionStorage.setItem("registro",JSON.stringify(data));
    sessionStorage.setItem("registroId", registroId);
    window.location.replace("registro.html");

}

function detalhar(link_detalhar){
    let registroId = link_detalhar.parentNode.previousSibling.previousSibling.textContent;
    let url = "http://localhost:8080/registros/"+ registroId;
    fetch(url,{
        method:"GET"
    })
    .then(res => res.json())
    .then(data =>save_data_sessionstorage_redirect(data, registroId))
}


function listar (){
    let nomepesquisa = document.getElementById("nomepesquisa");
    sessionStorage.setItem("filtroPesquisa",nomepesquisa.value);
    let table_body = document.getElementById("table_body");
    let div_msg = document.getElementById("msg");
    div_msg.innerHTML = "";
    table_body.innerHTML = "";
    let url = "http://localhost:8080/registros/categoria?categoria="+nomepesquisa.value;
    fetch(url,{
        method:"GET"
    })
    .then(res => res.json())
    .then(data => {
        Object.entries(data).forEach(([key,value]) => {
            let row = table_body.insertRow(-1); 
            let cell_codigo = row.insertCell(0);
            let cell_supervisor = row.insertCell(1);
            let cell_atividade = row.insertCell(2);
            let cell_responsavel = row.insertCell(3);
            let cell_categoria = row.insertCell(4);
            let cell_prazo = row.insertCell(5);
            cell_codigo.innerHTML = value.codigo;
            cell_supervisor.innerHTML = value.supervisor;
            cell_atividade.innerHTML = value.atividade;
            cell_responsavel.innerHTML = value.responsavel;
            cell_categoria.innerHTML = value.categoria;
            cell_prazo.innerHTML = value.prazo;
        })
        document.getElementById("table_head").style.display = "table-header-group";
    })

}
window.onload = function(){
    let load_type = window.performance.getEntriesByType("navigation")[0].type;
    if(sessionStorage.filtroPesquisa){
        if(load_type == "navigate"){
            document.getElementById("nomepesquisa").value = sessionStorage.filtroPesquisa;
            
        }else{ // reload
            sessionStorage.removeItem("filtroPesquisa");
        }
    }


    document.getElementById("btnconsultar").addEventListener("click",function(e){
        e.preventDefault();
        listar();
    });

    
}