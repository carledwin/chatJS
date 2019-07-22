
var novaMensagem = {};
var listaMensagensDoCredor = [];
var listaMensagensDoDevedor = [];

$(document).ready(function(){

    atualizaChats();
    loadListaDeMensagensCredor();
    loadListaDeMensagensDevedor();

  $('#btn-enviar-mensagem-credor').on('click', enviaMensagemParaCredor);
  $('#btn-enviar-mensagem-devedor').on('click', enviaMensagemParaDevedor);

  $('#btn-atualizar-mensagens-credor').on('click', loadListaDeMensagensCredor);
  $('#btn-atualizar-mensagens-devedor').on('click', loadListaDeMensagensDevedor);
});

function atualizaListasDeMensagens(){

    loadListaDeMensagensCredor();
    loadListaDeMensagensDevedor();
}

function atualizaChats(){

    setInterval(atualizaListasDeMensagens, 10000);
}


function loadListaDeMensagens(idLista, listaDeMensagens){

    var idListaLI = idLista + ' > li';

    $(idListaLI).remove();
   
    for(i = 0; i < listaDeMensagens.length; i++){

        createMensagem(idLista, listaDeMensagens[i]);
    }
}

function loadListaDeMensagensCredor(){

    loadListaDeMensagens('#lista-mensagens-credor', listaMensagensDoCredor);
}

function loadListaDeMensagensDevedor(){

    loadListaDeMensagens('#lista-mensagens-devedor', listaMensagensDoDevedor);
}

function enviaMensagemParaDevedor(){
   
   enviaMensagem("Devedor", "Credor", '#mensagemParaOCredor', '#lista-mensagens-devedor');
}

function enviaMensagemParaCredor(){

   enviaMensagem("Credor", "Devedor", '#mensagemParaODevedor', '#lista-mensagens-credor');
}

function enviaMensagem(de, para, idCampoMensagem, idListaMensagem){

    mensagem = getNovaMensagem();
    mensagem.De = de;
    mensagem.Para = para;
    mensagem.mensagem = $(idCampoMensagem).val();

    createMensagem(idListaMensagem, mensagem);

   listaMensagensDoCredor.push(mensagem);
   listaMensagensDoDevedor.push(mensagem);

   mensagem = getNovaMensagem();

   $(idCampoMensagem).val("");
}

function createMensagem(nomeDaLista, mensagem){

    var lista = $(nomeDaLista);

   var divDe = $('<div>').addClass("commenterImage").text(mensagem.De);
   
   var pMensagem = $('<p>').text(mensagem.mensagem); 
   
   var divMensagem = $('<div>').addClass("commentText");
   divMensagem.append(pMensagem);

   var spanDataMensagem = $('<span>').addClass("date sub-text").text(mensagem.dataDaMensagem);
   
   divMensagem.append(spanDataMensagem);
    
   var mensagem = $('<li>');
   mensagem.append(divDe);
   mensagem.append(divMensagem);
   
   lista.append(mensagem);
}

function getNovaMensagem(){

    return {"De":"", "Para":"", "dataDaMensagem": (new Date).toGMTString(), "mensagem": ""};
}

