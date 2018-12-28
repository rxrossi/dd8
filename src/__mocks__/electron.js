const focusedWindow = {
  close: jest.fn(),
  minimize: jest.fn(),
  maximize: jest.fn(),
  unmaximize: jest.fn(),
  isMaximized: jest.fn()
}

module.exports = {
  require: jest.fn(),
  match: jest.fn(),
  app: jest.fn(),
  remote: {
    BrowserWindow: {
      getFocusedWindow: () => focusedWindow
    }
  },
  dialog: jest.fn()
}
