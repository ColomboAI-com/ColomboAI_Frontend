import { Message } from '@/components/ChatWindow';

export const getSuggestions = async (chatHistory) => {
  const chatModel = localStorage.getItem('chatModel');
  const chatModelProvider = localStorage.getItem('chatModelProvider');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_history: chatHistory,
      chat_model: chatModel,
      chat_model_provider: chatModelProvider,
    }),
  });

  const data = await res.json();

  return data.suggestions;
};
