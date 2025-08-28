import { Search, SidebarIcon } from 'lucide-react'
import { useState } from 'react'
import Dashboard from './Dashboard'

const sidebarIconStyle = 'p-6 pt-4! cursor-pointer opacity-80 hover:opacity-100 transition-all'

export default function Sidebar(): React.JSX.Element {
  const [sidebar, setSidebar] = useState(false)

  return (
    <div
      className={`sidebar ${sidebar ? 'side-open w-[100%]' : 'w-20'} h-full flex ${sidebar ? 'content-between' : 'items-center'} border-r-1 border-[#333333] justify-between transition-all`}
    >
      {sidebar && (
        <div className="w-full px-20 py-4 overflow-y-scroll flex justify-center">
          <Dashboard />
        </div>
      )}
      <div className={`h-full w-20 ${sidebar ? 'border-l-1' : 'border-l-0'} border-[#3a3a3a12]`}>
        <div className={sidebarIconStyle} onClick={() => setSidebar((sidebar) => !sidebar)}>
          <SidebarIcon size={30} />
        </div>
        <div className={sidebarIconStyle}>
          <Search size={30} />
        </div>
      </div>
    </div>
  )
}
