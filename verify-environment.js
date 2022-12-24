const { exec } = require('child_process');


const ENVIRONMENT = [
    { name: 'docker', cmd: 'docker -v' },
    { name: 'git', cmd: 'git --version' },
    { name: 'npm', cmd: 'npm -v' },
    { name: 'nvm', cmd: 'nvm -v' },
    { name: 'node', cmd: 'node -v' },
];


const stopApp = (code) => {
    process.exit(code);
};

const runShellCommand = (commandInfo, shellCommand) => {
    exec(shellCommand, (error, stdout, stderr) => {
        if (error !== null) {
            process.stderr.write(stderr);
            stopApp(1);
        } else {
            process.stdout.write(`${commandInfo}: ${stdout}`);
        }
    });
};

const hasApp = (appInfo) => {
    runShellCommand(appInfo.name, appInfo.cmd);
};

const hasEnvironment = (environment) => {
    environment.forEach(hasApp);
};


hasEnvironment(ENVIRONMENT);
