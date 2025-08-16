import { Copy, Square, X, Minus } from 'lucide-react'
// import { useState, useEffect } from 'react'

export default function TopBar(): React.JSX.Element {
  // const [max, setMax] = useState(false)
  // useEffect(() => {
  //   // window.ipcRenderer.on('maximize', (_event, content) => setMax(content))
  //   // window.ipcRenderer.on('unmaximize', (_event, content) => setMax(content))
  // })
  return (
    <div className="top-bar">
      <button style={{ display: 'flex', justifyContent: 'end' }}>
        <Minus />
      </button>
      <button>
        <Square />
      </button>
      <button>
        <X />
      </button>
    </div>
  )
}
