let tipoDeCodificador = 'Mensagem Inversa';

function handleSelecaoCodificador(event) {
    tipoDeCodificador = event.target.value;
    console.log("Selecionado: " + tipoDeCodificador);
}

function getMsg() {
    return document.getElementById('msgInput').value
}

function processaMensagem(modo) {
    let resultado = '';
    let mensagem = getMsg();
    switch (tipoDeCodificador) {
        case "Mensagem Inversa":
            if (modo === 'criptografar') {
                resultado = codificaMensagemInversa(mensagem);
            } else if (modo === 'descriptografar') {
                resultado = decodificaMensagemInversa(mensagem);
            }
            break;
        case "Morse":
            if (modo === 'criptografar') {
                resultado = codificaMensagemMorse(mensagem);
            } else if (modo === 'descriptografar') {
                resultado = decodificaMensagemMorse(mensagem);
            }
            break;
        case "Binario":
            if (modo === 'criptografar') {
                resultado = codificaMensagemBinario(mensagem);
            } else if (modo === 'descriptografar') {
                resultado = decodificaMensagemBinario(mensagem);
            }
            break;
        default:
            console.log("Tipo de codificador inválido");
            return;
    }
    document.getElementById('msgInput').value = ''
    document.getElementById('mensagemCodificada').value = resultado;
    console.log("Resultado: " + resultado);
    resultado = '';
}

function copiarTexto() {
    const mensagemCodificadaInput = document.getElementById('mensagemCodificada');
    navigator.clipboard.writeText(mensagemCodificadaInput.value).then(() => {
        alert('Texto copiado: ' + mensagemCodificadaInput.value);
    }).catch(err => {
        console.error('Erro ao copiar o texto: ', err);
    });
    
    document.getElementById('mensagemCodificada').value = ''
}

function codificaMensagemInversa(mensagem) {
    return mensagem.split('').reverse().join('');
}

function decodificaMensagemInversa(mensagem) {
    return mensagem.split('').reverse().join('');
}

const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    ' ': '/', '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

function codificaMensagemMorse(mensagem) {
    return mensagem.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
}

function decodificaMensagemMorse(mensagem) {
    const morseToChar = Object.entries(morseCode).reduce((obj, [key, value]) => {
        obj[value] = key;
        return obj;
    }, {});
    return mensagem.split(' ').map(code => morseToChar[code] || code).join('');
}

function codificaMensagemBinario(mensagem) {
    return mensagem.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

function decodificaMensagemBinario(mensagem) {
    return mensagem.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}