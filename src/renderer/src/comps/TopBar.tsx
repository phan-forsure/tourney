import { Copy, Square, X, Minus } from 'lucide-react'
import { useEffect, useState } from 'react'
import coDoctor from '@renderer/assets/images/co-doctor.png'

export default function TopBar(): React.JSX.Element {
  const [max, setMax] = useState(false)
  useEffect(() => {
    // Listen for maximize/unmaximize events from the main process
    window.ipcRenderer.on('window-maximized', () => setMax(true))
    window.ipcRenderer.on('window-unmaximized', () => setMax(false))

    return () => {
      window.ipcRenderer.removeAllListeners('window-maximized')
      window.ipcRenderer.removeAllListeners('window-unmaximized')
    }
  }, [])

  const handleMinimize = (): void => {
    window.ipcRenderer.send('window-minimize')
  }

  const handleMaximize = (): void => {
    window.ipcRenderer.send('window-maximize')
  }

  const handleClose = (): void => {
    window.ipcRenderer.send('window-close')
  }

  return (
    <div className="top-bar relative flex justify-between items-center top-0 h-[5%]">
      <div className="flex items-center gap-2">
        <img src={coDoctor} alt="Co Doctor Logo" className="h-6 w-6 object-contain" />
        <span className="font-semibold text-green-700 text-lg">Co Doctor</span>
      </div>
      <div>
        <button onClick={handleMinimize}>
          <Minus size={20} />
        </button>
        <button onClick={handleMaximize}>{max ? <Copy size={18} /> : <Square size={18} />}</button>
        <button onClick={handleClose}>
          <X size={22} />
        </button>
      </div>
    </div>
  )
}
