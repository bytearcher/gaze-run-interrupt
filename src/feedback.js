const chalk = require("chalk");

function info(...args) {
  console.log(chalk.yellow.apply(null, args));
}

function warn(...args) {
  console.log(chalk.red.apply(null, args));
}

module.exports = {
  info,
  warn,
};
