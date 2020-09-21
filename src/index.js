const gaze = require("gaze");

const runner = require("./runner");

function run(commands) {
  runner.abort();
  commands.forEach((command) => {
    runner.run(command);
  });
}

function gaze_run_interrupt(pattern, commands) {
  gaze(pattern, function (err, watcher) {
    this.on("all", (event, filepath) => {
      run(commands);
    });
  });
  // instead of waiting for first change, also run command sequence immediately when starting
  run(commands);
}

module.exports = gaze_run_interrupt;
