const fs = require('fs')
const path = require('path')

const logError = err => err && console.error(err);

function getTheDate() {
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  today = new Date()
  var dd = today.getDate()
  var mm = monthNames[today.getMonth()].toUpperCase()
  var hh = today.getHours()
  var mins = today.getMinutes()
  var ss = today.getSeconds()

  const yyyy = today.getFullYear()
  if(dd<10){
    dd='0'+dd;
  }
  if(ss<10){
    ss='0'+ss;
  }
  console.log('PHOTOBOOTH.'+dd+mm+yyyy+'.'+hh+'.'+mins+'.'+ss);
  return today = 'PHOTOBOOTH.'+dd+mm+yyyy+'.'+hh+'.'+mins+'.'+ss
}

exports.save = (picturesPath, contents) => {
  const base64Data = contents.replace(/^data:image\/png;base64,/, '')
  var fileName = getTheDate()
  console.log(fileName);
  fs.writeFile(path.join(picturesPath, `${fileName}.png`), base64Data, { encoding: 'base64' }, logError)
}

exports.getPicturesDir = app => {
  return path.join(app.getPath('pictures'), 'photobooth')
}

exports.mkdir = picturesPath => {
  fs.stat(picturesPath, (err, stats) => {
    if (err && err.code != 'ENOENT')
      return logError(err)
    else if (err || !stats.isDirectory())
      fs.mkdir(picturesPath, logError)
  })
}
