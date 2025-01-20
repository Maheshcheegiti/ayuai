import React, { useLayoutEffect, useState } from "react";
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
  Image,
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import LogoIcon from "../assets/icon.png";

const ConversationScreen = ({ navigation, route }) => {
  const { title } = route.params;
  const [isNewConversation, setIsNewConversation] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "AyuAi",
      text: "Hello! How can I help with your health and diet plan?",
      timestamp: "10:00 AM",
      liked: false,
      disliked: false,
    },
    {
      id: "2",
      sender: "User",
      text: "Can you suggest a healthy meal plan for this week?",
      timestamp: "10:05 AM",
      liked: false,
      disliked: false,
    },
    {
      id: "3",
      sender: "AyuAi",
      text: "Sure! A balanced meal would include...",
      timestamp: "10:10 AM",
      liked: false,
      disliked: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });

    if (title === "New Conversation") {
      setIsNewConversation(true);
    }
  }, [navigation, title]);

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

  const handleLike = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, liked: !msg.liked } : msg
      )
    );
  };

  const handleDislike = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, disliked: !msg.disliked } : msg
      )
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: String(messages.length + 1),
        sender: "User",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        liked: false,
        disliked: false,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <View
      key={item.id}
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
        {/* <View style={styles.reactions}>
          <Pressable onPress={() => handleLike(item.id)}>
            <Ionicons
              name={item.liked ? "thumbs-up" : "thumbs-up-outline"}
              size={24}
              color="#32CA9A"
            />
          </Pressable>
          <Pressable onPress={() => handleDislike(item.id)}>
            <Ionicons
              name={item.disliked ? "thumbs-down" : "thumbs-down-outline"}
              size={24}
              color="#32CA9A"
            />
          </Pressable>
        </View> */}
      </Pressable>
    </View>
  );

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.conversationContainer}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />

      {/* Input and action buttons */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        {/* File Attachment Button */}
        <Pressable onPress={() => {}} style={styles.actionButton}>
          <Ionicons name="attach-outline" size={24} color="#32CA9A" />
        </Pressable>

        {/* Text Input with Mic Inside */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            placeholderTextColor="#aaa"
            multiline
            cursorColor={"#32CA9A"}
          />
          <Pressable onPress={() => {}} style={styles.micButton}>
            <Ionicons name="mic-outline" size={24} color="#32CA9A" />
          </Pressable>
        </View>

        {/* Send Button */}
        <Pressable onPress={handleSendMessage} style={styles.actionButton}>
          <Ionicons name="send-outline" size={24} color="#32CA9A" />
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
  profileContainer: {
    marginRight: 10,
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
  reactions: {
    flexDirection: "row",
    marginTop: 5,
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
