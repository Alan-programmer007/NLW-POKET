const { select, input, checkbox } = require("@inquirer/prompts")

let meta = {
    value: "Tomar 3L de água por dia",
    checked: false,
}

let metas = [meta]

const cadastrarMetas = async () => {
    const meta = await input({message: "Digite a meta:"})

    if (meta.length == 0) {
        console.log("A meta não pode ser vazia.")
        return
    }

    metas.push(
        {
            value: meta,
            checked: false
        }
    )
}

const listarMetas = async () => {
    const repostas = await checkbox({
        message: "Use as setas para mudar de metas, o espaço para marcar e desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })
    if (repostas.length == 0) {
        console.log("Nenhuma meta selecionada")
        return
    }

    metas.forEach((met) => {
        met.checked = false
    })

    repostas.forEach((reposta) => {
        const meta = metas.find((met) => {
            return met.value == reposta
        })
        meta.checked = true
    })
    console.log("Meta(s) marcas como concluída(s)")
}

const start = async () => {
    while (true) {


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
            case "sair":
                console.log("Até a próxima")
               return
            default:
                break;
        }
    }
}

start()