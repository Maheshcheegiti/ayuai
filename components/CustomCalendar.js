import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "../components/GlobalStyles";

const { width } = Dimensions.get("window");
const DAY_SIZE = (width - 70) / 7;

const CustomCalendar = ({ onWeekSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState([]);
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();

  // Get localized date string (YYYY-MM-DD)
  const getLocalDateString = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Generate calendar data with proper week handling
  const generateCalendar = () => {
    const monthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const monthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const startDay = monthStart.getDay();

    const calendar = [];

    // Previous month days
    const prevMonthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(prevMonthEnd);
      date.setDate(prevMonthEnd.getDate() - i);
      calendar.push({
        day: date.getDate(),
        date: getLocalDateString(date),
        currentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= monthEnd.getDate(); i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      calendar.push({
        day: i,
        date: getLocalDateString(date),
        currentMonth: true,
      });
    }

    // Next month days
    const daysNeeded = 42 - calendar.length; // 6 rows × 7 days
    for (let i = 1; i <= daysNeeded; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        i
      );
      calendar.push({
        day: i,
        date: getLocalDateString(date),
        currentMonth: false,
      });
    }

    return calendar;
  };

  // Handle week selection
  const handleWeekSelection = (dateString) => {
    const selectedDate = new Date(dateString);
    const week = [];

    // Get start of week (Sunday)
    const startDate = new Date(selectedDate);
    startDate.setDate(selectedDate.getDate() - selectedDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      week.push(getLocalDateString(day));
    }

    setSelectedWeek(week);
    onWeekSelect(week);
  };

  // Navigation handlers
  const changeMonth = (months) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + months);
    setCurrentDate(newDate);
  };

  const changeYear = (years) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + years);
    setCurrentDate(newDate);
  };

  const handleTodayPress = () => {
    const today = new Date();
    setCurrentDate(today);
    handleWeekSelection(getLocalDateString(today));
  };

  // Set initial selected week
  useEffect(() => {
    handleWeekSelection(getLocalDateString(new Date()));
  }, []);

  // Render calendar day
  const renderDay = ({ item }) => {
    const isSelected = selectedWeek.includes(item.date);
    const isToday = item.date === getLocalDateString(new Date());

    return (
      <TouchableOpacity
        style={[
          styles.day,
          isSelected && styles.selectedDay,
          isToday && !isSelected && styles.todayDay,
          !item.currentMonth && styles.otherMonthDay,
        ]}
        onPress={() => handleWeekSelection(item.date)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dayText,
            isSelected && styles.selectedDayText,
            !item.currentMonth && styles.otherMonthText,
          ]}
        >
          {item.day}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.calendarContainer}>
      {/* Header Navigation */}
      <View style={styles.header}>
        {/* Left Navigation */}
        <View style={styles.navGroup}>
          <TouchableOpacity
            onPress={() => changeYear(-1)}
            style={styles.navButton}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="chevron-back" size={24} color="#32CA9A" />
            <Ionicons name="chevron-back" size={24} color="#32CA9A" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => changeMonth(-1)}
            style={styles.navButton}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="chevron-back" size={24} color="#32CA9A" />
          </TouchableOpacity>
        </View>

        {/* Center: Month/Year + Today Button */}
        <View style={styles.centerContainer}>
          <Text style={GlobalStyles.primaryHeading}>
            {currentDate.toLocaleString("default", { month: "short" })}{" "}
            {currentDate.getFullYear()}
          </Text>
          {currentDate.getMonth() === todayMonth &&
          currentDate.getFullYear() === todayYear ? null : (
            <TouchableOpacity
              onPress={handleTodayPress}
              style={styles.todayButton}
            >
              <Text style={styles.todayButtonText}>Today</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Right Navigation */}
        <View style={styles.navGroup}>
          <TouchableOpacity
            onPress={() => changeMonth(1)}
            style={styles.navButton}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="chevron-forward" size={24} color="#32CA9A" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => changeYear(1)}
            style={styles.navButton}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="chevron-forward" size={24} color="#32CA9A" />
            <Ionicons name="chevron-forward" size={24} color="#32CA9A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Weekday Labels */}
      <View style={styles.weekDays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <FlatList
        data={generateCalendar()}
        renderItem={renderDay}
        keyExtractor={(item, index) => `${item.date}-${index}`}
        numColumns={7}
        scrollEnabled={false}
        contentContainerStyle={styles.calendarGrid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: "#FFFFFF22",
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  centerContainer: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  navGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  todayButton: {
    backgroundColor: "#32CA9A",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  todayButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  navButton: {
    flexDirection: "row",
    padding: 5,
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 14,
    color: "#32CA9A",
    fontWeight: "bold",
    width: DAY_SIZE,
    textAlign: "center",
  },
  calendarGrid: {
    justifyContent: "center",
  },
  day: {
    width: DAY_SIZE - 4,
    height: DAY_SIZE - 4,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
    marginHorizontal: 3.5,
    borderRadius: (DAY_SIZE - 4) / 2,
  },
  dayText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  otherMonthText: {
    color: "#FFFFFF88",
  },
  selectedDay: {
    backgroundColor: "#32CA9A",
  },
  selectedDayText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  todayDay: {
    borderWidth: 2,
    borderColor: "#32CA9A",
  },
  otherMonthDay: {
    backgroundColor: "#FFFFFF11",
  },
});

export default CustomCalendar;
