/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowUp, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AiScreen(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const questionArrowRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isChatStarted, setIsChatStarted] = useState(false)

  const handleSubmit = async (): Promise<void> => {
    if (!inputRef.current?.value || isLoading) return

    // Set chat as started on first message
    if (!isChatStarted) {
      setIsChatStarted(true)
    }

    const userMessage = inputRef.current.value
    inputRef.current.value = ''

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve('This is a sample AI response.'), 1000),
      )

      setMessages((prev) => [...prev, { role: 'assistant', content: response as string }])
    } catch (error) {
      console.error('Failed to get AI response:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.key === 'Enter' && inputRef.current === document.activeElement) {
        handleSubmit()
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    questionArrowRef.current?.addEventListener('click', handleSubmit)

    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      questionArrowRef.current?.removeEventListener('click', handleSubmit)
    }
  }, [])

  return (
    <div className="ai-screen flex flex-col h-full">
      {!isChatStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="logo mb-4">
            <div className="symbol text-green-600">+</div>
            <div className="logo-text text-green-700">Let&apos;s become healthier together</div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 text-xl">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 text-green-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-green-50 text-green-800 rounded-lg px-4 py-2">Typing...</div>
            </div>
          )}
        </div>
      )}

      {/* Input Area */}
      <div className="screen-input p-4! bg-green-50 border border-green-100">
        <input
          type="text"
          ref={inputRef}
          placeholder="Ask me anything..."
          disabled={isLoading}
          className="bg-transparent text-green-900 placeholder-green-900/50"
        />
        <div className="question-arrow flex text-green-600" ref={questionArrowRef}>
          {isChatStarted && (
            <X
              className="mr-2! transition-all opacity-70 hover:opacity-100"
              onClick={() => {
                setIsChatStarted((started) => !started)
                setMessages([])
              }}
            />
          )}
          <ArrowUp className="transition-all opacity-70 hover:opacity-100" strokeWidth={2.6} />
        </div>
      </div>
    </div>
  )
}
