const start = () => {
    while (true) {
        let opcao = "sair"
        switch (opcao) {
            case "cadastrar":
                console.log("Vamos cadastrar")
                break;
            case "litar":
                console.log("Vamos litar")
                break;
            case "sair":
               return
            default:
                break;
        }
    }
}

start()