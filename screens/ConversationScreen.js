import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../api";
import endpoints from "../api/endpoint";
import { getUserID } from "../utils";
import { InteractionManager } from "react-native";

const ConversationScreen = ({ navigation, route }) => {
  const flatListRef = useRef(null);
  const { title, chatId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch chat history when the screen loads
  // In fetchChatHistory function
  const fetchChatHistory = async () => {
    try {
      setLoading(true);
      if (chatId) {
        const response = await api(`${endpoints.CHAT}/${chatId}`, "POST", {
          chat_id: chatId,
        });

        // Extract messages properly (adjust based on actual API response)
        const chatData = response.data;
        const chatHistory = Array.isArray(chatData)
          ? chatData
          : chatData?.chat_history || [];

        // Transform messages to match required format
        const formattedMessages = chatHistory.map((msg) => ({
          id: msg.id || msg._id,
          sender: msg.role === "user" ? "User" : "AyuAi",
          text: msg.message || msg.content || msg.text, // Handle different field names
          timestamp: new Date(msg.timestamp).toLocaleTimeString() || "Now",
        }));

        setMessages(formattedMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Failed to load chat history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [chatId]);

  const scrollToBottom = () => {
    InteractionManager.runAfterInteractions(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });
  };

  // Set screen title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  // Handle long press on messages
  const handleLongPress = (messageId, sender) => {
    const options =
      sender === "AyuAi"
        ? ["Copy", "Cancel"]
        : ["Edit", "Copy", "Delete", "Cancel"];
    Alert.alert(
      "Options",
      "Select an option",
      options.map((option) => ({
        text: option,
        onPress: () => handleOption(option, messageId),
      }))
    );
  };

  // Handle message options (edit, copy, delete)
  const handleOption = (option, messageId) => {
    switch (option) {
      case "Edit":
        console.log(`Edit message: ${messageId}`);
        break;
      case "Copy":
        console.log(`Copy message: ${messageId}`);
        break;
      case "Delete":
        setMessages(messages.filter((msg) => msg.id !== messageId));
        console.log(`Deleted message: ${messageId}`);
        break;
      case "Cancel":
        console.log("Action cancelled");
        break;
    }
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "User",
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    // Optimistically update UI
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    try {
      const superTokensId = await getUserID();
      const chatPayload = {
        chat_message: { role: "user", message: newMessage.trim() },
        super_tokens_id: superTokensId,
        newchat: !chatId,
        chatId,
        chat_title: title,
      };

      // Save message to backend
      const saveResponse = await api(endpoints.CHAT, "POST", chatPayload);
      const currentChatId = saveResponse.data.chat_id || chatId;

      // Get AI response
      const llmResponse = await api(endpoints.GET_LLM_RESPONSE, "POST", {
        question: newMessage.trim(),
        super_tokens_id: superTokensId,
        chat_id: currentChatId,
      });

      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: "AyuAi",
        text: llmResponse.data.response.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // save AI response to backend
      await api(endpoints.CHAT, "POST", {
        chat_message: { role: "assistant", message: llmResponse.data.response },
        super_tokens_id: superTokensId,
        chatId: currentChatId,
        chat_title: title,
      });
    } catch (error) {
      console.error("Message error:", error);
      Alert.alert("Error", "Failed to send message");
      // Rollback optimistic update on error
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setSending(false);
      scrollToBottom(); // Improved scroll call
    }
  };

  // Render each chat message
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "AyuAi" ? styles.ayuaiMessage : styles.userMessage,
      ]}
    >
      <Pressable
        style={[
          styles.messageBubble,
          item.sender === "AyuAi" ? styles.ayuaiBubble : styles.userBubble,
        ]}
        onLongPress={() => handleLongPress(item.id, item.sender)}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#32CA9A" />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.conversationContainer}
          refreshing={refreshing}
          onRefresh={fetchChatHistory}
          ListFooterComponent={<View style={{ height: 20 }} />}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
      )}
      {/* Input and action buttons */}
      {/* Input area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <Pressable onPress={() => {}} style={styles.actionButton}>
          <Ionicons name="attach-outline" size={24} color="#32CA9A" />
        </Pressable>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            placeholderTextColor="#aaa"
            multiline
            cursorColor={"#32CA9A"}
            editable={!sending}
          />
          <Pressable
            onPress={() => {}}
            style={[styles.micButton, sending && { opacity: 0.5 }]}
            disabled={sending}
          >
            <Ionicons name="mic-outline" size={24} color="#32CA9A" />
          </Pressable>
        </View>

        <Pressable
          onPress={handleSendMessage}
          style={styles.actionButton}
          disabled={sending}
        >
          {sending ? (
            <ActivityIndicator size="small" color="#32CA9A" />
          ) : (
            <Ionicons name="send-outline" size={24} color="#32CA9A" />
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  conversationContainer: {
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  ayuaiMessage: {
    justifyContent: "flex-start",
  },
  userMessage: {
    justifyContent: "flex-end",
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
    maxWidth: "70%",
    backdropFilter: "blur(10px)",
  },
  ayuaiBubble: {
    backgroundColor: "#FFFFFF22",
    borderWidth: 1,
    borderColor: "#FFFFFFAA",
  },
  userBubble: {
    backgroundColor: "#32CA9A22",
    borderColor: "#32CA9AAA",
    borderWidth: 1,
  },
  messageText: {
    color: "#FFF",
    fontSize: 16,
  },
  timestamp: {
    color: "#FFFFFF55",
    fontSize: 12,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    paddingLeft: 10,
    position: "relative",
    marginRight: 10,
    maxHeight: 200,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingRight: 40,
    maxHeight: 200,
    overflow: "hidden",
  },
  micButton: {
    position: "absolute",
    right: 10,
    bottom: 8,
  },
  actionButton: {
    marginHorizontal: 5,
    alignSelf: "flex-end",
    marginBottom: 6,
  },
});

export default ConversationScreen;
