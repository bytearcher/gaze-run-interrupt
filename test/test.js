const gaze_run_interrupt = require("..");

gaze_run_interrupt("{src,test}/**/*.js", [
  {
    command: "sleep",
    args: ["1"],
  },
  { command: "tree" },
]);

setTimeout(() => {
  process.exit(0);
}, 5000);
