function format(command) {
  let string = command.command;

  if (command.args) {
    string += " " + command.args.join(" ");
  }

  if (command.cwd) {
    string += " in " + command.cwd;
  }

  return string;
}

module.exports = {
  format,
};
