import AiScreen from './comps/MainPage'
import Sidebar from './comps/Sidebar'
import TopBar from './comps/TopBar'

function App(): React.JSX.Element {
  return (
    <>
      <TopBar />
      <div className="content flex h-[95%]">
        <Sidebar />
        <AiScreen />
      </div>
    </>
  )
}

export default App
