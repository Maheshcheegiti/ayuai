import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import PremiumPlanBanner from "../components/PremiumPlanBanner";
import IconButtons from "../components/IconButtons";
import { Ionicons } from "@expo/vector-icons";

const ChatScreen = ({ navigation }) => {
  // Sample data for history
  const historyData = [
    {
      id: "1",
      iconName: "chatbubble-ellipses-outline",
      title: "About my health and diet plan for a week",
    },
    {
      id: "2",
      iconName: "document-text-outline",
      title: "Generate Health Report and Export",
    },
    {
      id: "3",
      iconName: "chatbubble-ellipses-outline",
      title: "Consultation on stress management techniques",
    },
    {
      id: "4",
      iconName: "document-text-outline",
      title: "Tracking daily calories intake",
    },
    {
      id: "5",
      iconName: "chatbubble-ellipses-outline",
      title: "Understanding sleep patterns for better health",
    },
    {
      id: "6",
      iconName: "document-text-outline",
      title: "How to manage mental health during work hours",
    },
    {
      id: "7",
      iconName: "chatbubble-ellipses-outline",
      title: "Consultation on improving fitness with running",
    },
    {
      id: "8",
      iconName: "document-text-outline",
      title: "Generate health insights report for last month",
    },
    {
      id: "9",
      iconName: "chatbubble-ellipses-outline",
      title: "Healthy meal plan for vegetarians this week",
    },
    {
      id: "10",
      iconName: "document-text-outline",
      title: "Tracking progress of my fitness goals",
    },
  ];

  // const historyData = [];

  const [refreshing, setRefreshing] = useState(false);

  const handleChat = (title = "New Conversation") => {
    if (typeof title !== "string") {
      title = "New Conversation";
    }

    navigation.navigate("Conversation", {
      title: title,
    });
  };

  const renderHistoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={style.historyItem}
        onPress={() => {
          handleChat(item.title);
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
            handleChat(item.title);
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

  const onRefresh = () => {
    // Refresh
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={[GlobalStyles.container, style.chatContainer]}>
      <PremiumPlanBanner />
      <View style={style.iconButtonContainer}>
        <IconButtons
          iconName="chatbubble-ellipses-outline"
          text="Chat with AyuAi to get instant health insights"
          onPress={handleChat}
        />
        <IconButtons
          iconName="document-text-outline"
          text="Generate Health Report and Export"
          onPress={handleChat}
        />
      </View>
      <Text style={GlobalStyles.primaryHeading}>History</Text>
      <FlatList
        data={historyData}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={style.historyListContainer}
        ListEmptyComponent={noHistoryComponent}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
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
