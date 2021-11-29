//const { response } = require("express");

document.addEventListener("DOMContentLoaded", function(event){

let frase;
let fraseConvertida;
let myInputa = document.getElementById("inputa");
let myOutputa = document.getElementById("outputa");
let myCaracsDepois = document.getElementById("caracsDepois");
let myCaracsAntes = document.getElementById("caracsAntes");
let buttonT1 = document.getElementById("T1");
let buttonT2 = document.getElementById("T2");
let buttonLimpa = document.getElementById("Limpa");
let buttonLimpadados = document.getElementById('limpadados');
let tabConverter = document.getElementById("tabConverter");
let tabEvolucao = document.getElementById("tabEvolucao");
const CACHE_NAME = 'JupiaData';

const adolescenteBase = {
	dados: {
		nome: "",
		idade: "",
		modulo: ""
	},
	atendimento: {
		turno: "",
		primeiroAtmCheck: false,
		entrevista: false
	},
	familia: {
		famParentesco: "",
		famObs: ""
	},
	saude: {
		dor: "",
		doenca: "",
		machucado: "",
		remedio: "",
		semDDMCheck: false,
		gesauCheck: false
	},
	convivencia: {
		posneg: "",
		positivaMas: "",
		negativaObs: "",
		gesegCheck: false
	},
	visita: {
		recebida: "",
		visitaquem: "",
		fatoVisita: "",
		contatosimnao: "",
		contatomeio: "",
		contatoquem: ""
	},
	escolar: {
	
	},
	tema: {
		semana: ""
	},
	infracao: {
	
	},
	ocorrencias : {
	
	},
	entrevista : {
		impressoes:{},
		atoInfracional: {},
		familia: {},
		trabalho: {},
		escola: {},
		drogas:{},
		parecer: {}
	}
};
let adolescente = adolescenteBase;
let adolescentes = {
	a: adolescente
}
const evolucaoDados = `${adolescente.dados.nome} recebeu atendimento técnico na ${adolescente.atendimento.turno} de hoje.`;
let assinaturaEvolucao = `<p>Juliana Ferreira, Pedagoga, Mat.: 217961-X, UIPSS.</p>`;
const evolucaoBase = [evolucaoDados,"","","","","", assinaturaEvolucao];
let evolucao = evolucaoBase;
let resultadoEvolucao;

function visitaOpen(pm){
	if (document.getElementById(pm.visita[0]).checked) {
		for(i = 0; i < pm.ctthide.length; i++) {
    		pm.ctthide[i].style.display = pm.display[0];
  		}
	}
	if (document.getElementById(pm.visita[1]).checked) {
		//console.log(elem[0].style.visibility);
		for(i = 0; i < pm.ctthide.length; i++) {
    		pm.ctthide[i].style.display = pm.display[1];
  		}
	}
}

function checkCampos() {
	//campos check
	console.log(document.getElementById("nome").type);

	document.getElementById("nome").value = adolescente.dados.nome;
	document.getElementById("modulo").value = adolescente.dados.modulo;
	document.getElementById("turno").value = adolescente.atendimento.turno;
	
	adolescente.atendimento.primeiroAtmCheck == true ? 
	document.getElementById("primeiroAtmCheck").checked = true : console.log();

	//saude check
	adolescente.saude.semDDMCheck == true ? 
	document.getElementById("semDDMCheck").checked = true : console.log();

	adolescente.saude.dorCheck == true ? 
	document.getElementById("dorCheck").checked = true : console.log();

	adolescente.saude.doencaCheck == true ? 
	document.getElementById("doencaCheck").checked = true : console.log();

	adolescente.saude.machucadoCheck == true ? 
	document.getElementById("machucadoCheck").checked = true : console.log();

	adolescente.saude.remedioCheck == true ? 
	document.getElementById("remedioCheck").checked = true : console.log();

	adolescente.saude.gesauCheck == true ? 
	document.getElementById("gesauCheck").checked = true : console.log();
	

	document.getElementById("dor").value = adolescente.saude.dor;
	document.getElementById("doenca").value = adolescente.saude.doenca;
	document.getElementById("machucado").value = adolescente.saude.machucado;
	document.getElementById("remedio").value = adolescente.saude.remedio;

	//tema check
	//adolescente.tema.semana
	document.getElementById("temas").value = adolescente.tema.semana;
	
	//visita check
	adolescente.visita.recebida == "sim" ? 
	document.getElementById("simVisita").checked = true : document.getElementById("naoVisita").checked = true;
	document.getElementById("visitaquem").value = adolescente.visita.visitaquem;
	document.getElementById("fatoVisita").value = adolescente.visita.fatoVisita;
	if (adolescente.visita.recebida == "nao" ) {
		visitaOpen({
			ctthide: document.getElementsByClassName("ctthide"),
			visita:['simVisita','naoVisita'],
			display:['none',"block"]
		});
		document.getElementById("contatoNaoCheck").checked = adolescente.visita.contatosimnao;
		if (adolescente.visita.contatosimnao) {
			
		}
	}
	
	//convivencia check
	if (adolescente.convivencia.posneg == "positiva") {
		document.getElementById("convivenciapos").checked = true;
		document.getElementById("positivaMas").value = adolescente.convivencia.positivaMas;
		document.getElementById("gesegCheck").disabled = true;
		document.getElementById("geseglbl").style.color = "#aaa";
	}
	else{
		document.getElementById("gesegCheck").checked = adolescente.convivencia.gesegCheck;
		document.getElementById("convivencianeg").checked = true;
		document.getElementById("negativaObs").value = adolescente.convivencia.negativaObs;
	}
	
	//visita check
	if (adolescente.visita.recebida == "sim") {
		document.getElementById("simVisita").checked = true;
		document.getElementById("visitaquem").value = adolescente.visita.visitaquem;
		document.getElementById("fatoVisita").value = adolescente.visita.fatoVisita;

	} 
	else {
		document.getElementById("naoVisita").checked = true;
		document.getElementById("contatoquem").value = adolescente.visita.contatoquem;
		console.log(adolescente.visita.contatomeio);
		adolescente.visita.contatomeio == "chamada de vídeo" ? document.getElementById("contatomeiovideo").checked = true :
		document.getElementById("contatomeiotel").checked = true;
		if (adolescente.visita.contatosimnao == "nao") {
			document.getElementById("contatoNaoCheck").checked = true;
		}
		else{
			document.getElementById("contatoSimCheck").checked = true;
		}
	}
	
	//ligação
	document.getElementById("famParentesco").value = adolescente.familia.famParentesco;
	document.getElementById("famObs").value = adolescente.familia.famObs;

	//entrevista
	document.getElementById("entrevistaCheck").checked = adolescente.atendimento.entrevista;
}

function resultadoUpdate(){
	//console.log("teste", evolucao)
	adolescentes.a = adolescente;
	resultadoEvolucao =
	`${evolucao[0]}
	
	<p>${evolucao[1]}</p>
	
	<p>${evolucao[2]}</p>
	
	<p>${evolucao[3]}</p>
	
	<p>${evolucao[4]}</p>
	
	<p>${evolucao[5]}</p>

	<p>${evolucao[6]}</p>`;
	//console.log(resultadoEvolucao);
	document.getElementById("resultadosBq").innerHTML = resultadoEvolucao;
	let temp = document.createElement("div");
	temp.innerHTML = resultadoEvolucao;
	copyTextToClipboard(temp.innerText);
}

if (window.caches) {
	
	caches.has(CACHE_NAME).then(cache => {
		//console.log('teste', cache);
		if (cache === false) {
			console.log("Não tem cache.");
			caches.open(CACHE_NAME).then(cache => {
				cache.add('/data.json').then(() => {
					console.log("Cache 1 criado.");
				});
				cache.add('/dataevo.json').then(() => {
					console.log("Cache 2 criado.");
				});
			});
		}

		if (cache === true) {
			console.log("Tem cache. Abrindo Cache.");
			caches.open(CACHE_NAME).then(cache => {
				cache.match('/data.json').then( res => {
					res.json().then( res => {
						let converted = res;
						adolescente = converted.a;
						console.log('Cache 1 aberto.');
					});
				});	
			});
			caches.open(CACHE_NAME).then(cache => {
				cache.match('/dataevo.json').then( res => {
					res.json().then( res => {
						let converted  = res;
						console.log('Cache 2 aberto.');
						evolucao = converted;
						resultadoUpdate();
						checkCampos();
					});
				});
			});
		}
	});
}

function cacheSave(){
	if ('caches' in window) {
		caches.open(CACHE_NAME).then((cache) => {
			console.log("Cache encontrado.");
			cache.add('/data.json').then( () => {  
				cache.put('data.json', new Response(JSON.stringify(adolescentes)));	
				console.log("Cache 1 Salvo.")});
			cache.add('/dataevo.json').then( () => {  
				cache.put('dataevo.json', new Response(JSON.stringify(evolucao)));
				console.log("Cache 2 Salvo.")});
	   })
  }
}

function cacheLimpa(){
	adolescente = adolescenteBase;
	evolucao = evolucaoBase;
	caches.delete(CACHE_NAME);
	window.location.reload();
}

function copyTextToClipboard(text){
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Resultado copiado!');
  }, function(err) {
  });
}

