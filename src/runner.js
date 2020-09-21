const child_process = require("child_process");

const { format } = require("./format");
const { info, warn } = require("./feedback");

let scheduled = [];
let running;

function abort() {
  // process exit handler will take on more work, so clear scheduled before killing
  scheduled = [];
  if (running) {
    running.kill("SIGINT");
  }
}

function run(command) {
  scheduled.push(command);
  assign();
}

function assign() {
  if (!running && scheduled.length > 0) {
    const command = scheduled.shift();
    info(format(command));
    running = spawn(command);
    running.on("exit", (code, signal) => {
      // running process is finished at this point
      running = null;

      if (signal) {
        // got interrupted, go on with taking on next task
        info("Interrupted", format(command));
        assign();
      } else if (code) {
        // exited with error code, so clear queue and don't take on any further work
        scheduled = [];
        warn("Failed", format(command));
      } else {
        // everything ok, take on next work
        assign();
      }
    });
  }
}

function spawn(command) {
  const options = {
    stdio: "inherit",
    cwd: command.cwd,
  };
  const args = command.args ? command.args : [];
  return child_process.spawn(command.command, args, options);
}

module.exports = {
  abort,
  run,
};
