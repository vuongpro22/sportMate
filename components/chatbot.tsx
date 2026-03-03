'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! 👋 Tôi là trợ lý AI của SportMatch. Tôi có thể giúp bạn tìm đối tác thể thao hoặc trả lời các câu hỏi về ứng dụng. Bạn cần gì?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('partner') || lowerInput.includes('đối tác')) {
      return 'Để tìm đối tác phù hợp, bạn có thể duyệt qua danh sách các vận động viên khác trên trang chủ hoặc sử dụng bộ lọc để tìm kiếm theo môn thể thao, kỹ năng và vị trí của bạn.';
    }

    if (lowerInput.includes('luyện tập') || lowerInput.includes('training')) {
      return 'Bạn có thể lên lịch luyện tập với các đối tác của mình. Truy cập hồ sơ của họ để xem lịch biểu và gửi yêu cầu luyện tập.';
    }

    if (lowerInput.includes('giúp') || lowerInput.includes('help')) {
      return 'Tôi có thể giúp bạn với: tìm đối tác, lên lịch luyện tập, cập nhật hồ sơ, hoặc trả lời câu hỏi về ứng dụng. Bạn cần gì cụ thể?';
    }

    if (lowerInput.includes('hồ sơ') || lowerInput.includes('profile')) {
      return 'Bạn có thể xem hồ sơ của mình bằng cách nhấp vào "Hồ Sơ Của Tôi" trong menu. Tại đó bạn có thể cập nhật thông tin, thêm ảnh, và cập nhật các kỹ năng thể thao của mình.';
    }

    return 'Câu hỏi hay! Tôi có thể giúp bạn tìm đối tác thể thao, lên lịch luyện tập, hoặc trả lời bất kỳ câu hỏi nào về SportMatch. Hãy cho tôi biết bạn cần gì!';
  };

  return (
    <>
      {/* Profile Bubble Button */}
      <button
        onClick={() => router.push('/my-profile')}
        className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-secondary hover:bg-secondary/90 text-foreground border border-border shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Go to my profile"
      >
        <User className="w-5 h-5" />
      </button>

      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 right-6 z-40 w-full max-w-sm bg-card border border-border rounded-lg shadow-2xl flex flex-col h-96 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg border-b border-border/50">
            <h3 className="font-semibold text-lg">SportMatch AI Assistant</h3>
            <p className="text-sm opacity-90">Chúng tôi sẽ giúp bạn 24/7</p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-input border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
