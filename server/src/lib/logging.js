

const getLoggingDate = () => {
  const d = new Date()
  return `${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
}

module.exports = {
  warning: message => console.log(`[Warning] - ${getLoggingDate()} >> ${message}`)
}
