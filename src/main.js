const electron = require('electron')
const images = require('./images')
const menuTemplate = require('./menu')
const local = require('electron-localshortcut')
const { app, BrowserWindow, ipcMain: ipc, shell, Menu } = electron

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 725,
    height: 1200,
    resizeable: false
  })

  mainWindow.loadURL(`file://${__dirname}/capture.html`)
  // mainWindow.openDevTools()

  images.mkdir(images.getPicturesDir(app))

  // local.register(mainWindow,'CmdOrCtrl+Q', _ => {
  //   app.quit()
  // })

  mainWindow.on('closed', _ => {
    mainWindow = null
  })

  const menuContents = Menu.buildFromTemplate(menuTemplate(mainWindow))
  Menu.setApplicationMenu(menuContents)
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

ipc.on('image-show', (evt, imageToOpen) => {
  shell.showItemInFolder(imageToOpen)
})

// global.openPhoto = function(imageToOpen) {
//   shell.showItemInFolder(imageToOpen)
// }
