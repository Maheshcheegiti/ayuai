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

const blogs = [
  {
    id: "1",
    title: "10 Tips for a Healthy Lifestyle",
    description:
      "Discover simple yet effective tips to maintain a healthy lifestyle and improve your overall well-being.",
    image: require("../assets/discover/yoga.png"), // Replace with actual image path
    category: "Lifestyle",
    content: `<div><h2>Introduction</h2>
<p>In today's fast-paced world, maintaining a healthy lifestyle has become more important than ever. These 10 practical tips will help you create sustainable habits for better physical and mental well-being.</p>

<h3>1. Stay Hydrated</h3>
<p>Drink at least 8 glasses of water daily. Proper hydration:</p>
<ul>
  <li>Boosts metabolism</li>
  <li>Improves cognitive function</li>
  <li>Helps detoxify your body</li>
</ul>

<h3>2. Prioritize Sleep</h3>
<p>Aim for 7-9 hours of quality sleep each night. Create a bedtime routine by:</p>
<ul>
  <li>Avoiding screens before bed</li>
  <li>Keeping your bedroom cool and dark</li>
  <li>Maintaining consistent sleep/wake times</li>
</ul>

<h3>3. Balanced Nutrition</h3>
<p>Fill your plate with:</p>
<ul>
  <li>50% vegetables and fruits</li>
  <li>25% lean proteins</li>
  <li>25% whole grains</li>
</ul>

<h3>4. Regular Exercise</h3>
<p>Incorporate both cardio and strength training:</p>
<ul>
  <li>150 minutes of moderate cardio weekly</li>
  <li>2-3 strength training sessions weekly</li>
  <li>Daily stretching or yoga</li>
</ul>

<h3>5. Mindful Eating</h3>
<p>Practice portion control and:</p>
<ul>
  <li>Eat slowly and savor each bite</li>
  <li>Avoid distractions while eating</li>
  <li>Listen to your body's hunger cues</li>
</ul>

<h3>6. Stress Management</h3>
<p>Implement relaxation techniques:</p>
<ul>
  <li>Deep breathing exercises</li>
  <li>Meditation or mindfulness</li>
  <li>Journaling or creative hobbies</li>
</ul>

<h3>7. Regular Health Check-ups</h3>
<p>Schedule annual:</p>
<ul>
  <li>Physical exams</li>
  <li>Blood tests</li>
  <li>Dental cleanings</li>
</ul>

<h3>8. Limit Processed Foods</h3>
<p>Reduce consumption of:</p>
<ul>
  <li>Added sugars</li>
  <li>Artificial additives</li>
  <li>Refined carbohydrates</li>
</ul>

<h3>9. Stay Socially Connected</h3>
<p>Maintain relationships through:</p>
<ul>
  <li>Weekly social activities</li>
  <li>Volunteer work</li>
  <li>Family time</li>
</ul>

<h3>10. Practice Gratitude</h3>
<p>Keep a daily gratitude journal to:</p>
<ul>
  <li>Improve mental outlook</li>
  <li>Reduce anxiety</li>
  <li>Enhance emotional resilience</li>
</ul>

<h2>Conclusion</h2>
<p>Implementing these habits gradually can lead to significant improvements in your overall health. Remember, consistency is key when building a sustainable healthy lifestyle!</p></div>`,
  },
  {
    id: "2",
    title: "The Importance of Mental Health",
    description: "Learn why mental health...",
    image: require("../assets/discover/mentalhealth.jpg"),
    category: "Mental Health",
    content: `
<div>
  <h2>Why Mental Health Matters</h2>
  <p>Mental health affects every aspect of our lives...</p>
  
  <h3>1. Emotional Well-being</h3>
  <p>Good mental health helps us:</p>
  <ul>
    <li>Manage stress effectively</li>
    <li>Maintain healthy relationships</li>
    <li>Make better life decisions</li>
  </ul>

  <h3>2. Physical Health Connection</h3>
  <p>Mental and physical health are deeply connected:</p>
  <ul>
    <li>Chronic stress weakens immune function</li>
    <li>Anxiety can cause physical symptoms</li>
    <li>Depression often accompanies chronic illness</li>
  </ul>

  <h3>3. Workplace Impact</h3>
  <p>Mental health issues cost the global economy $1 trillion annually...</p>

  <h3>4. Self-Care Strategies</h3>
  <p>Implement these practices:</p>
  <ul>
    <li>Mindfulness meditation</li>
    <li>Regular journaling</li>
    <li>Breathing exercises</li>
    <li>Digital detox periods</li>
  </ul>

  <h2>Seeking Help</h2>
  <p>Remember: Seeking therapy is a sign of strength...</p>
</div>`,
  },
  {
    id: "3",
    title: "Best Foods for Boosting Immunity",
    description: "Explore the top foods...",
    image: require("../assets/discover/bestfood.jpeg"),
    category: "Nutrition",
    content: `
<div>
  <h2>Immune-Boosting Superfoods</h2>
  
  <h3>1. Citrus Fruits</h3>
  <p>Oranges, lemons, and grapefruits contain:</p>
  <ul>
    <li>Vitamin C (78% DV in one orange)</li>
    <li>Antioxidants</li>
    <li>Anti-inflammatory compounds</li>
  </ul>

  <h3>2. Leafy Greens</h3>
  <p>Spinach and kale provide:</p>
  <ul>
    <li>Vitamin A (200% DV/cup)</li>
    <li>Folate</li>
    <li>Iron</li>
  </ul>

  <h3>3. Fermented Foods</h3>
  <p>Yogurt, kimchi, and sauerkraut contain:</p>
  <ul>
    <li>Probiotics (10<sup>8</sup>-10<sup>11</sup> CFU)</li>
    <li>Vitamin K2</li>
    <li>Enzymes for digestion</li>
  </ul>

  <h3>4. Nuts & Seeds</h3>
  <p>Almonds and sunflower seeds offer:</p>
  <ul>
    <li>Vitamin E (37% DV/oz)</li>
    <li>Zinc</li>
    <li>Healthy fats</li>
  </ul>

  <h2>Nutrition Tips</h2>
  <p>Aim for:</p>
  <ul>
    <li>5-7 servings of fruits/vegetables daily</li>
    <li>2-3 servings of probiotics/week</li>
    <li>Omega-3 rich foods 3x/week</li>
  </ul>
</div>`,
  },
  {
    id: "4",
    title: "How to Stay Fit at Home",
    description: "Find out how to stay active...",
    image: require("../assets/discover/stayfit.jpg"),
    category: "Fitness",
    content: `
<div>
  <h2>Home Workout Essentials</h2>
  
  <h3>1. Bodyweight Exercises</h3>
  <p>Try these effective moves:</p>
  <ul>
    <li>Push-ups (3 sets of 15)</li>
    <li>Squats (4 sets of 20)</li>
    <li>Plank variations (60-second holds)</li>
  </ul>

  <h3>2. HIIT Workouts</h3>
  <p>Sample 20-minute routine:</p>
  <ul>
    <li>Jumping jacks (45 sec)</li>
    <li>Mountain climbers (30 sec)</li>
    <li>Burpees (45 sec)</li>
    <li>Rest (30 sec)</li>
    <li>Repeat 4x</li>
  </ul>

  <h3>3. Yoga & Stretching</h3>
  <p>Include these poses:</p>
  <ul>
    <li>Downward dog</li>
    <li>Warrior II</li>
    <li>Child's pose</li>
  </ul>

  <h3>4. Home Equipment Options</h3>
  <p>Consider these space-saving tools:</p>
  <ul>
    <li>Resistance bands</li>
    <li>Adjustable dumbbells</li>
    <li>Yoga mat</li>
  </ul>

  <h2>Progress Tracking</h2>
  <p>Use apps to track:</p>
  <ul>
    <li>Daily workout duration</li>
    <li>Calorie expenditure</li>
    <li>Strength improvements</li>
  </ul>
</div>`,
  },
  {
    id: "5",
    title: "The Science of Sleep",
    description: "Understand the importance...",
    image: require("../assets/discover/sleep.jpg"),
    category: "Lifestyle",
    content: `
<div>
  <h2>Sleep Architecture</h2>
  <p>Normal sleep cycle includes:</p>
  <ul>
    <li>N1 (Light Sleep): 5-10%</li>
    <li>N2 (True Sleep): 45-55%</li>
    <li>N3 (Deep Sleep): 15-25%</li>
    <li>REM Sleep: 20-25%</li>
  </ul>

  <h3>Sleep Deprivation Effects</h3>
  <p>After 24 hours without sleep:</p>
  <ul>
    <li>60% reduction in cognitive performance</li>
    <li>300% increase in emotional reactivity</li>
    <li>11% decrease in glucose metabolism</li>
  </ul>

  <h3>Optimal Sleep Environment</h3>
  <p>Create these conditions:</p>
  <ul>
    <li>Temperature: 60-67°F (15-19°C)</li>
    <li>Light: <5 lux</li>
    <li>Noise: <30 dB</li>
  </ul>

  <h3>Sleep Hygiene Tips</h3>
  <p>Implement these habits:</p>
  <ul>
    <li>Consistent bedtime (±30 mins)</li>
    <li>No screens 2 hours before bed</li>
    <li>Magnesium-rich evening snack</li>
  </ul>

  <h2>Sleep Tracking</h2>
  <p>Monitor these metrics:</p>
  <ul>
    <li>Total sleep time</li>
    <li>REM cycle duration</li>
    <li>Awakenings per night</li>
  </ul>
</div>`,
  },
  {
    id: "6",
    title: "Yoga for Beginners",
    description: "A beginner's guide...",
    image: require("../assets/discover/yogabeginer.jpg"),
    category: "Fitness",
    content: `
<div>
  <h2>Getting Started</h2>
  <p>Essential beginner poses:</p>
  <ul>
    <li>Mountain Pose (Tadasana)</li>
    <li>Child's Pose (Balasana)</li>
    <li>Cat-Cow Stretch (Marjaryasana)</li>
  </ul>

  <h3>5-Step Morning Routine</h3>
  <p>15-minute sequence:</p>
  <ol>
    <li>Neck rolls (2 mins)</li>
    <li>Sun salutations (5 reps)</li>
    <li>Warrior I (3 mins/side)</li>
    <li>Tree pose (2 mins/side)</li>
    <li>Corpse pose (3 mins)</li>
  </ol>

  <h3>Benefits Tracker</h3>
  <p>Track these improvements:</p>
  <ul>
    <li>Flexibility gains</li>
    <li>Stress reduction</li>
    <li>Breath control</li>
  </ul>

  <h3>Safety Tips</h3>
  <p>Remember to:</p>
  <ul>
    <li>Warm up properly</li>
    <li>Use props (blocks/straps)</li>
    <li>Modify poses as needed</li>
  </ul>

  <h2>Progression Plan</h2>
  <p>4-week roadmap:</p>
  <ul>
    <li>Week 1: Basic poses</li>
    <li>Week 2: Flow sequences</li>
    <li>Week 3: Balance poses</li>
    <li>Week 4: Full practice</li>
  </ul>
</div>`,
  },
];

const DiscoverScreen = ({ navigation }) => {
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

  const handleBlogPress = (blog) => {
    navigation.navigate("Blog", blog);
  };

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
          <TouchableOpacity onPress={() => handleBlogPress(firstBlog)}>
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
          </TouchableOpacity>
        )}

        {/* Grid for remaining blogs */}
        <FlatList
          data={remainingBlogs}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleBlogPress(item)}
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
            </TouchableOpacity>
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
