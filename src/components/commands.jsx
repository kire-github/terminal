export default function execute(line) {
    const argv = line.split(" ");
    console.log(argv);

    switch (argv[0]) {
        case "help":
            return [`Here's a list of available commands:`, `  help         |  The most important command`, `  echo <arg>   |  Displays <arg> in the terminal`,  `  clear        |  Clears the terminal`];

        case "echo":
            const echo = argv.slice(1).join(" ");
            if (echo.toLowerCase() === "hello there") {
                return [`General Kenobi...`];
            } else {
                return [`${echo}`];
            }        
            
        default:
            return [`${line} is not recognized as a command`, `For a list of available commands type 'help'`];
    }
}