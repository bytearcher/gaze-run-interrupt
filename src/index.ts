
import child_process = require('child_process');
var gaze = require('gaze');
var chalk = require('chalk');

interface Command {
    command: string;
    args?: string[];
    cwd?: string;
}

function format(command: Command): string {
    var string = command.command;

    if (command.args) {
        string += " " + command.args.join(" ");
    }

    if (command.cwd) {
        string += " in " + command.cwd;
    }

    return string;
}

function info(...args: any[]) {
    console.log(chalk.yellow.apply(null, args));
}

function warn(...args: any[]) {
    console.log(chalk.red.apply(null, args));
}

module Runner {

    var scheduled: Command[] = [];
    var running: child_process.ChildProcess;

    export function abort() {
        // process exit handler will take on more work, so clear scheduled before killing
        scheduled = [];
        if (running) {
            running.kill('SIGINT');
        }
    }

    export function run(command: Command) {
        scheduled.push(command);
        assign();
    }

    function assign() {
        if (!running && scheduled.length > 0) {
            var command: Command = scheduled.shift();
            info(format(command));
            running = spawn(command);
            running.on('exit', (code: string, signal: string) => {
                // running process is finished at this point
                running = null;

                if (signal) {
                    // got interrupted, go on with taking on next task
                    info('Interrupted', format(command));
                    assign();
                } else if (code) {
                    // exited with error code, so clear queue and don't take on any further work
                    scheduled = [];
                    warn('Failed', format(command));
                } else {
                    // everything ok, take on next work
                    assign();
                }
            });
        }
    }

    function spawn(command: Command) {
        var options = {
            stdio: 'inherit',
            cwd: command.cwd
        };
        var args = command.args ? command.args : [];
        return child_process.spawn(command.command, args , options);
    }
}

function run(commands: Command[]) {
    Runner.abort();
    commands.forEach((command) => {
        Runner.run(command);
    });
}

function gaze_run_interrupt(pattern: string | string[], commands: Command[]) {
    gaze(pattern, function(err: any, watcher: any) {
        this.on('all', function(event: any, filepath: any) {
            run(commands);
        });
    });
    // instead of waiting for first change, also run command sequence immediately when starting
    run(commands);
}

export = gaze_run_interrupt;
