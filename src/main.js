const electron = require('electron')
const images = require('./images')
const local = require('electron-localshortcut')
const { app, BrowserWindow, ipcMain: ipc, shell } = electron

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 725,
    height: 1200,
    resizeable: false
  })

  mainWindow.loadURL(`file://${__dirname}/capture.html`)

  images.mkdir(images.getPicturesDir(app))

  local.register(mainWindow,'CmdOrCtrl+Q', _ => {
    app.quit()
  })

  mainWindow.on('closed', _ => {
    mainWindow = null
  })
})

ipc.on('image-captured', (evt, contents) => {
  images.save(images.getPicturesDir(app), contents, (err, imgPath) => {
    images.cache(imgPath)
  })
})

ipc.on('image-remove', (evt, index) => {
  images.rm(index, _ => {
    evt.sender.send('image-removed', index)
  })
})

global.openPhoto = function(imageToOpen) {
  shell.showItemInFolder(imageToOpen)
}
