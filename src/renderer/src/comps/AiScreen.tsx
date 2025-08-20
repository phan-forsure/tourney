import { ArrowUp } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function AiScreen(): React.JSX.Element {
  const questionArrowRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    questionArrowRef.current?.addEventListener('click', () => {
      // console.log(inputRef?.current?.value)
      if (inputRef.current!.value != '') {
        inputRef.current!.value = ''
      }
    })
  }, [])

  // temporarily constant. should be variable based on suggestion
  const ask_placeholder = 'Make a plan to lose 10 kg over 6 weeks'

  return (
    <div className="ai-screen">
      <div className="logo">
        <div className="symbol">+</div>
        <div className="logo-text">Let&apos;s become healthier together</div>
      </div>
      <div className="screen-input">
        <input type="text" ref={inputRef} placeholder={ask_placeholder} />
        <div className="question-arrow" ref={questionArrowRef}>
          <ArrowUp strokeWidth={2.6} />
        </div>
      </div>
    </div>
  )
}
