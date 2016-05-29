
Watcher that interrupts the already launched actions in case of new changes.

Similar to [gaze-cli](https://www.npmjs.com/package/gaze-cli) except that this package interrupts ongoing actions if necessary, gaze-cli does not support that.

## Usage

Create a shell script that calls node with

    #!/usr/bin/env node
    
    var gaze_run_interrupt = require('gaze-run-interrupt');
    
    gaze_run_interrupt('{src,test}/**/*.ts', [
        { command: 'tsc' },
        { command: 'mocha', args: ['--reporter', 'min'], cwd: 'dist' }
    ]);

## Arguments 

### pattern(s)

The first argument accepts a pattern string

    gaze_run_interrupt('src/**/*.ts', ...

or and array of pattern strings

    gaze_run_interrupt(['src/**/*.ts', '*.sh'], ...

### commands

The second argument is an array of command specifier objects, where each object contains

- `command`: executable
- `args`: array of arguments passed to the executable (optional)
- `cwd`: working directory where the command is executed (optional)


