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
import * as FileSystem from "expo-file-system";
import { getOrRequestDownloadUri } from "../utils/storageHelper";
import { generateHealthReportPdf } from "../utils/pdfHelper";
import * as IntentLauncher from "expo-intent-launcher"; // Only works on Android
import ChatBubble from "./ChatBubble";
import { CameraView } from "expo-camera";
import { formatToGTIN13 } from "../utils/barcodeHelper";

const ConversationScreen = ({ navigation, route }) => {
  const flatListRef = useRef(null);
  const { title, chatId: initialChatId } = route.params;
  const [chatId, setChatId] = useState(initialChatId);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [scanned, setScanned] = useState(false);

  // clientid 5ac51e894ea04abf8b282dbce573101d
  // clinetsecret 67a2a6da8792492da88ac2dc2c85a5dc

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

  const generateHealthReport = async () => {
    const tempMessageId = `report-loading-${Date.now()}`;
    const loadingMessage = {
      id: tempMessageId,
      sender: "AyuAi",
      isLoading: true,
    };

    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await api(endpoints.HEALTH_REPORT, "GET");
      const report = response.data?.report?.trim();

      if (report) {
        const { uri, fileName } = await generateHealthReportPdf(report);

        const fileMessage = {
          id: `pdf-${Date.now()}`,
          sender: "AyuAi",
          isPdf: true,
          fileName,
          fileUri: uri,
          timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempMessageId ? fileMessage : msg))
        );
      } else {
        setMessages((prev) => prev.filter((msg) => msg.id !== tempMessageId));
      }
    } catch (err) {
      console.error("Health report generation failed", err);
      Alert.alert("Error", "Failed to generate health report");
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessageId));
    } finally {
      setReportGenerated(true);
    }
  };

  const handleOpenPdf = async (fileUri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileName = fileUri.split("/").pop();
      const mimeType = "application/pdf"; // or use Mime.lookup(fileName) if needed

      const dirUri = await getOrRequestDownloadUri();
      const newFileUri =
        await FileSystem.StorageAccessFramework.createFileAsync(
          dirUri,
          fileName,
          mimeType
        );

      await FileSystem.writeAsStringAsync(newFileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 🚀 Launch the system's "Open with..." dialog
      IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: newFileUri,
        flags: 1,
        type: mimeType,
      });
    } catch (err) {
      console.error("File open error:", err);
      Alert.alert("Error", "Failed to save or open the PDF");
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await fetchChatHistory();

      if (title === "Generate Health Report" && !reportGenerated) {
        await generateHealthReport();
      }

      setLoading(false);
    };

    initialize();
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

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "User",
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    const tempAiMessageId = `ai-loading-${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: tempAiMessageId, sender: "AyuAi", isLoading: true },
    ]);
    setNewMessage("");

    try {
      const superTokensId = await getUserID();

      const isNewChat = !chatId;
      const chatPayload = {
        chat_message: { role: "user", message: newMessage.trim() },
        super_tokens_id: superTokensId,
        newchat: isNewChat,
        chatId,
        chat_title: title,
      };

      const saveResponse = await api(endpoints.CHAT, "POST", chatPayload);
      const currentChatId = saveResponse.data.chat_id || chatId;

      // 👇 Fix: update chatId immediately for future messages
      if (!chatId) {
        setChatId(currentChatId);
      }

      // Fetch AI response
      const llmResponse = await api(endpoints.GET_LLM_RESPONSE, "POST", {
        question: newMessage.trim(),
        super_tokens_id: superTokensId,
        chat_id: currentChatId,
      });

      const aiMessage = {
        id: tempAiMessageId,
        sender: "AyuAi",
        text: llmResponse.data.response.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };

      console.log("Ai message:", aiMessage);

      // 👇 Fix: update UI immediately with AI response
      setMessages((prev) => {
        const updated = prev.map((msg) =>
          msg.id === tempAiMessageId ? aiMessage : msg
        );
        const hasUpdated = updated.find((msg) => msg.id === aiMessage.id);
        return hasUpdated ? updated : [...prev, aiMessage]; // fallback
      });

      console.log("Messages after AI response:", messages);

      console.log("Chat ID:", currentChatId);

      // Save AI message to backend
      await api(endpoints.CHAT, "POST", {
        chat_message: {
          role: "assistant",
          message: llmResponse.data.response.trim(),
        },
        super_tokens_id: superTokensId,
        chatId: currentChatId,
        chat_title: title,
      });
    } catch (error) {
      console.error("Message error:", error);
      Alert.alert("Error", "Failed to send message");
      setMessages((prev) =>
        prev.filter(
          (msg) => msg.id !== userMessage.id && msg.id !== tempAiMessageId
        )
      );
    } finally {
      setSending(false);
      scrollToBottom();
    }
  };

  const handleBarcodeScanned = async ({ data }) => {
    setScanned(true);
    setShowCamera(false);

    const formattedBarcode = formatToGTIN13(data);
    const tempId = `barcode-loading-${Date.now()}`;

    const loadingMessage = {
      id: tempId,
      sender: "AyuAi",
      isLoading: true,
    };

    setMessages((prev) => [...prev, loadingMessage]);

    try {
      console.log("Scanned barcode:", formattedBarcode);
      const response = await api(endpoints.ANALYZE_BARCODE, "POST", {
        barcode: formattedBarcode,
      });

      const resultText = response.data?.analysis?.trim();

      const aiMessage = {
        id: `ai-barcode-${Date.now()}`,
        sender: "AyuAi",
        text: resultText || "Couldn't interpret the barcode properly.",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? aiMessage : msg))
      );
    } catch (error) {
      console.error("Barcode analysis failed:", error);
      Alert.alert("Error", "Failed to analyze barcode");
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    } finally {
      // 🔁 Allow future scans again after short delay
      setTimeout(() => setScanned(false), 1000);
    }
  };

  // Render each chat message
  // Updated renderItem function
  const renderItem = ({ item }) => (
    <ChatBubble
      item={item}
      handleLongPress={handleLongPress}
      handleOpenPdf={handleOpenPdf}
    />
  );

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      {showCamera && (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8", "ean12"],
          }}
          style={{
            width: "100%",
            height: 250,
            borderRadius: 10,
            marginBottom: 10,
            overflow: "hidden",
          }}
        />
      )}

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
        <Pressable
          onPress={() => setShowCamera(true)}
          style={styles.actionButton}
        >
          <Ionicons name="barcode-outline" size={24} color="#32CA9A" />
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
  loadingLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  conversationContainer: {
    paddingBottom: 20,
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
