const fs = require('fs')
const path = require('path')
const shell = require('electron').shell
const spawn = require('child_process').spawn

const logError = err => err && console.error(err);

let images = []

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
  return today = 'PHOTOBOOTH.'+dd+mm+yyyy+'.'+hh+'.'+mins+'.'+ss
}

exports.save = (picturesPath, contents, done) => {
  const base64Data = contents.replace(/^data:image\/png;base64,/, '')
  var theDate = getTheDate()
  var fileName = path.join(picturesPath, `${theDate}.png`)
  console.log(fileName);
  fs.writeFile(fileName, base64Data, { encoding: 'base64' }, err => {
    if (err) return logError(err)

    done(null, fileName)
  })
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

exports.rm = (index, done) => {
  fs.unlink(images[index], err => {
    if (err) return logError(err)

    images.splice(index, 1)
    done()
  })
}

exports.cache = imgPath => {
  images = images.concat([imgPath])
  return images
}

exports.getFromCache = index => {
  return images[index]
}

const openCmds = {
  darwin: 'open',
  win32: 'explorer',
  linux: 'nautilus'
}

exports.openDir = dirPath => {
  const cmd = openCmds[process.platform]
  if (cmd)
    spawn(cmd, [ dirPath ])
  else
    shell.showItemInFolder(dirPath)
 }
