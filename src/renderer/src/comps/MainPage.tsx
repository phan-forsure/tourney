import { useState } from 'react'
import Notifications from './Notifications'
import CancerDetection from './screens/CancerDetection'
import DietPlan from './pages/DietPlan'
import { Activity, Salad } from 'lucide-react'

const componentClass =
  'p-12 m-4! bg-[var(--color-background-soft)] opacity-80 cursor-pointer transition-all flex flex-col justify-center items-center text-2xl rounded-xl border-1 border-[var(--color-background-dark)] w-90 h-64 hover:opacity-100 hover:shadow-lg gap-4'

export default function MainPage(): React.JSX.Element {
  const [activeContent, setActiveContent] = useState<'none' | 'cancer' | 'diet'>('none')

  return (
    <div className="main-screen overflow-y-scroll min-2xl:mx-60! justify-center flex h-full flex-wrap">
      <div
        className={`cancer-detection ${componentClass} ${
          activeContent === 'cancer' ? 'bg-green-100 !opacity-100' : ''
        }`}
        onClick={() => setActiveContent((current) => (current === 'cancer' ? 'none' : 'cancer'))}
      >
        <Activity size={40} color="#7bc1b7" />
        <span className="text-[#07572e]">Cancer Detection</span>
      </div>
      <div
        className={`diet ${componentClass} ${
          activeContent === 'diet' ? 'bg-green-100 !opacity-100' : ''
        }`}
        onClick={() => setActiveContent((current) => (current === 'diet' ? 'none' : 'diet'))}
      >
        <Salad size={40} color="#7bc1b7" />
        <span className="text-[#07572e]">Diet Plan</span>
      </div>
      {activeContent !== 'none' ? (
        <div className="w-full m-4! p-6 bg-white rounded-xl shadow-sm flex justify-center">
          {activeContent === 'cancer' ? <CancerDetection /> : <DietPlan />}
        </div>
      ) : (
        <Notifications />
      )}
    </div>
  )
}
