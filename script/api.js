const msgErro = document.querySelector(".erro")
const numPersonagem = document.getElementById("fnum")
const botaoDescobrir = document.getElementById("fbotao")
const imgDefault = document.getElementById("imgDefault")
const nome = document.querySelector(".nome")
const statusPersonagem = document.querySelector(".status")
const especie = document.querySelector(".especie")
const tipo = document.querySelector(".tipo")
const genero = document.querySelector(".genero")
const dataCriacao = document.querySelector(".dataCriacao")

async function apiKey(numPersonagem) {
    const result = await fetch(`https://rickandmortyapi.com/api/character/${numPersonagem}`)
    return result.json()
}

botaoDescobrir.addEventListener('click', () => {
    limparInformacoes()
    core()
})

window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        limparInformacoes()
        core()
    }
})

async function core() {
    try {
        const personagem = await apiKey(numPersonagem.value)
        validaDados(personagem)
        return defineValores(personagem)
    } catch(erro) {
        console.error("O personagem não foi encontrado!!")
        msgErro.textContent = erro
    }
}

function defineValores(personagem) {
    nome.textContent = personagem.name
    statusPersonagem.textContent = personagem.status
    especie.textContent = personagem.species
    tipo.textContent = personagem.type
    genero.textContent = personagem.gender
    dataCriacao.textContent = personagem.created
    imgDefault.setAttribute("src", personagem.image)
}

function limparInformacoes() {
    nome.textContent = ""
    statusPersonagem.textContent = ""
    especie.textContent = ""
    tipo.textContent = ""
    genero.textContent = ""
    dataCriacao.textContent = ""
    imgDefault.setAttribute("src", "imagem/default_image.png")
}

function validaDados(personagem) {
    if (personagem.name === undefined || personagem.image === undefined) {
        throw new Error("Não foi possível encontrar o personagem!")
    }
}