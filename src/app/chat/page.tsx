"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  id: number;
  sender: "User" | "Driver" | "System";
  text: string;
  time: string;
  seen?: boolean;
};

export default function ChatPage() {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastMsgCount = useRef(0);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chatClosed, setChatClosed] = useState(false);

  /* ==============================
     INIT CHAT (NO DEP ARRAY)
  ============================== */
  useEffect(() => {
    if (!localStorage.getItem("activeRide")) {
      router.replace("/dashboard");
      return;
    }

    if (messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          sender: "System",
          text: "You are now connected with your driver",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
  });

  /* ==============================
     AUTO SCROLL (REF BASED)
  ============================== */
  useEffect(() => {
    if (messages.length !== lastMsgCount.current) {
      lastMsgCount.current = messages.length;
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  /* ==============================
     AUTO CLOSE CHAT
  ============================== */
  useEffect(() => {
    if (chatClosed) return;

    const interval = setInterval(() => {
      if (localStorage.getItem("chatClosed")) {
        setChatClosed(true);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "System",
            text: "Ride completed. Chat closed.",
            time: new Date().toLocaleTimeString(),
          },
        ]);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  /* ==============================
     SEND MESSAGE
  ============================== */
  const sendMessage = () => {
    if (!input.trim() || chatClosed) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: "User",
      text: input,
      time: new Date().toLocaleTimeString(),
      seen: false,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      const driverMsg: Message = {
        id: Date.now() + 1,
        sender: "Driver",
        text: getDriverReply(userMsg.text),
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) =>
        prev.map((m) =>
          m.id === userMsg.id ? { ...m, seen: true } : m
        ).concat(driverMsg)
      );
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      {/* HEADER */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/100?img=12"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">Rohit • Driver</p>
          <p className="text-green-600 text-sm">Online</p>
        </div>
      </div>

      {/* CHAT */}
     

      <div className="bg-white h-[420px] p-4 rounded-xl shadow overflow-y-auto space-y-3">
        {messages.map((m) =>
          m.sender === "System" ? (
            <div
              key={m.id}
              className="text-center text-sm text-gray-500"
            >
              {m.text}
            </div>
          ) : (
            <div
              key={m.id}
              className={`flex ${
                m.sender === "User"
                  ? "justify-end"
                  : "justify-start"
              } items-end gap-2`}
            >
              {m.sender === "Driver" && (
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  className="w-7 h-7 rounded-full"
                />
              )}

              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-[70%]
                ${
                  m.sender === "User"
                    ? "bg-black text-white rounded-br-none"
                    : "bg-gray-200 rounded-bl-none"
                }`}
              >
                {m.text}
                <div className="text-[10px] text-right opacity-60 mt-1">
                  {m.time}{" "}
                  {m.sender === "User" && m.seen && "✓✓"}
                </div>
              </div>
            </div>
          )
        )}

        {typing && (
          <p className="text-sm text-gray-400 ml-10">
            Driver is typing…
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      {!chatClosed ? (
        <div className="flex gap-2">
          <input
            className="flex-1 border p-3 rounded-lg"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-black text-white px-6 rounded-lg"
          >
            Send
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Chat closed
        </p>
      )}
    </div>
  );
}

/* ==============================
   DRIVER AI RESPONSES
============================== */
function getDriverReply(text: string) {
  const msg = text.toLowerCase();

  if (msg.includes("where")) return "I’m 2 minutes away 📍";
  if (msg.includes("hello") || msg.includes("hi"))
    return "Hello! On my way 🚗";
  if (msg.includes("gate"))
    return "Please wait near the main gate";
  if (msg.includes("ok")) return "Got it 👍";

  return "Sure 👍";
}
