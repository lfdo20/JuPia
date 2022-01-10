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
let tabEntrevista = document.getElementById("tabEntrevista");
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
		entrevista: false,
		atendimentoObs: ""
	},
	familia: {
		famParentesco: "",
		familiaObs: ""
	},
	saude: {
		dor: "",
		doenca: "",
		machucado: "",
		remedio: "",
		semDDMCheck: false,
		gesauCheck: false,
		saudeObs: ""
	},
	convivencia: {
		posneg: "",
		positivaMas: "",
		negativaObs: "",
		gesegCheck: false,
		convivenciaObs: ""
	},
	visita: {
		recebida: "",
		visitaquem: "",
		fatoVisita: "",
		contatosimnao: "",
		contatomeio: "",
		contatoquem: "",
		visitaObs: ""
	},
	escolar: {
	
	},
	tema: {
		semana: "",
		temaObs: ""
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
const evolucaoDados = ``;
let evolucaoSaude = [0,'','','',''];
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
		for(i = 0; i < pm.ctthide.length; i++) {
    		pm.ctthide[i].style.display = pm.display[1];
  		}
	}
}

function checkCampos() {
	//campos check
	document.getElementById("nome").value = adolescente.dados.nome;
	document.getElementById("modulo").value = adolescente.dados.modulo;
	document.getElementById("turno").value = adolescente.atendimento.turno;
	
	if (adolescente.atendimento.primeiroAtmCheck == true)
		document.getElementById("primeiroAtmCheck").checked = true;

	//saude check
	if(adolescente.saude.semDDMCheck == true) {
		document.getElementById("semDDMCheck").checked = true;
		document.getElementById("dor").disabled = true;
		document.getElementById("doenca").disabled = true;
		document.getElementById("machucado").disabled = true;
	}

	if (adolescente.saude.gesauCheck == true)
	document.getElementById("gesauCheck").checked = true;

	document.getElementById("dor").value = adolescente.saude.dor;
	document.getElementById("doenca").value = adolescente.saude.doenca;
	document.getElementById("machucado").value = adolescente.saude.machucado;
	document.getElementById("remedio").value = adolescente.saude.remedio;
	document.getElementById("saudeObs").value = adolescente.saude.saudeObs;

	//tema check
	document.getElementById("temas").value = adolescente.tema.semana;
	document.getElementById("temaObs").value = adolescente.tema.temaObs;

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
	document.getElementById("convivenciaObs").value = adolescente.convivencia.convivenciaObs;

	//visita check
	if (adolescente.visita.recebida == "sim") {
		document.getElementById("simVisita").checked = true;
		document.getElementById("visitaquem").value = adolescente.visita.visitaquem;
		document.getElementById("fatoVisita").value = adolescente.visita.fatoVisita;

	} 
	else {
		document.getElementById("naoVisita").checked = true;
		document.getElementById("contatoquem").value = adolescente.visita.contatoquem;
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
	document.getElementById("familiaObs").value = adolescente.familia.familiaObs;

	//entrevista
	document.getElementById("entrevistaCheck").checked = adolescente.atendimento.entrevista;
	document.getElementById("atendimentoObs").value = adolescente.atendimento.atendimentoObs;
}

function resultadoUpdate(){
	adolescentes.a = adolescente;
	resultadoEvolucao =
	`${evolucao[0]}
	
	<p>${evolucao[1]}</p>
	
	<p>${evolucao[2]}</p>
	
	<p>${evolucao[3]}</p>
	
	<p>${evolucao[4]}</p>
	
	<p>${evolucao[5]}</p>

	<p>${evolucao[6]}</p>`;
	
	document.getElementById("resultadosBq").innerHTML = resultadoEvolucao;
	let temp = document.createElement("div");
	temp.innerHTML = resultadoEvolucao;
	copyTextToClipboard(temp.innerText);
}

if (window.caches) {
	
	caches.has(CACHE_NAME).then(cache => {
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
						let converted = res;
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
	document.getElementById("entrevista").style.display = "none";
	document.getElementById("converter").style.display = "flex";
});

tabEvolucao.addEventListener('click', function(){
	document.getElementById("evolucao").style.display = "inline-flex";
	document.getElementById("converter").style.display = "none";
	document.getElementById("entrevista").style.display = "none";
});

tabEntrevista.addEventListener('click', function(){
	document.getElementById("evolucao").style.display = "none";
	document.getElementById("converter").style.display = "none";
	document.getElementById("entrevista").style.display = "inline-flex";
});

document.getElementById("textoResultados").innerHTML = evolucaoDados;

function atualiza(dado,campo,valor="") {
	if (dado=="dados" && campo[1] !== "" || campo[1]=="primeiroAtmCheck") {
		if (campo[1]=="primeiroAtmCheck"){
			adolescente.atendimento[campo[1]] = valor;
		}
		adolescente[campo[0]][campo[1]] = valor;
		evolucao[0] = `${adolescente.dados.nome} recebeu atendimento técnico na ${adolescente.atendimento.turno} de hoje.${document.getElementById("primeiroAtmCheck").checked ? `<p>Foi orientado quanto às regras de convivência da Unidade, a dinâmica de ligações, recebimento de pertences, visitas e audiências, bem como quanto à importância do correto uso da máscara em todos os espaços da UIPSS, para evitar a propagação da COVID-19.</p>` : ""}`;
	}

	if (dado=="familia" && campo[1] !== "") {
		adolescente[campo[0]][campo[1]] = valor;
		evolucao[4] = `Viabilizei contato telefônico entre o adolescente e ${adolescente.familia.famParentesco}. ${adolescente.familia.familiaObs}`;
	}
	
	if (dado=="visita" && campo[1] !== "") {
		let obs;
		let naoVisita = '';
		let simVisita = '';
		if (campo.classList[1] == "recebida"){
			adolescente[campo.classList[0]][campo.classList[1]] = valor;
		}
		else if (campo.classList[1] == "contatomeio") {
			adolescente[campo.classList[0]][campo.classList[1]] = valor;
			
		}
		else if (campo.classList[1] == "contatosimnao"){
			adolescente[campo.classList[0]][campo.classList[1]] = valor;
		}
		else {
			adolescente[campo.classList[0]][campo.id] = valor;
		}
		obs = ` ${adolescente.visita.visitaObs}`;
		if (document.getElementById("simVisita").checked) {
			simVisita = `Conta que recebeu visita ${adolescente.visita.visitaquem} no último fim de semana.`;
			adolescente.visita.contatomeio = "";
			adolescente.visita.contatosimnao = "";
			adolescente.visita.contatoquem = "";
			document.getElementById("contatoquem").value = "";
			
			if (document.getElementById("fatoVisita").value !== "")
			simVisita += ` Menciona que ${adolescente.visita.fatoVisita}.`
			
			evolucao[3] = simVisita + obs;
		}

		if (document.getElementById("naoVisita").checked) {
			document.getElementById("visitaquem").value = "";
			document.getElementById("fatoVisita").value = "";
			adolescente.visita.fatoVisita = "";
			adolescente.visita.visitaquem = "";
			evolucao[3] = `Conta que não recebeu visita no último fim de semana`;

			function contatosn(value) {
				if (adolescente.visita.contatoquem !== "") {
					switch (value) {
							case "s":
								naoVisita += ` conversou com ${adolescente.visita.contatoquem}`;
								break;
							case "n":
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
				naoVisita = ` e que`;
				naoVisita += ` não conseguiu contato com a família`;
				contatosn("n");
			} 
			else if (document.getElementById("contatoSimCheck").checked) {
				naoVisita = `, mas que`;
				contatosn("s");
			}
			evolucao[3] += naoVisita + `.` + obs;
		}
		
	}
	
	if (dado=="convivencia"){
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
			evolucao[2] = `Declara que a convivência com os pares no Módulo ${adolescente.dados.modulo} não está saudável, uma vez que ${adolescente.convivencia.negativaObs}.${ document.getElementById("gesegCheck").checked ? `<br>Enviarei email à GESEG informando a situação apresentada.` : ""}`;
		}
		evolucao[2] += ` ${adolescente.convivencia.convivenciaObs}`;
	}
	
	if (dado=="saude") {
		//console.log(dado,campo[0], campo[1],valor);
		if (valor === true){
			adolescente.saude[campo[1]] = valor;
		} 
		else if (valor === false) {
			adolescente.saude[campo[1]] = valor;
			const ifCondition = ["semDDMCheck","gesauCheck"];
			if (!ifCondition.includes(campo[1])){
				adolescente[campo[0]][campo[1].match(/(^[a-z]+)/g)] = "";
				document.getElementById(campo[1].match(/(^[a-z]+)/g)).value = "";
			}
			
		}
		adolescente[campo[0]][campo[1]] = valor;
		
		let {dor, doenca, machucado, remedio} = adolescente.saude;
		const saudeEmpty = [dor, doenca, machucado, remedio];
		
		const evSaude =(n)=>{
			evolucaoSaude[0] = saudeEmpty.findIndex(element => element !== '') + 1;
			if (saudeEmpty.filter(item => item).length == 1 || evolucaoSaude[0] == n) {
				evolucaoSaude[0] = n;
				return `Quanto à saúde, afirma que `;
			}
			else {
				return ` Afirma que `;
			}
		}
		evolucaoSaude[1] = dor !== '' ? evSaude('1') + `${adolescente.saude.dor}.` : ``;
		evolucaoSaude[2] = doenca !== '' ? evSaude('2') + `${adolescente.saude.doenca}.` : ``;
		evolucaoSaude[3] = machucado !== '' ? evSaude('3') + `${adolescente.saude.machucado}.` : ``;
		evolucaoSaude[4] = remedio !== '' ? ` Afirma que ` + `${adolescente.saude.remedio}.` : ``;

		evolucao[1] = evolucaoSaude.slice(1,5).join('') + ` ${adolescente.saude.saudeObs}`;
		
		if (document.getElementById("semDDMCheck").checked) {
			adolescente.saude.dor ='';
			adolescente.saude.doenca = '';
			adolescente.saude.machucado='';
			document.getElementById("dor").value = '';
			document.getElementById("dor").disabled = true;
			document.getElementById("doenca").value = '';
			document.getElementById("doenca").disabled = true;
			document.getElementById("machucado").value = '';
			document.getElementById("machucado").disabled = true;
			evolucao[1] = `Quanto à saúde, nega dor, doença ou machucado.` +
				evolucaoSaude.slice(1,5).join('') + ` ${adolescente.saude.saudeObs}`;
		}
		else {
			document.getElementById("dor").disabled = false;
			document.getElementById("doenca").disabled = false;
			document.getElementById("machucado").disabled = false;
		}

		if (document.getElementById("gesauCheck").checked) 
			evolucao[1] += `<br>Encaminharei o adolescente à GESAU para avaliação do quadro de saúde apontado.`;
	}

	if (dado == "entrevistaCheck") {
		if (campo.id==="atendimentoObs") {
			adolescente.atendimento[campo.id] = valor.value;
		}
		adolescente.atendimento.entrevista = document.getElementById("entrevistaCheck").checked;
		if (document.getElementById("entrevistaCheck").checked) {
			evolucao[6] = `${adolescente.atendimento.atendimentoObs}` + `<br><br>Realizei entrevista 
			que viabilizará construção de relatório avaliativo.
			Os dados da entrevista encontram-se no SIPIA, 
			nos campos próprios para tais. ${assinaturaEvolucao}`
		} else {
			evolucao[6] = `${adolescente.atendimento.atendimentoObs}` + `${assinaturaEvolucao}`;
		}
	}

	if (dado == "tema") {
		let evolucaoTema;
		if (campo.id==="temaObs") {
			adolescente.tema[campo.id] = valor.value;
		} else {
			adolescente.tema.semana = valor.options[valor.selectedIndex].value;
		}
			switch (adolescente.tema.semana) {
				case 's1':
					evolucaoTema = `Trabalhamos os subtemas da Semana 1, do Plano de Atendimento Socioeducativo da equipe 
					técnica do Módulo 04, "Conhecendo seus direitos, entendendo a internação provisória e diagnosticando 
					suas demandas mais urgentes."`;
					break;
				case 's2': 
					evolucaoTema = `Trabalhamos os subtemas da Semana 2, do Plano de Atendimento Socioeducativo da equipe 
					técnica do Módulo 04, "Seu lugar na Família."`;
					break;
				case 's3':
					evolucaoTema = `Trabalhamos os subtemas da Semana 3, do Plano de Atendimento Socioeducativo da equipe 
					técnica do Módulo 04, "Seu lugar na escola, o poder transformador da educação e o despertar para a 
					profissionalização e o ingresso no mercado de trabalho."`;
					break;
				case 's4':
					evolucaoTema = `Trabalhamos os subtemas da Semana 4, do Plano de Atendimento Socioeducativo da equipe 
					técnica do Módulo 04, "Seu lugar na vizinhança, comunidade, sociedade e aprendendo sobre empatia."`;
					break;
				case 's5':
					evolucaoTema = `Trabalhamos os subtemas da Semana 5, do Plano de Atendimento Socioeducativo da equipe 
					técnica do Módulo 04, "Amor próprio, saúde e projeto de vida."`;
					break;
				default:
					evolucaoTema = '';
					break;
			}
		evolucao[5] = evolucaoTema + ` ${adolescente.tema.temaObs}`;
	}
	cacheSave();
	resultadoUpdate();
}

//DADOS
document.getElementById("formDados").addEventListener('change', function(e){
	e.target.type == "checkbox" ? atualiza("dados",[e.target.className,e.target.id], e.target.checked):
	atualiza("dados",[e.target.className,e.target.id], e.target.value);
});

// SAUDE
document.getElementById("formSaude").addEventListener('change', function(e){
	e.target.type == "checkbox" ? atualiza("saude",[e.target.className,e.target.id], e.target.checked):
	atualiza("saude",[e.target.className,e.target.id], e.target.value);
});

// CONVIVENCIA
document.getElementById("formConv").addEventListener('change', function(e){
	atualiza("convivencia", e.target, e.target.value);
});

//TEMA DA SEMANA
document.getElementById("formTema").addEventListener('change', function(e){
	atualiza("tema", e.target, e.target);
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
	atualiza("entrevistaCheck", e.target, e.target);
});

buttonLimpadados.addEventListener('click', function(){
	cacheLimpa();
});

});