'use client'

import { useEffect } from 'react';

const NlXChatWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js";
    script.defer = true;
    script.onload = () => {
      const widget = (window as any).nlxai?.chatWidget.create({
        config: {
          botUrl: 'https://bots.dev.studio.nlx.ai/c/O6Xa4i6Yyl5csIkzCZhrH/juVThWEAz0imS5uLZHOfS', // Use env variable for security
          headers: {
            "nlx-api-key": 'BpJgvMyq3wn0FvrWBkdaXfn8XMw6UCpy',
          },
          languageCode: "en-US",
        },
        titleBar: {
          title: "Closet Support",
        },
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; 
};

export default NlXChatWidget;