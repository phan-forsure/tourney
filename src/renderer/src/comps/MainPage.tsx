import Notifications from './Notifications'

const componentClass =
  'p-12 m-4! bg-[var(--color-background-soft)] opacity-80 cursor-pointer transition-all flex justify-center items-center text-2xl rounded-xl border-1 border-[var(--color-background-dark)] w-90 h-64 hover:opacity-100 hover:shadow-lg'

export default function MainPage(): React.JSX.Element {
  return (
    <div className="main-screen flex h-full flex-wrap">
      <div className={`cancer-detection ${componentClass}`}>Cancer Detection</div>
      <div className={`diet ${componentClass}`}>Diet Plan</div>
      <Notifications />
    </div>
  )
}
