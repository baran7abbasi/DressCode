'use client';

import { useEffect, useState } from 'react';
import { useChat } from "@nlxai/chat-react"; // Ensure this library is installed
import { TextInput, Button, Box, ScrollArea, FileButton, Group, Text } from '@mantine/core';
import axios from 'axios';
import styles from './ChatPage.module.css';
import { getUserId } from '../../../utility/authUtility';

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
    const fetchClothingItems = async () => {
        const userId = getUserId(); // Replace with logic to retrieve actual user ID
        if (!userId) {
            chat.conversationHandler.sendText("User ID not found. Please log in.");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5001/clothing`, {
                params: {
                    userId: userId, // Ensure the userId is being sent
                },
            });
            const items = response.data.map(item => item.name).join(', '); // Adjust based on your data structure
            chat.conversationHandler.sendText(`You own the following items: ${items}`);
        } catch (error) {
            console.error('Error fetching clothing items:', error);
            chat.conversationHandler.sendText("There was an error fetching your clothing items.");
        }
    };
    const checkForClothingItem = async (message: string) => {
        // Basic keyword detection for simplicity
        const keywordMatch = /do i have|own/i.test(message);
        
        if (keywordMatch) {
            const userId = getUserId; // Replace with logic to retrieve actual user ID
            const itemName = message.split(" ").pop(); // Get last word as item name for simplicity
            
            try {
                const response = await axios.get(`http://localhost:5001/clothing`, {
                    params: { userId },
                });

                const items = response.data;
                const foundItem = items.find((item: any) => item.name.toLowerCase() === itemName?.toLowerCase());

                // Generate bot response based on item existence
                const botResponse = foundItem
                    ? `Yes, you own a ${foundItem.name} in your wardrobe!`
                    : `It looks like you don't own a ${itemName} in your wardrobe.`;

                // Send the bot response as a user message
                chat.conversationHandler.sendText(botResponse);
            } catch (error) {
                console.error("Error checking clothing item:", error);
                chat.conversationHandler.sendText("Sorry, there was an error checking your closet.");
            }
        }
    };

    const handleSend = () => {
        const userInput = chat.inputValue;
        chat.conversationHandler.sendText(userInput); // Send user message
        chat.setInputValue(''); // Clear input field

        // Check for clothing item in MongoDB
        checkForClothingItem(userInput); 
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
                            minWidth: "1200px",
                            width: "auto"
                        },
                    }}
                />
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