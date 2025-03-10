import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

// Sample blog data with categories
const blogs = [
  {
    id: "1",
    title: "10 Tips for a Healthy Lifestyle",
    description:
      "Discover simple yet effective tips to maintain a healthy lifestyle and improve your overall well-being.",
    image: require("../assets/discover/yoga.png"), // Replace with actual image path
    category: "Lifestyle",
  },
  {
    id: "2",
    title: "The Importance of Mental Health",
    description:
      "Learn why mental health is just as important as physical health and how to take care of it.",
    image: require("../assets/discover/yoga.png"), // Replace with actual image path
    category: "Mental Health",
  },
  {
    id: "3",
    title: "Best Foods for Boosting Immunity",
    description:
      "Explore the top foods that can help strengthen your immune system and keep you healthy.",
    image: require("../assets/discover/yoga.png"), // Replace with actual image path
    category: "Nutrition",
  },
  {
    id: "4",
    title: "How to Stay Fit at Home",
    description:
      "Find out how to stay active and fit without leaving your home.",
    image: require("../assets/discover/yoga.png"), // Replace with actual image path
    category: "Fitness",
  },
  {
    id: "5",
    title: "The Science of Sleep",
    description:
      "Understand the importance of sleep and how to improve your sleep quality.",
    image: require("../assets/discover/yoga.png"), // Replace with actual image path
    category: "Lifestyle",
  },
  {
    id: "6",
    title: "Yoga for Beginners",
    description:
      "A beginner's guide to starting yoga and its benefits for mental and physical health.",
    image: require("../assets/discover/yoga.png"), // Replace with actual image path
    category: "Fitness",
  },
];

const DiscoverScreen = () => {
  // State for liked and bookmarked blogs
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);

  // State for search and category filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Function to handle liking a blog
  const handleLike = (blogId) => {
    if (likedBlogs.includes(blogId)) {
      setLikedBlogs(likedBlogs.filter((id) => id !== blogId));
    } else {
      setLikedBlogs([...likedBlogs, blogId]);
    }
  };

  // Function to handle bookmarking a blog
  const handleBookmark = (blogId) => {
    if (bookmarkedBlogs.includes(blogId)) {
      setBookmarkedBlogs(bookmarkedBlogs.filter((id) => id !== blogId));
    } else {
      setBookmarkedBlogs([...bookmarkedBlogs, blogId]);
    }
  };

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Separate the first blog from the rest
  const firstBlog = filteredBlogs[0];
  const remainingBlogs = filteredBlogs.slice(1);

  // Unique categories for filtering
  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];

  return (
    <View style={[GlobalStyles.container, styles.discoverContainer]}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search blogs..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
      />

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Blog List */}
      <ScrollView>
        {/* Full-width first blog */}
        {firstBlog && (
          <View style={styles.fullWidthCard}>
            <Image source={firstBlog.image} style={styles.fullWidthImage} />
            <View style={styles.overlay}>
              <Text style={styles.fullWidthTitle}>{firstBlog.title}</Text>
              <Text style={styles.fullWidthDescription}>
                {firstBlog.description}
              </Text>
              <View style={styles.fullWidthActions}>
                <TouchableOpacity
                  onPress={() => handleLike(firstBlog.id)}
                  style={styles.iconButton}
                >
                  <Ionicons
                    name={
                      likedBlogs.includes(firstBlog.id)
                        ? "heart"
                        : "heart-outline"
                    }
                    size={28}
                    color={
                      likedBlogs.includes(firstBlog.id) ? "red" : "#FFFFFF"
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleBookmark(firstBlog.id)}
                  style={styles.iconButton}
                >
                  <Ionicons
                    name={
                      bookmarkedBlogs.includes(firstBlog.id)
                        ? "bookmark"
                        : "bookmark-outline"
                    }
                    size={28}
                    color={
                      bookmarkedBlogs.includes(firstBlog.id)
                        ? "#32CA9A"
                        : "#FFFFFF"
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Grid for remaining blogs */}
        <FlatList
          data={remainingBlogs}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.gridItem,
                index % 2 === 0 && styles.gridItemWithMargin, // Add margin to the first item in each row
              ]}
            >
              <Image source={item.image} style={styles.gridImage} />
              <View style={styles.gridContent}>
                <Text style={styles.blogTitle}>{item.title}</Text>
                <Text style={styles.blogDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <View style={styles.actionButtons}>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    onPress={() => handleLike(item.id)}
                    style={styles.iconButton}
                  >
                    <Ionicons
                      name={
                        likedBlogs.includes(item.id) ? "heart" : "heart-outline"
                      }
                      size={24}
                      color={likedBlogs.includes(item.id) ? "red" : "#0C9EB1"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleBookmark(item.id)}
                    style={styles.iconButton}
                  >
                    <Ionicons
                      name={
                        bookmarkedBlogs.includes(item.id)
                          ? "bookmark"
                          : "bookmark-outline"
                      }
                      size={24}
                      color={
                        bookmarkedBlogs.includes(item.id)
                          ? "#32CA9A"
                          : "#0C9EB1"
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          scrollEnabled={false} // Disable scrolling since we're inside ScrollView
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  discoverContainer: {
    padding: 15,
  },
  searchBar: {
    height: 50,
    borderColor: "#32CA9A",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#FFFFFFCC",
    backgroundColor: "#FFFFFF11",
  },
  categoryContainer: {
    paddingVertical: 10,
  },
  categoryButton: {
    borderRadius: 20,
    backgroundColor: "#E5F9F622",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    height: 30,
    marginBottom: 10,
  },
  selectedCategoryButton: {
    backgroundColor: "#32CA9A",
  },
  categoryText: {
    fontSize: 14,
    color: "#0C9EB1",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  fullWidthCard: {
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  fullWidthImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  fullWidthTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 8,
  },
  fullWidthDescription: {
    fontSize: 16,
    color: "#FFFFFFDD",
    lineHeight: 22,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  fullWidthActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    marginTop: 20,
  },
  gridContainer: {
    paddingBottom: 50,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#FFFFFF11",
    borderColor: "#32CA9A44",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    overflow: "hidden",
  },
  gridItemWithMargin: {
    marginRight: "4%",
  },
  gridImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  gridContent: {
    padding: 12,
    flex: 1,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0C9EB1",
  },
  blogDescription: {
    fontSize: 14,
    color: "#FFFFFFCC",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  iconButton: {
    padding: 5,
  },
});

export default DiscoverScreen;
