import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import GlobalStyles from "./GlobalStyles"; // Assuming GlobalStyles is available

const InputTag = ({
  placeholder = "Enter tag", // Default placeholder text
  onTagsChange, // Callback to notify parent about tag changes
  value = "", // Tags passed from parent as a comma-separated string
  maxTags = 10, // Limit the number of tags
  tagColor = "#32CA9A", // Custom tag background color
  tagTextColor = "#fff", // Custom tag text color
  tagDeleteColor = "#fff", // Custom delete icon color
  label = "Tags", // Label for the input field
}) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Sync tags with the `value` prop when it changes
  useEffect(() => {
    if (value) {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setTags(tagsArray);
    } else {
      setTags([]);
    }
  }, [value]);

  // Function to add a tag
  const addTag = () => {
    if (
      inputValue.trim() !== "" &&
      !tags.includes(inputValue.trim()) &&
      tags.length < maxTags
    ) {
      const updatedTags = [...tags, inputValue.trim()];
      setTags(updatedTags);
      setInputValue(""); // Reset input value after adding the tag

      // Notify parent component about the tags update
      if (onTagsChange) onTagsChange(updatedTags.join(", "));
    }
  };

  // Handle Enter press to add tag
  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Enter") {
      addTag();
    }
  };

  return (
    <View style={GlobalStyles.container}>
      {label && <Text style={GlobalStyles.primaryText}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={addTag} // Adds tag on Enter key press
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        returnKeyType="done"
        onKeyPress={handleKeyPress} // For handling Enter key press on some platforms
      />
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: tagColor }]}>
            <Text style={[styles.tagText, { color: tagTextColor }]}>{tag}</Text>
            <Text
              style={[styles.deleteText, { color: tagDeleteColor }]}
              onPress={() => {
                const updatedTags = tags.filter((t) => t !== tag);
                setTags(updatedTags);
                if (onTagsChange) onTagsChange(updatedTags.join(", "));
              }}
            >
              ×
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "#32CA9A",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#FFFFFFCC", // Same as text color from InputText
    backgroundColor: "#FFFFFF22", // Matching background color from InputText
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Ensures tags wrap onto new lines if necessary
    marginTop: 5,
    maxWidth: "100%", // Prevents overflow outside the container
  },
  tag: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  tagText: {
    fontSize: 14,
  },
  deleteText: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 5,
    cursor: "pointer",
  },
});

export default InputTag;
