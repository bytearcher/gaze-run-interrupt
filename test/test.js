const gaze_run_interrupt = require("..");

gaze_run_interrupt("{src,test}/**/*.js", [
  {
    command: "sleep",
    args: ["1"],
  },
  { command: "tree" },
  { command: "false" },
]);

setTimeout(() => {
  process.exit(0);
}, 5000);
