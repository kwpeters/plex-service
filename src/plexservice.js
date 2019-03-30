const service = require("os-service");
const path = require("path");
const cp = require("child_process");


const SERVICE_NAME = "Plex Media Server Service";


if (process.argv[2] === "--add") {
    service.add (SERVICE_NAME, {programArgs: ["--run"]}, function(error){
        if (error) {
            console.trace(error);
        }
    });
}
else if (process.argv[2] === "--remove") {
    service.remove (SERVICE_NAME, function(error){
        if (error) {
            console.trace(error);
        }
    });
} else if (process.argv[2] === "--run") {
    service.run (function () {
        service.stop (0);
    });

    main();
} else {
    console.log(usage());
}


function usage() {

    return `
This program adds, removes and runs a Windows service that runs Plex Media Server.

node src/plexservice.js --add
    Registers the service. (Must be run as an administrator)
    
node src/plexservice.js --remove
    Removes the service. (Must be run as an administrator)
    
node src/plexservice.js --run
    Runs the service.
`;
}


function main()
{
    const exePath = path.join("C:", "Program Files (x86)", "Plex", "Plex Media Server", "Plex Media Server.exe");
    const childProc = cp.spawn(exePath, ["-noninteractive"], {detached: true, windowsHide: true});

    childProc.on("error", (err) => {
        console.error("Child process errored:", err);
    });


    childProc.on("close", (exitCode) => {
        if (exitCode === 0) {
            console.log("Child process exited normally.");
        }
        else {
            console.error(`Child process exited with error code ${exitCode}.`);
        }
    });


}