myInputa.addEventListener('keyup', function(){
  frase = myInputa.value;
  myCaracsAntes.value = frase.length;
});

buttonT1.addEventListener('click', function(){
  frase = myInputa.value;
  fraseConvertida = frase.replace(/\spara\s/g, ' p/ ');
  fraseConvertida = fraseConvertida.replace(/\spra\s/g, ' p/');
  fraseConvertida = fraseConvertida.replace(/\scom\s/g, ' c/');
  fraseConvertida = fraseConvertida.replace(/\sDona\s/g, ' Dª ');
  fraseConvertida = fraseConvertida.replace(/(\“)|(\”)/g, '"');
  myOutputa.value = fraseConvertida;
  myCaracsDepois.value = fraseConvertida.length;
  copyTextToClipboard(fraseConvertida);
});

buttonT2.addEventListener('click', function(){
  fraseConvertida = fraseConvertida.replace(/\.\n\s+|\.\n/g, '.\r\n\n');
  //fraseConvertida = fraseConvertida.replace(/\.\s/g, '.');
  fraseConvertida = fraseConvertida.replace(/\,\s/g, ',');
  myOutputa.value = fraseConvertida;
  myCaracsDepois.value = fraseConvertida.length;
  copyTextToClipboard(fraseConvertida);
});


