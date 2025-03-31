import React from 'react';
import ChatInterface from '@/app/components/ChatInterface';

export const metadata = {
  title: 'Chat with Farzad-AI | AI Systems Consultant',
  description: 'Have a direct conversation with Farzad-AI, your assistant for AI & automation strategy, technical oversight, and mental wellness tools.',
}

export default function ChatPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Chat with Farzad-AI
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Ask me anything about AI solutions, technical project oversight, or how I can help your team implement AI effectively.
      </p>
      
      <ChatInterface />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Not finding what you need? <a href="/contact" className="text-blue-600 hover:underline">Book a call</a> with Farzad directly.</p>
      </div>
    </main>
  );
}
