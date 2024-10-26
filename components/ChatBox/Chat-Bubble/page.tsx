'use client'

import { useEffect } from 'react';

const NlxChatWidget: React.FC = () => {
  useEffect(() => {
    // Dynamically load the NLX Chat Widget script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js";
    script.defer = true;
    script.onload = () => {
      // Initialize the chat widget once the script has loaded
      const widget = (window as any).nlxai?.chatWidget.create({
        config: {
          botUrl: 'https://bots.dev.studio.nlx.ai/c/DKKNFw9wohb9mYGLFOf9m/hbYWo0IVBdbHMzBpegwqu', // Use env variable for security
          headers: {
            "nlx-api-key": 'BpJgvMyq3wn0FvrWBkdaXfn8XMw6UCpy',
          },
          languageCode: "en-US",
        },
        titleBar: {
          title: "Support Chat",
        },
      });
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Widget will display on page load as configured
};

export default NlxChatWidget;