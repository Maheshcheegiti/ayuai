import React from "react";
import { StyleSheet, View } from "react-native";
import LoadingLogo from "../components/LoadingLogo";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

const ChatBubble = ({ item, handleLongPress, handleOpenPdf }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        item.sender === "AyuAi" ? styles.ayuaiMessage : styles.userMessage,
      ]}
    >
      {item.isLoading && item.sender === "AyuAi" ? (
        <View style={styles.loadingLogoWrapper}>
          <LoadingLogo />
        </View>
      ) : item.isPdf ? (
        <Pressable
          onPress={() => handleOpenPdf(item.fileUri)}
          style={[
            styles.messageBubble,
            styles.pdfPreviewContainer,
            item.sender === "AyuAi" ? styles.ayuaiBubble : styles.userBubble,
          ]}
        >
          <View
            style={[
              styles.pdfThumbnail,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Ionicons name="document-text-outline" size={48} color="#32CA9A" />
          </View>

          <View style={styles.pdfMetaInfo}>
            <Text style={styles.fileNameText} numberOfLines={1}>
              {item.fileName}
            </Text>
            <View style={styles.pdfActionRow}>
              <Text style={styles.previewNote}>Tap to view or download</Text>
              <Ionicons
                name="arrow-down-circle-outline"
                size={22}
                color="#32CA9A"
              />
            </View>
          </View>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </Pressable>
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

  pdfBubble: {
    padding: 12,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  pdfInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  fileNameText: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
  },
  pdfPreviewContainer: {
    padding: 12,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  previewNote: {
    fontSize: 12,
    color: "#FFFFFF88",
    marginTop: 2,
  },

  downloadIcon: {
    marginLeft: 5,
  },

  pdfMetaInfo: {
    width: "100%",
    paddingTop: 5,
  },

  pdfActionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
});

export default ChatBubble;
