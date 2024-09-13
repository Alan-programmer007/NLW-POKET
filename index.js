const { select, input, checkbox } = require("@inquirer/prompts")

let mensagem = "Bem-vindo ao app de Metas";
let meta = {
    value: "Tomar 3L de água por dia",
    checked: false,
}

let metas = [meta]

const cadastrarMetas = async () => {
    const meta = await input({message: "Digite a meta:"})

    if (meta.length == 0) {
       mensagem = "A meta não pode ser vazia."
        return
    }

    metas.push(
        {
            value: meta,
            checked: false
        }
    )
    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    const repostas = await checkbox({
        message: "Use as setas para mudar de metas, o espaço para marcar e desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((met) => {
        met.checked = false
    })

    if (repostas.length == 0) {
        mensagem = "Nenhuma meta selecionada"
        return
    }

    repostas.forEach((reposta) => {
        const meta = metas.find((met) => {
            return met.value == reposta
        })
        meta.checked = true
    })
    mensagem = "Meta(s) marcas como concluída(s)"
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if(realizadas.length == 0){
        mensagem = "Não existem metas realizadas :("
        return
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })
    if (abertas.length == 0) {
        mensagem = "Não existem metas em aberto :)"
        return
    }
    await select({
        message: "Metas em aberto: " + metas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itemsADeletar = await checkbox({
        message: "Selecione um item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })
    if (itemsADeletar.length == 0) {
        mensagem = "Nenhum intem selecionado"
        return
    }
    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    mensagem = "Meta(s) deleta(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear

    if (mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    while (true) {
        mostrarMensagem()

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "litar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })


        switch (opcao) {
            case "cadastrar":
                await cadastrarMetas()
                console.log(metas)
                break;
            case "litar":
                await listarMetas()
                break;
            case "realizadas":
                await metasRealizadas()
            break
            case "abertas":
                await metasAbertas()
            break
            case "deletar":
                await deletarMetas()
            break
            case "sair":
                console.log("Até a próxima")
               return
            default:
                break;
        }
    }
}

start()