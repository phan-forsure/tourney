import { MoonIcon, SidebarIcon } from 'lucide-react'
import { useState } from 'react'

const sidebarIconStyle = 'p-6 cursor-pointer opacity-80 hover:opacity-100 transition-all'

export default function Sidebar(): React.JSX.Element {
  const [sidebar, setSidebar] = useState(false)

  return (
    <div className="sidebar w-20 h-full flex flex-col items-center border-r-1 border-[#333333] justify-between">
      {/* Add your sidebar content here */}
      <div className={sidebarIconStyle} onClick={() => setSidebar((sidebar) => !sidebar)}>
        <SidebarIcon size={30} />
      </div>
      <div className={sidebarIconStyle}>
        <MoonIcon size={30} />
      </div>
    </div>
  )
}