buttonLimpa.addEventListener('click', function(){
  myInputa.value = '';
  myOutputa.value = '';
});



tabConverter.addEventListener('click', function(){
	document.getElementById("evolucao").style.display = "none";
  document.getElementById("converter").style.display = "flex";
});

tabEvolucao.addEventListener('click', function(){
  document.getElementById("evolucao").style.display = "inline-flex";
  document.getElementById("converter").style.display = "none";
});

document.getElementById("textoResultados").innerHTML = evolucaoDados;

/* 
function check(dados) {
	let list = [nome, turno, famTel, famObs];
}
*/

function atualiza(dado,campo,valor) {
	if (dado=="dados" && campo[1] !== "" || campo[1]=="primeiroAtmCheck") {
		if (campo[1]=="primeiroAtmCheck"){
			adolescente.atendimento[campo[1]] = valor;
		}
		//console.log(adolescente);
		adolescente[campo[0]][campo[1]] = valor;
		evolucao[0] = `${adolescente.dados.nome} recebeu atendimento técnico na ${adolescente.atendimento.turno} de hoje.${document.getElementById("primeiroAtmCheck").checked ? `<p>Foi orientado quanto às regras de convivência da Unidade, a dinâmica de ligações, recebimento de pertences, visitas e audiências, bem como quanto à importância do correto uso da máscara em todos os espaços da UIPSS, para evitar a propagação da COVID-19.</p>` : ""}`;
	}
	if (dado=="familia" && campo[1] !== "") {
		adolescente[campo[0]][campo[1]] = valor;
		evolucao[4] = `Viabilizei contato telefônico entre o adolescente e ${adolescente.familia.famParentesco}. ${adolescente.familia.famObs}`;
	}
	
	if (dado=="visita" && campo[1] !== "") {
		//console.log('a',campo.id, campo.classList[0], campo.classList[1]);
		//[e.target.classList,e.target.id]
		let naoVisita = '';
		if (campo.classList[1] == "recebida"){
			adolescente[campo.classList[0]][campo.classList[1]] = valor;
		}
		else if (campo.classList[1] == "contatomeio") {
			//console.log(dado,campo[0][0], campo[1],valor);
			adolescente[campo.classList[0]][campo.classList[1]] = valor;
			
		}
		else if (campo.classList[1] == "contatosimnao"){
			adolescente[campo.classList[0]][campo.classList[1]] = valor;
		}
		else {
			adolescente[campo.classList[0]][campo.id] = valor;
			console.log('c',valor);
		}

		if (document.getElementById("simVisita").checked) {
			evolucao[3] = `Conta que recebeu visita ${adolescente.visita.visitaquem} no último fim de semana.`;
			adolescente.visita.contatomeio = "";
			adolescente.visita.contatosimnao = "";
			adolescente.visita.contatoquem = "";
			document.getElementById("contatoquem").value = "";
		}

		if (document.getElementById("fatoVisita").value !== "") {
			evolucao[3] += ` Menciona que ${adolescente.visita.fatoVisita}.`
		}

		if (document.getElementById("naoVisita").checked) {
			document.getElementById("visitaquem").value = "";
			document.getElementById("fatoVisita").value = "";
			adolescente.visita.fatoVisita = "";
			adolescente.visita.visitaquem = "";
			evolucao[3] = `Conta que não recebeu visita no último fim de semana`;

			function contatosn(value) {
				if (adolescente.visita.contatoquem !== "") {
					console.log('s', value);
					switch (value) {
							
							case "s":
								console.log('t', value);
								naoVisita += ` conversou com ${adolescente.visita.contatoquem}`;
								break;
							case "n":
								console.log('f', value);
								naoVisita += `, pois ${adolescente.visita.contatoquem}`;
								break;
						}
				}
				if (adolescente.visita.contatomeio !=='') {
				switch (adolescente.visita.contatosimnao){
					case "sim" :
						naoVisita += ` por meio de ${adolescente.visita.contatomeio}`;
						break;
					case "nao":
						naoVisita += ` não atendeu a ${adolescente.visita.contatomeio}`;
						break;
				}
			}
			}

			if (document.getElementById("contatoNaoCheck").checked) {
				naoVisita = `, e que`;
				naoVisita += ` não conseguiu contato com a família`;
				contatosn("n");
				
			} 
			else if (document.getElementById("contatoSimCheck").checked) {
				console.log('aa');
				naoVisita = `, e que`;
				contatosn("s");
			}
			evolucao[3] += naoVisita + `.`;
		}
	}
	
	if (dado=="convivencia"){
		console.log(campo);
		if (campo.name == "convivencia") {
			adolescente.convivencia.posneg = valor;
		}
		else if ( campo.name =="gesegCheck") {
			adolescente.convivencia.gesegCheck = document.getElementById("gesegCheck").checked;
		}
		else {
			adolescente[campo.className][campo.id] = valor;
		}

		if (adolescente.convivencia.posneg == "positiva"){
			document.getElementById("gesegCheck").disabled = true;
			document.getElementById("geseglbl").style.color = "#aaa";
			document.getElementById("negativaObs").value ="";
			adolescente.convivencia.negativaObs = "";
			document.getElementById("gesegCheck").checked = false;
			evolucao[2] = `Relata que a convivência com os pares no Módulo ${adolescente.dados.modulo}
			encontra-se saudável. Nega que esteja sendo ameaçado, oprimido, desrespeitado ou incomodado pelos 
			pares${adolescente.convivencia.positivaMas == "" ? `` :`, `}${adolescente.convivencia.positivaMas}.`;
		}

		if (adolescente.convivencia.posneg == "negativa"){
			document.getElementById("gesegCheck").disabled = false;
			document.getElementById("geseglbl").style.color = "";
			document.getElementById("positivaMas").value ="";
			adolescente.convivencia.positivaMas = "";
			evolucao[2] = `Declara que a convivência com os pares no Módulo ${adolescente.dados.modulo} não está saudável, uma vez que ${adolescente.convivencia.negativaObs}.${ document.getElementById("gesegCheck").checked ? `<br>Enviarei email à GESEG sobre o quadro apresentado.` : ""}`;
		}
		//e.target.name == "convivencia" ? adolescente.convivencia.posneg = e.target.value :
		//atualiza("convivencia",[e.target.className,e.target.id], e.target.value);
	}
		
	if (dado=="saude") {
		console.log(dado,campo[0][0], campo[1],valor);
		if (valor == true){
			adolescente.saude[campo[1]] = valor;
		} else if (valor == false) {
			adolescente.saude[campo[1]] = valor;
			const ifCondition = ["semDDMCheck","gesauCheck" ];
			if (!ifCondition.includes(campo[1])) 
				adolescente[campo[0]][campo[1].match(/(^[a-z]+)/g)] = "";
				document.getElementById(campo[1].match(/(^[a-z]+)/g)).value = "";
		}
		adolescente[campo[0]][campo[1]] = valor;
		
		let evolucaoSaude = ``;
		let saudeOk = `Nega dor, doença ou machucado.`;
				
		document.getElementById("semDDMCheck").checked ?
			evolucaoSaude += `${saudeOk}`: evolucaoSaude += ``;

		if (document.getElementById("dorCheck").checked) {
			evolucaoSaude += ` Afirma que ${adolescente.saude.dor}.`;
		}
		if (document.getElementById("doencaCheck").checked) {
			evolucaoSaude += ` Afirma que ${adolescente.saude.doenca}.`;
		}
		if (document.getElementById("machucadoCheck").checked) {
			evolucaoSaude += ` Afirma que ${adolescente.saude.machucado}.`;
		}
		if (document.getElementById("remedioCheck").checked) {
			evolucaoSaude += ` Expõe que toma ${adolescente.saude.remedio}.`;
		}
		if (document.getElementById("gesauCheck").checked) {
			evolucaoSaude += `<br>Enviarei email à GESAU sobre o quadro de saúde informado.`;
		}
		evolucao[1] = evolucaoSaude;
	}
	
	if (dado == "entrevistaCheck"){
		adolescente.atendimento.entrevista = document.getElementById("entrevistaCheck").checked;
	
		evolucao[6] = `${document.getElementById("entrevistaCheck").checked ?
		`Realizei entrevista que viabilizará construção de relatório avaliativo.
		Os dados da entrevista encontram-se no SIPIA, nos campos próprios para tais. ${assinaturaEvolucao}` :
		 `${assinaturaEvolucao}`}`;
	}

	if (dado == "tema") {
		adolescente.tema.semana = valor;
		switch (adolescente.tema.semana) {
			case 's1':
				evolucao[5] = `Trabalhamos os subtemas da Semana 1, do Plano de Atendimento Socioeducativo da equipe 
				técnica do Módulo 04, "Conhecendo seus direitos, entendendo a internação provisória e diagnosticando 
				suas demandas mais urgentes."`;
				break;
			case 's2': 
				evolucao[5] = `Trabalhamos os subtemas da Semana 2, do Plano de Atendimento Socioeducativo da equipe 
				técnica do Módulo 04, "Seu lugar na Família."`;
				break;
			case 's3':
				evolucao[5] = `Trabalhamos os subtemas da Semana 3, do Plano de Atendimento Socioeducativo da equipe 
				técnica do Módulo 04, "Seu lugar na escola, o poder transformador da educação e o despertar para a 
				profissionalização e o ingresso no mercado de trabalho."`;
				break;
			case 's4':
				evolucao[5] = `Trabalhamos os subtemas da Semana 4, do Plano de Atendimento Socioeducativo da equipe 
				técnica do Módulo 04, "Seu lugar na vizinhança, comunidade, sociedade e aprendendo sobre empatia."`;
				break;
			case 's5':
				evolucao[5] = `Trabalhamos os subtemas da Semana 5, do Plano de Atendimento Socioeducativo da equipe 
				técnica do Módulo 04, "Amor próprio, saúde e projeto de vida."`;
				break;
			default:
				evolucao[5] = '';
				break;
		}
	}
	cacheSave();
	resultadoUpdate();
}

