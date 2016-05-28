
Watcher that interrupts the already launched actions in case of new changes.

## Clean

usage:

    gaze_run_interrupt('src/**/*.ts', [
        { command: 'tsc' },
        { command: 'mocha', cwd: 'dist' }
    ]);

or multiple patterns

    gaze_run_interrupt(['src/**/*.ts', '*.sh'], [
        { command: 'tsc' },
        { command: 'mocha', cwd: 'dist' }
    ]);

