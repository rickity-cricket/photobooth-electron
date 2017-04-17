const electron = require('electron')
const { app, BrowserWindow, globalShortcut } = electron

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 725,
    height: 1200,
    resizeable: false
  })

  mainWindow.loadURL(`file://${__dirname}/capture.html`)

  globalShortcut.register('CmdOrCtrl+Q', _ => { app.quit() })
})


app.on('close', _ => {
  mainWindow = null
})
