const html = document.querySelector('html');
const focoBT = document.querySelector('.app__card-button--foco');
const curtoBT = document.querySelector('.app__card-button--curto');
const longoBT = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const StartPauseBotao = document.querySelector('#start-pause');
const beep = new Audio('./sons/beep.mp3');
const pause = new Audio('./sons/pause.mp3');
const play = new Audio('./sons/play.wav');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const temporizador = document.getElementById('timer');
const pauseIcon = new Image();
        pauseIcon.src = "./imagens/pause.png";
const imagemBt = document.querySelector(".app__card-primary-butto-icon");


let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
       musica.play() 
    } else {
        musica.pause();
    }
})

focoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBT.classList.add('active');
})

curtoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBT.classList.add('active');
})

longoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBT.classList.add('active');
})

function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function (botao){
        botao.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto){
        case 'foco':
            titulo.innerHTML = `<strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `que tal dar uma respirada? <strong class="app__title-strong">faça uma pausa curta</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superficie. <strong class="app__title-strong">faça uma pausa longa.</strong>`;
            break;
            default:
                break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        beep.play();
        alert('Tempo finalizado.');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

StartPauseBotao.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if (intervaloId){
        zerar();
        return;
    }
   play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    imagemBt.src = pauseIcon.src;

}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    imagemBt.src = ("./imagens/play_arrow.png");
    intervaloId = null;
    pause.play();
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();