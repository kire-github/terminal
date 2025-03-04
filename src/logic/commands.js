export function execute(line) {
    const argv = line.split(" ");
    console.log(argv);

    switch (argv[0]) {
        case "help":
            return [
                `Here's a list of available commands:`,
                `  help         |  ???`,
                `  echo <arg>   |  Displays <arg> in the terminal`,
                `  banner       |  Displays the starting banner`,
                `  clear        |  Clears the terminal`
            ];

        case "echo":
            const echo = argv.slice(1).join(" ");
            if (echo.toLowerCase() === "hello there") {
                return [`General Kenobi...`];
            } else {
                return [`${echo}`];
            }
        
        case "banner":
            return banner();
            
        default:
            return [
                `${line} is not recognized as a command`,
                `For a list of available commands type 'help'`
            ];
    }
}

export function banner() {
    return [
        `__ __|                      _)                |`,
        `   |   _ \\   __|  __ \`__ \\   |  __ \\    _\` |  |`,
        `   |   __/  |     |   |   |  |  |   |  (   |  |`,
        `  _| \\___| _|    _|  _|  _| _| _|  _| \\__,_| _| `,
        `Made by @kire-github, 2025`,
        `For a list of available commands type 'help'`
    ];
}