
// Modules
const {app, ipcMain} = require('electron')
const mainWindow = require('./mainWindow')
const readItem = require('./readItem')
const updater = require('./updater')

// Enable Electron-Reload
// require('electron-reload')(__dirname)

// Listen for new read item
ipcMain.on('new-item', (e, itemURL) => {
  // console.log(itemURL);
  // setTimeout(() => {
  //   e.sender.send('new-item-success', 'new read item')
  // }, 2000)

  // Get read item with readItem module
  readItem( itemURL, (item) => {
    // console.log(item);
    
    // Send to renderer
    e.sender.send('new-item-success', item)
  })
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', mainWindow.createWindow)
app.on('ready', () => {

  // Create main window
  mainWindow.createWindow()

  // Check for update after x seconds
  setTimeout( updater.check, 2000)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) mainWindow.createWindow()
})