//DADOS
document.getElementById("formDados").addEventListener('change', function(e){
	e.target.type == "checkbox" ? atualiza("dados",[e.target.className,e.target.id], e.target.checked):
	atualiza("dados",[e.target.className,e.target.id], e.target.value);
	//console.log(adolescente.dados, evolucaoBase,e.target.id, e.target.value);
});

// SAUDE
document.getElementById("formSaude").addEventListener('change', function(e){
	e.target.type == "checkbox" ? atualiza("saude",[e.target.className,e.target.id], e.target.checked):
	atualiza("saude",[e.target.className,e.target.id], e.target.value);
});

// CONVIVENCIA
document.getElementById("formConv").addEventListener('change', function(e){
	//atualiza("convivencia",[e.target.className,e.target.id], e.target.value);
	//console.log(adolescente.convivencia, e.target.name, e.target.id, e.target.value);
	atualiza("convivencia", e.target, e.target.value);
});

//TEMA DA SEMANA
document.getElementById("formTema").addEventListener('change', function(e){
	console.log(e.target.options[e.target.selectedIndex].value);
	atualiza("tema", e.target, e.target.options[e.target.selectedIndex].value);
});



// VISITA
document.getElementById("formVisita").addEventListener('change', function(e){
	visitaOpen({
		ctthide: document.getElementsByClassName("ctthide"),
		visita:['simVisita','naoVisita'],
		display:['none',"block"]
	});
	atualiza("visita", e.target, e.target.value); 
});

// FAMILIA
document.getElementById("formFamilia").addEventListener('keyup', function(e){
	atualiza("familia",[e.target.className,e.target.id], e.target.value);
});

// ENTREVISTA
document.getElementById("formEntrevista").addEventListener('change', function(e){
	atualiza("entrevistaCheck",[e.target.className,e.target.id], e.target.value);
});

buttonLimpadados.addEventListener('click', function(){
	cacheLimpa();
});

});