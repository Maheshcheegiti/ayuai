import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import CustomCalendar from "../components/CustomCalendar";
import { api } from "../api";
import endpoints from "../api/endpoint";
import { getUserIDforEdamam } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { setMealPlanner } from "../store/slices/userSlice";
import { Ionicons } from "@expo/vector-icons";
import LoadingLogo from "../components/LoadingLogo";

const MealPlannerScreen = () => {
  const [selectedWeek, setSelectedWeek] = useState([]);
  const [weekStatus, setWeekStatus] = useState(false);
  const mealPlanner = useSelector((state) => state.user.mealplan);
  const [mealPlan, setMealPlan] = useState(mealPlanner ? mealPlanner : null);
  const dispatch = useDispatch();
  const [expandedDay, setExpandedDay] = useState(null);
  const [loading, setLoading] = useState(false);

  const mealPlanBody = {
    size: 7,
    plan: {
      accept: {
        all: [
          {
            health: ["SOY_FREE", "FISH_FREE", "MEDITERRANEAN"],
          },
        ],
      },
      fit: {
        ENERC_KCAL: {
          min: 1000,
          max: 2000,
        },
        "SUGAR.added": {
          max: 20,
        },
      },
      sections: {
        Breakfast: {
          accept: {
            all: [
              {
                dish: [
                  "drinks",
                  "egg",
                  "biscuits and cookies",
                  "bread",
                  "pancake",
                  "cereals",
                ],
              },
              {
                meal: ["breakfast"],
              },
            ],
          },
          fit: {
            ENERC_KCAL: {
              min: 100,
              max: 600,
            },
          },
        },
        Lunch: {
          accept: {
            all: [
              {
                dish: [
                  "main course",
                  "pasta",
                  "egg",
                  "salad",
                  "soup",
                  "sandwiches",
                  "pizza",
                  "seafood",
                ],
              },
              {
                meal: ["lunch/dinner"],
              },
            ],
          },
          fit: {
            ENERC_KCAL: {
              min: 300,
              max: 900,
            },
          },
        },
        Dinner: {
          accept: {
            all: [
              {
                dish: [
                  "seafood",
                  "egg",
                  "salad",
                  "pizza",
                  "pasta",
                  "main course",
                ],
              },
              {
                meal: ["lunch/dinner"],
              },
            ],
          },
          fit: {
            ENERC_KCAL: {
              min: 200,
              max: 900,
            },
          },
        },
      },
    },
  };

  const handleWeekSelect = (week) => {
    setSelectedWeek(week);
  };

  const checkWeekStatus = () => {};

  const fetchRecipeDetails = async (recipeURI) => {
    const userID = await getUserIDforEdamam();
    try {
      const response = await api(
        endpoints.MEAL_PLANNER_RECIPES + recipeURI.split("#")[1],
        "GET",
        null,
        {
          "Edamam-Account-User": userID,
        },
        {},
        true
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch recipe details:", error);
      return null;
    }
  };

  const generateMealPlan = async () => {
    console.log("Generating meal plan for week:", selectedWeek);
    const userID = await getUserIDforEdamam();
    console.log("User ID:", userID);
    setLoading(true);
    try {
      // Step 1: Generate the meal plan
      const mealPlanResponse = await api(
        endpoints.MEAL_PLANNER,
        "POST",
        mealPlanBody,
        {
          "Edamam-Account-User": userID,
        },
        {
          type: "public",
          beta: true,
        },
        true
      );

      console.log("Meal Plan Response:", mealPlanResponse.data);

      // Step 2: Fetch recipe details for each assigned recipe
      const mealPlanWithDetails = await Promise.all(
        mealPlanResponse.data.selection.map(async (day) => {
          const sectionsWithDetails = {};

          // Fetch details for each section (Breakfast, Lunch, Dinner)
          for (const [sectionName, sectionData] of Object.entries(
            day.sections
          )) {
            const recipeDetails = await fetchRecipeDetails(
              sectionData.assigned
            );
            sectionsWithDetails[sectionName] = {
              ...sectionData,
              details: recipeDetails, // Add recipe details to the section
            };
          }

          return {
            ...day,
            sections: sectionsWithDetails, // Replace sections with detailed sections
          };
        })
      );

      // Step 3: Store the entire meal plan with recipe details
      setMealPlan({
        ...mealPlanResponse.data,
        selection: mealPlanWithDetails, // Replace selection with detailed selection
      });

      console.log("Meal Plan with Details:", {
        ...mealPlanResponse.data,
        selection: mealPlanWithDetails,
      });
    } catch (error) {
      console.error("Failed to generate meal plan:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(setMealPlanner(mealPlan));
  }, [mealPlan]);

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <CustomCalendar onWeekSelect={handleWeekSelect} />
      {weekStatus ? (
        <TouchableOpacity style={[GlobalStyles.button, styles.mealButton]}>
          <Text style={GlobalStyles.buttonText}>Update Meal Plan</Text>
        </TouchableOpacity>
      ) : loading ? (
        <TouchableOpacity style={[GlobalStyles.button, styles.mealButton]}>
          <Text style={GlobalStyles.buttonText}>
            Preparing your meal plan...
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[GlobalStyles.button, styles.mealButton]}
          onPress={() => generateMealPlan()}
        >
          <Text style={GlobalStyles.buttonText}>Generate Meal Plan</Text>
        </TouchableOpacity>
      )}

      {loading && (
        <View style={styles.centerLogo}>
          <LoadingLogo size={80} />
        </View>
      )}

      {
        <ScrollView style={styles.scrollContainer}>
          {mealPlan &&
            mealPlan.selection.map((day, index) => (
              <View key={index} style={styles.card}>
                {/* Card Header */}
                <TouchableOpacity
                  style={styles.cardHeader}
                  onPress={() =>
                    setExpandedDay(expandedDay === index ? null : index)
                  }
                >
                  <View style={styles.dayHeader}>
                    <Text style={styles.cardTitle}>Day {index + 1}</Text>
                    <Ionicons name="create-outline" size={24} color="#32CA9A" />
                  </View>

                  {/* Horizontal Meal Thumbnails */}
                  {expandedDay !== index && (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.thumbnailContainer}
                    >
                      {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                        <View key={meal} style={styles.thumbnailWrapper}>
                          <Text style={styles.mealType}>{meal}</Text>
                          <Image
                            source={{
                              uri: day.sections[meal].details.recipe.images
                                .THUMBNAIL.url,
                            }}
                            style={styles.thumbnail}
                          />
                          <Text
                            style={styles.mealLabel}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {day.sections[meal].details.recipe.label}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  )}
                </TouchableOpacity>

                {/* Expanded Content */}
                {expandedDay === index && (
                  <View style={styles.accordionContent}>
                    {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                      <View key={meal} style={styles.mealRow}>
                        <View style={styles.mealDetails}>
                          <View style={styles.mealRowHeader}>
                            <Image
                              source={{
                                uri: day.sections[meal].details.recipe.image,
                              }}
                              style={styles.mealImage}
                            />
                            <View style={styles.mealDetailsContent}>
                              <Text style={styles.mealType}>{meal}</Text>
                              <Text style={styles.mealName}>
                                {day.sections[meal].details.recipe.label}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.nutritionTable}>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Energy</Text>
                              <Text style={styles.nutritionValue}>
                                {day.sections[
                                  meal
                                ].details.recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(
                                  2
                                )}{" "}
                                {
                                  day.sections[meal].details.recipe
                                    .totalNutrients.ENERC_KCAL.unit
                                }
                              </Text>
                            </View>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Weight</Text>
                              <Text style={styles.nutritionValue}>
                                {day.sections[
                                  meal
                                ].details.recipe.totalWeight.toFixed(2)}{" "}
                                g
                              </Text>
                            </View>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Fat</Text>
                              <Text style={styles.nutritionValue}>
                                {day.sections[
                                  meal
                                ].details.recipe.totalNutrients.FAT.quantity.toFixed(
                                  2
                                )}{" "}
                                {
                                  day.sections[meal].details.recipe
                                    .totalNutrients.FAT.unit
                                }
                              </Text>
                            </View>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Sugars</Text>
                              <Text style={styles.nutritionValue}>
                                {day.sections[
                                  meal
                                ].details.recipe.totalNutrients.SUGAR.quantity.toFixed(
                                  2
                                )}{" "}
                                {
                                  day.sections[meal].details.recipe
                                    .totalNutrients.SUGAR.unit
                                }
                              </Text>
                            </View>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Protein</Text>
                              <Text style={styles.nutritionValue}>
                                {day.sections[
                                  meal
                                ].details.recipe.totalNutrients.PROCNT.quantity.toFixed(
                                  2
                                )}{" "}
                                {
                                  day.sections[meal].details.recipe
                                    .totalNutrients.PROCNT.unit
                                }
                              </Text>
                            </View>

                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Carbs</Text>
                              <Text style={styles.nutritionValue}>
                                {day.sections[
                                  meal
                                ].details.recipe.totalNutrients.CHOCDF.quantity.toFixed(
                                  2
                                )}{" "}
                                {
                                  day.sections[meal].details.recipe
                                    .totalNutrients.CHOCDF.unit
                                }
                              </Text>
                            </View>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>Fiber</Text>
                              <Text style={styles.nutritionValue}>
                                {day.sections[
                                  meal
                                ].details.recipe.totalNutrients.FIBTG.quantity.toFixed(
                                  2
                                )}{" "}
                                {
                                  day.sections[meal].details.recipe
                                    .totalNutrients.FIBTG.unit
                                }
                              </Text>
                            </View>
                            <View style={styles.nutritionRow}>
                              <Text style={styles.nutritionLabel}>
                                Cholesterol
                              </Text>
                              <Text style={styles.nutritionValue}>
                                {day.sections[
                                  meal
                                ].details.recipe.totalNutrients.CHOLE.quantity.toFixed(
                                  2
                                )}{" "}
                                {
                                  day.sections[meal].details.recipe
                                    .totalNutrients.CHOLE.unit
                                }
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
        </ScrollView>
      }
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  mealButton: {
    marginTop: 10,
    alignItems: "center",
  },
  scrollContainer: {
    marginBottom: 60,
  },
  card: {
    backgroundColor: "#FFFFFF22",
    borderRadius: 10,
    marginTop: 10,
  },
  cardHeader: {
    padding: 15,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#32CA9A",
  },
  thumbnailContainer: {
    justifyContent: "center",
  },
  thumbnailWrapper: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 5,
  },
  mealType: {
    fontSize: 12,
    color: "#FFFFFFCC",
    marginBottom: 5,
    backgroundColor: "#32CA9A",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    textAlign: "center",
  },
  mealLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#32CA9A",
    width: 100,
  },
  accordionContent: {
    padding: 15,
  },
  mealRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  mealRowHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  mealDetailsContent: {
    flex: 1,
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  mealDetails: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#D3D3D3",
  },
  nutritionTable: {
    backgroundColor: "#FFFFFF22",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  nutritionLabel: {
    color: "#FFFFFFCC",
  },
  nutritionValue: {
    color: "#32CA9A",
  },
  centerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealPlannerScreen;
