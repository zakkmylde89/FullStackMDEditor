import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be endabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    //TODO
  })
} catch (error) {
  console.error(error)
}
