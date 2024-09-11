const { select } = require("@inquirer/prompts")

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
                console.log("Vamos cadastrar")
                break;
            case "litar":
                console.log("Vamos litar")
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