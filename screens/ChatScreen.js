import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import PremiumPlanBanner from "../components/PremiumPlanBanner";
import IconButtons from "../components/IconButtons";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../api";
import endpoints from "../api/endpoint";
import { useFocusEffect } from "@react-navigation/native";

const ChatScreen = ({ navigation }) => {
  const [historyData, setHistoryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchHistoryData = async () => {
    try {
      setLoading(true);
      const response = await api(endpoints.CHAT_HISTORY, "GET");

      const formattedHistory = response.data
        .map((chat) => ({
          id: chat.chat_id,
          iconName: chat.chat_title.startsWith("Generate")
            ? "document-text-outline"
            : "chatbubble-ellipses-outline",
          title: chat.chat_title,
        }))
        .reverse();

      setHistoryData(formattedHistory);
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistoryData();
    }, [])
  );

  const handleChat = (
    title = "New Conversation",
    chatId = null,
    healthReport = false
  ) => {
    if (healthReport) {
      navigation.navigate("Conversation", {
        title: "Generate Health Report",
        chatId: null,
        superTokensId: "user-super-tokens-id", // Replace with actual superTokensId
      });
    } else {
      if (typeof title !== "string") {
        title = "New Conversation";
      }

      navigation.navigate("Conversation", {
        title: title,
        chatId: chatId,
        superTokensId: "user-super-tokens-id", // Replace with actual superTokensId
      });
    }
  };

  const renderHistoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={style.historyItem}
        onPress={() => {
          handleChat(item.title, item.id);
        }}
      >
        <View style={style.historyIconContainer}>
          <Ionicons name={item.iconName} size={24} color="#FFFFFFCC" />
        </View>
        <Text style={style.historyTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <TouchableOpacity
          style={style.arrowContainer}
          onPress={() => {
            handleChat(item.title, item.id);
          }}
        >
          <Ionicons name="arrow-forward" size={24} color="#FFFFFFCC" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const noHistoryComponent = (
    <View style={GlobalStyles.noDataContainer}>
      <Text style={GlobalStyles.noDataText}>No History Available</Text>
    </View>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHistoryData();
    setRefreshing(false);
  };

  return (
    <View style={[GlobalStyles.container, style.chatContainer]}>
      <PremiumPlanBanner />
      <View style={style.iconButtonContainer}>
        <IconButtons
          iconName="chatbubble-ellipses-outline"
          text="Chat with AyuAi to get instant health insights"
          onPress={() => handleChat("New Conversation", null, false)}
        />
        <IconButtons
          iconName="document-text-outline"
          text="Generate Health Report and Export"
          onPress={() => handleChat(null, null, true)}
        />
      </View>
      <Text style={GlobalStyles.primaryHeading}>History</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#32CA9A" />
      ) : (
        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={style.historyListContainer}
          ListEmptyComponent={noHistoryComponent}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  chatContainer: {
    padding: 15,
  },
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    gap: 15,
  },
  historyListContainer: {
    paddingBottom: 50,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#FFFFFF22",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#32CA9A",
    height: 50,
    marginVertical: 5,
  },
  historyIconContainer: {
    flex: 0.1,
  },
  historyTitle: {
    flex: 0.8,
    fontSize: 16,
    color: "#FFFFFFCC",
  },
  arrowContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default ChatScreen;
