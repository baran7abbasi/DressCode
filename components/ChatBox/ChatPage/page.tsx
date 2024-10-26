'use client';

import { useEffect, useState } from 'react';
import { useChat } from "@nlxai/chat-react"; // Ensure this library is installed
import { TextInput, Button, Box, ScrollArea, FileButton, Group, Text } from '@mantine/core';
import styles from './ChatPage.module.css';

// Define props interface
interface ChatBubbleProps {
    text: string;
    isUser: boolean;
}

const ChatPage: React.FC = () => {
    const chat = useChat({
        botUrl: 'https://bots.dev.studio.nlx.ai/c/DKKNFw9wohb9mYGLFOf9m/hbYWo0IVBdbHMzBpegwqu', // Replace with your bot URL
        headers: {
            "nlx-api-key": 'BpJgvMyq3wn0FvrWBkdaXfn8XMw6UCpy', // Replace with your API key
        },
        languageCode: "en-US",
    });
    
    const [welcomeMessage] = useState("Welcome to Ask Your Closet! How can I help you with your outfit today?");

    const handleFileChange = async (file: File | null) => {
        if (file) {
            // Check if the file is an image
            if (!file.type.startsWith('image/')) {
                console.error('Please upload a valid image file.');
                return;
            }
    
            // Create a FileReader to read the file
            const reader = new FileReader();
    
            // Read the image file as a data URL
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box className={styles.container}>
            <ScrollArea className={styles.scrollArea}>
                {welcomeMessage && (
                    <div className={styles.botchat}>
                        <Text>{welcomeMessage}</Text>
                    </div>
                )}
                {chat.responses.map((response, index) => {
                    if (response.type === "user" && response.payload.type === "text") {
                        return (
                            <div key={`user-${index}`} className={styles.userchat}>
                                {response.payload.text}
                            </div>
                        );
                    }
                    if (response.type === "bot") {
                        return response.payload.messages.map((message, messageIndex) => (
                            <div key={`bot-${index}-${messageIndex}`} className={styles.botchat}>
                                {message.text}
                            </div>
                        ));
                    }
                    return null; // Return null for any unhandled response types
                })}
                {chat.waiting && <Text>Loading...</Text>}
            </ScrollArea>
            <Group className={styles.inputGroup} mb="sm">
                <TextInput
                    value={chat.inputValue}
                    onChange={(event) => chat.setInputValue(event.target.value)} 
                    placeholder="Type your message..."
                    radius="md"
                    styles={{
                        input: {
                            flex: 1,
                            padding: "5px",
                            minWidth: "1000px"
                        },
                    }}
                />
                <FileButton
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple={false} // Ensure that only one file can be selected
                >
                    {(props) => <Button {...props}>Upload Image</Button>}
                </FileButton>
                <Button
                    onClick={() => {
                        chat.conversationHandler.sendText(chat.inputValue);
                        chat.setInputValue(''); // Clear the input after sending
                    }}
                    radius="md"
                >
                    Send
                </Button>
            </Group>
        </Box>
    );
};

export default ChatPage;