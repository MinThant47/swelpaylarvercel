"use client"

import { useEffect, useState, useRef } from "react"
import Cookies from "js-cookie"
import { v4 as uuidv4 } from "uuid"
import Image from "next/image"
import Logo from "../Assets/SPL.svg"
import { Redis } from "@upstash/redis"
import ReactMarkdown from "react-markdown"

const redis = new Redis({
  url: process.env.NEXT_PUBLIC_REACT_APP_REDIS_URL,
  token: process.env.NEXT_PUBLIC_REACT_APP_REDIS_PW,
})

const ChatPage = () => {
  const [userId, setUserId] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // On initial mount, check or set cookie
  useEffect(() => {
    let id = Cookies.get("user_id")
    if (!id) {
      id = uuidv4()
      Cookies.set("user_id", id, { expires: 3650 }) // 10 years
    }
    ;(async () => {
      const data = await redis.get(id)
      if (data == null) {
        setChatHistory([])
      } else {
        setChatHistory(data)
      }
    })()

    setUserId(id)
    setLoading(false)
  }, [])

  const handleSend = async () => {
    if (!message.trim()) return

    const newChat = [
      ...chatHistory,
      { type: "HumanMessage", content: message }, // Human message
      { type: "AIMessage", content: "loading", isLoading: true }, // Loading state
    ]
    setChatHistory(newChat)
    setMessage("")

    try {
      const response = await fetch("https://swelpaylar-api-production.up.railway.app/generate", {
      // const response = await fetch("https://swelpaylar-api.onrender.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: message,
          user_id: userId,
          chat_history: chatHistory,
        }),
      })

      const data = await response.json()
      // Replace the loading state with the actual response
      newChat[newChat.length - 1] = {
        type: "AIMessage",
        content: data.response_text,
        isLoading: false,
      }
      setChatHistory([...newChat])
    } catch (error) {
      console.error("Error sending message:", error)
      newChat[newChat.length - 1] = {
        type: "AIMessage",
        content: "Sorry, something went wrong.",
        isLoading: false,
      }
      setChatHistory([...newChat])
    }
  }

  const handleClear = () => {
    setChatHistory([])
    redis.del(userId)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  // Loading animation component
  const LoadingAnimation = () => (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-orange-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-orange-300 animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-orange-300 animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  )

  return (
    <div className="mt-32 min-h-screen flex flex-col px-9 md:px-32 lg:px-40 pt-8 pb-24">
      <h2 className="font-clashMedium text-2xl md:text-4xl text-white text-center mb-2">
        Chat with <span className="text-primary-100"> Swel Pay Lar </span>
      </h2>

      <div className="text-left flex gap-2 items-start mt-10 mb-5">
        <div className="flex-shrink-0 w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]">
          <Image
            src={Logo || "/placeholder.svg"}
            alt="Bot"
            className="w-full h-full object-contain"
            width={40}
            height={40}
          />
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(247, 148, 29, 0.25), rgba(247, 148, 29, 0.05))",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "15px 20px",
            borderRadius: "0px 20px 20px 20px",
            fontSize: "16.5px",
            lineHeight: "1.8",
            color: "#f5f5f5",
            boxShadow: "0 8px 30px rgba(255, 128, 0, 0.1)",
          }}
          className="bg-gradient-to-br max-w-2xl text-base from-orange-300/30 leading-relaxed tracking-wide to-orange-100/10 text-white text-left rounded-2xl p-5 inline-block"
        >
          <div className="markdown-content">
            Hello မင်္ဂလာပါခင်ဗျ။ Swel Pay Lar - ဆွဲပေးလား မှ ကြိုဆိုပါတယ်။ ဘာများကူညီဆောင်ရွက်ပေးရမလဲခင်ဗျာ။
          </div>
        </div>
      </div>

      {/* Chat history in normal flow */}
      {chatHistory !== null &&
        chatHistory.map((msg, idx) => (
          <div key={idx} className="mb-5">
            {/* Human */}
            {msg.type === "HumanMessage" && (
              <div className="flex justify-end">
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  className="bg-white/20 text-white text-left rounded-2xl leading-relaxed tracking-wide p-5 max-w-2xl text-base inline-block"
                >
                  {msg.content}
                </div>
              </div>
            )}

            {/* AI */}
            {msg.type === "AIMessage" && (
              <div className="text-left flex gap-2 items-start">
                <div className="flex-shrink-0 w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]">
                  <Image
                    src={Logo}
                    alt="Bot"
                    className="w-full h-full object-contain"
                    width={40}
                    height={40}
                  />
                </div>
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(247, 148, 29, 0.25), rgba(247, 148, 29, 0.05))",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    padding: "15px 20px",
                    borderRadius: "0px 20px 20px 20px",
                    fontSize: "16.5px",
                    lineHeight: "1.8",
                    color: "#f5f5f5",
                    boxShadow: "0 8px 30px rgba(255, 128, 0, 0.1)",
                  }}
                  className="bg-gradient-to-br max-w-2xl text-base from-orange-300/30 leading-relaxed tracking-wide to-orange-100/10 text-white text-left rounded-2xl p-5 inline-block"
                >
                  {msg.isLoading ? (
                    <LoadingAnimation />
                  ) : (
                    <div className="markdown-content">
                      <ReactMarkdown>{String(msg.content)}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      <div ref={messagesEndRef} />

      {/* Input Area Fixed to Bottom */}
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-[#1e1e1e] shadow-lg">
        <div className="max-w-6xl mx-auto w-full px-4 py-6 flex items-center">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter Your Question..."
              className="leading-relaxed tracking-wide w-full pl-4 pr-10 py-2 rounded-full bg-[#2a2a35] text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"
            >
              &gt;
            </button>
          </div>
          <button onClick={handleClear} className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Clear Chat
          </button>
        </div>
      </footer>
    </div>
  )
}

export default ChatPage
