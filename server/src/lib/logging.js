const chalk = require('chalk')

const getLoggingDate = () => {
  const d = new Date()
  return `${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
}

module.exports = {
  warning: message => console.log(chalk.yellow(`[Warning] - ${getLoggingDate()} >> ${message}`)),
  error: message => console.log(chalk.red(`[Error] - ${getLoggingDate()} >> ${message}`)),
  debug: message => console.log(chalk.green(`[Debug] - ${getLoggingDate()} >> ${message}`)),
}

