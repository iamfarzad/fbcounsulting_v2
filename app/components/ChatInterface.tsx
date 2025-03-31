import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus the input field on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (message: string) => {
    // Prevent sending empty messages
    if (!message.trim()) return;
    
    setIsLoading(true);
    setInputValue(''); // Clear input field
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    try {
      // Create a placeholder for the assistant's response
      const tempId = Date.now().toString();
      setMessages(prev => [...prev, { role: 'assistant', content: '', id: tempId }]);
      
      // Send the request to initiate streaming
      const response = await fetch('/api/chat/streaming', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: messages.filter(msg => !msg.id) // Filter out temporary messages
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      if (!response.body) {
        throw new Error('Response body is null');
      }
      
      // Process the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          try {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(5));
              
              if (data.error) {
                console.error("Stream error:", data.error);
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === tempId 
                      ? { ...msg, content: "Sorry, I encountered an error. Please try again." } 
                      : msg
                  )
                );
                setIsLoading(false);
                return;
              }
              
              if (data.chunk) {
                fullResponse += data.chunk;
                
                // Update the message with the accumulated text so far
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === tempId 
                      ? { ...msg, content: fullResponse } 
                      : msg
                  )
                );
              }
              
              if (data.complete) {
                // Finalize the message once streaming is complete
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === tempId 
                      ? { ...msg, content: data.fullText, id: undefined } 
                      : msg
                  )
                );
                
                setIsLoading(false);
              }
            }
          } catch (e) {
            console.error("Error parsing line:", e, line);
          }
        }
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id 
            ? { ...msg, content: "Sorry, I encountered an error. Please try again." } 
            : msg
        )
      );
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto border rounded-lg overflow-hidden" 
         aria-live="polite" 
         aria-label="Chat with Farzad-AI">
      <div className="flex-1 p-4 overflow-y-auto" aria-label="Chat messages">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Ask me anything about AI solutions and consulting</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} 
                 className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}
                 aria-label={`${msg.role} message`}>
              <div className={`inline-block p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}>
                {msg.content || (
                  <div className="animate-pulse" aria-label="Loading response">
                    <div className="h-2 w-4 bg-gray-400 rounded"></div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="border-t p-4 flex items-center">
        <label htmlFor="message-input" className="sr-only">Type your message</label>
        <input
          id="message-input"
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Message input"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          aria-label={isLoading ? "Sending message" : "Send message"}
        ></button>
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true"></svg>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <span>Send</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;