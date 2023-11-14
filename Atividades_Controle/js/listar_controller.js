
function save_data_sessionstorage_redirect(data, registroId){
    sessionStorage.setItem("registro",JSON.stringify(data));
    sessionStorage.setItem("registroId", registroId);
    window.location.replace("registro.html");

}

function detalhar(link_detalhar){
    let registroId = link_detalhar.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.textContent;
    let url = "http://localhost:8080/registros/"+ registroId;
    fetch(url,{
        method:"GET"
    })
    .then(res => res.json())
    .then(data =>save_data_sessionstorage_redirect(data, registroId))
}

function delete_row(msg,row_id){
    console.log(msg);
    document.getElementById("myTable").deleteRow(row_id);
}

function excluir(link_excluir){
    if(confirm("Confirmar a exclusão do registro ?") == true){
        let first_td = link_excluir.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
        let row_id = first_td.parentNode.rowIndex;
        let registroId = first_td.textContent;
        let url = "http://localhost:8080/registros/"+ registroId;
        fetch(url,{
            method:"DELETE"
        })
        .then(msg => delete_row(msg,row_id))
    }

}

function listar (){
    let nomepesquisa = document.getElementById("nomepesquisa");
    sessionStorage.setItem("filtroPesquisa",nomepesquisa.value);
    let table_body = document.getElementById("table_body");
    let div_msg = document.getElementById("msg");
    div_msg.innerHTML = "";
    table_body.innerHTML = "";
    let url = "http://localhost:8080/registros/filter?atividade="+nomepesquisa.value;
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
            let cell_acoes = row.insertCell(6);
            cell_codigo.innerHTML = value.codigo;
            cell_supervisor.innerHTML = value.supervisor;
            cell_atividade.innerHTML = value.atividade;
            cell_responsavel.innerHTML = value.responsavel;
            cell_categoria.innerHTML = value.categoria;
            cell_prazo.innerHTML = value.prazo;
            cell_acoes.innerHTML = "<a class='link_editar' href='#' onclick='javascript:detalhar(this)'><img src ='img/editar.png' style='float:left; margin:5px; width:30px;' /> </a>" +
                                   "<a class='link_excluir' href='#'onclick='javascript:excluir(this)'><img src ='img/excluir.png' style='float:left; margin:5px; width:30px;' /> </a>";

        })
        if(data.length == 0 ){
            document.getElementById("table_head").style.display = "none";
            div_msg.innerHTML = 
            "<div class= 'alert alert-info'>"+
                "Nenhum registro encontrado!"+
            "</div>"
        }else{
            document.getElementById("table_head").style.display = "table-header-group";
        }
        
    
    
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

    listar();

    document.getElementById("btnconsultar").addEventListener("click",function(e){
        e.preventDefault();
        listar();
    });


    document.getElementById("btnlimpar").addEventListener("click",function(e){
        e.preventDefault();
        document.getElementById("table_head").style.display = "none";
        let table_body = document.getElementById("table_body");
        table_body.innerHTML = "";
        let div_msg = document.getElementById("msg");
        div_msg.innerHTML = "";
        document.getElementById("nomepesquisa").value = "";

    });

    document.getElementById("new_button").addEventListener("click",function(e){
        e.preventDefault();
        //sessionStorage.clear();
        window.location.replace("registro.html");
    });
    
}