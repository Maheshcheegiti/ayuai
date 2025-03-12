import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "../components/GlobalStyles";
import HTML from "react-native-render-html";

const BlogPage = ({ navigation, route }) => {
  const { title, image, content } = route.params;
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);

  const handleLike = (id) => {
    setLikedBlogs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookmark = (id) => {
    setBookmarkedBlogs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);

  return (
    <ScrollView style={[GlobalStyles.container, styles.container]}>
      {/* Header Image */}
      <Image source={image} style={styles.headerImage} />

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => handleLike(route.params.id)}
          style={styles.iconButton}
        >
          <Ionicons
            name={
              likedBlogs.includes(route.params.id) ? "heart" : "heart-outline"
            }
            size={24}
            color={likedBlogs.includes(route.params.id) ? "#E74C3C" : "#0C9EB1"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleBookmark(route.params.id)}
          style={styles.iconButton}
        >
          <Ionicons
            name={
              bookmarkedBlogs.includes(route.params.id)
                ? "bookmark"
                : "bookmark-outline"
            }
            size={24}
            color={
              bookmarkedBlogs.includes(route.params.id) ? "#32CA9A" : "#0C9EB1"
            }
          />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <HTML
          source={{ html: content }}
          contentWidth={300}
          baseStyle={styles.contentText}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  headerImage: {
    height: 250,
    width: "100%",
    borderRadius: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
    gap: 20,
  },
  iconButton: {
    padding: 8,
    borderRadius: 30,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2C3E50",
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#34495E",
    textAlign: "justify",
  },
});

export default BlogPage;
