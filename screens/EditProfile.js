import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import InputText from "../components/InputText";
import InputDate from "../components/InputDate";
import InputSelect from "../components/InputSelect";
import InputTag from "../components/InputTag";
import InputSlider from "../components/InputSlider";
import { api } from "../api";
import endpoints from "../api/endpoint";
import { useSelector } from "react-redux";
import { getUserID } from "../utils";

import avatars from "../components/Avatars";

const EditProfile = ({ navigation, route }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[2]); // Default Avatar
  const [isModalVisible, setModalVisible] = useState(false);
  const newUser = route.params?.newUser;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [emergencyContact, setEmergencyContact] = useState("");

  const [gender, setGender] = useState("");
  const genderOptions = ["Male", "Female", "Other"];
  const [activityLevel, setActivityLevel] = useState("");
  const activityLevelOptions = [
    "Sedentary",
    "Lightly Active",
    "Moderately Active",
    "Very Active",
    "Super Active",
  ];
  const [bloodGroup, setBloodGroup] = useState("");
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const [fitnessGoal, setFitnessGoal] = useState("");
  const fitnessGoalOptions = [
    "Weight Loss",
    "Weight Gain",
    "Muscle Gain",
    "Fitness",
  ];
  const [medicalConditions, setMedicalConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");

  const [sleepHours, setSleepHours] = useState(8);
  const [stepsGoal, setStepsGoal] = useState(10000);

  // Get user data from Redux store
  const user = useSelector((state) => state.user);

  // Handle avatar selection
  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    setModalVisible(false); // Close modal after selecting
  };

  const updateProfile = async () => {
    const userId = await getUserID();
    console.log("User ID:", userId);
    const phone = user.userInfo.user.phoneNumbers[0];
    console.log("Phone:", phone);
    const profileData = {
      super_tokens_id: userId,
      phone: phone,
      name: fullName,
      dob: dob,
      weight: Number(weight),
      height: Number(height),
      gender: gender,
      email: email,
      activity_level: activityLevel,
      blood_type: bloodGroup,
      medical_conditions: medicalConditions ? medicalConditions.split(",") : [],
      allergies: allergies ? allergies.split(",") : [],
      medications: medications ? medications.split(",") : [],
      emergency_contact: emergencyContact,
      profile_picture: selectedAvatar,
      fitness_goal: fitnessGoal,
      sleep_hours: sleepHours,
      steps_per_day: stepsGoal,
    };

    try {
      console.log("Medical Conditions:", medicalConditions);
      console.log("Profile Data:", profileData);
      if (newUser) {
        const response = await api(endpoints.USER, "POST", profileData);
        if (response.status === 201) {
          console.log("Profile created successfully!", response.data);
          navigation.navigate("Home");
        } else {
          console.error("Failed to create profile:", response.data);
        }
      } else {
        const phoneNumber = phone.replace("+91", "");
        const response = await api(
          `${endpoints.USER}/${phoneNumber}`,
          "PUT",
          profileData
        );
        if (response.status === 200) {
          console.log("Profile updated successfully!", response.data);
          navigation.goBack();
        } else {
          console.error("Failed to update profile:", response.data);
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const getUserProfile = async () => {
    try {
      const phone = user?.userInfo?.user?.phoneNumbers?.[0];
      if (!phone) {
        console.error("Phone number not found.");
        return;
      }

      const phoneNumber = phone.replace("+91", "");
      const response = await api(`${endpoints.USER}/${phoneNumber}`);

      if (response.status === 200) {
        const profile = response.data;
        console.log("User Profile:", profile);

        // Set default values
        setFullName(profile.name || "");
        setEmail(profile.email || "");
        setDob(profile.dob || "");
        setWeight(profile.weight?.toString() || ""); // Convert to string
        setHeight(profile.height?.toString() || ""); // Convert to string
        setEmergencyContact(profile.emergency_contact || "");
        setGender(profile.gender || "");
        setActivityLevel(profile.activity_level || "");
        setBloodGroup(profile.blood_type || "");
        setFitnessGoal(profile.fitness_goal || "");
        setMedicalConditions(profile.medical_conditions?.join(", ") || "");
        setAllergies(profile.allergies?.join(", ") || ""); // Join array into string
        setMedications(profile.medications?.join(", ") || ""); // Join array into string
        setSleepHours(profile.sleep_hours || 8);
        setStepsGoal(profile.steps_per_day || 10000);
        setSelectedAvatar(profile.profile_picture || avatars[2]);
      } else {
        console.error("Failed to get user profile:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  useEffect(() => {
    console.log("User data:", user);
    console.log("New User:", newUser);
    if (!user.isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [user]);

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[GlobalStyles.container, styles.container]}>
          {/* Avatar Section */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.avatar}
          >
            <Image
              source={selectedAvatar}
              style={GlobalStyles.avatar}
              accessibilityLabel="Avatar"
            />
          </TouchableOpacity>

          {/* Profile Form */}
          <InputText
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />
          <InputText
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          <InputDate
            label="Date of Birth"
            placeholder="Select your date of birth"
            value={dob}
            onChangeText={setDob}
          />
          <InputText
            label="Weight"
            placeholder="Enter your weight in kg"
            value={weight}
            onChangeText={setWeight}
          />
          <InputText
            label="Height"
            placeholder="Enter your height in cm"
            value={height}
            onChangeText={setHeight}
          />
          <InputSelect
            label="Gender"
            placeholder="Select your Gender"
            value={gender}
            onChangeText={setGender}
            options={genderOptions}
          />
          <InputText
            label="Emergency Contact"
            placeholder="Enter emergency contact number"
            value={emergencyContact}
            onChangeText={setEmergencyContact}
            keyboardType="phone-pad"
          />
          <InputSelect
            label="Activity Level"
            placeholder="Select your activity level"
            value={activityLevel}
            onChangeText={setActivityLevel}
            options={activityLevelOptions}
          />
          <InputSelect
            label="Blood Group"
            placeholder="Select your blood group"
            value={bloodGroup}
            onChangeText={setBloodGroup}
            options={bloodGroupOptions}
          />
          <InputSelect
            label="Fitness Goal"
            placeholder="Select your fitness goal"
            value={fitnessGoal}
            onChangeText={setFitnessGoal}
            options={fitnessGoalOptions}
          />
          <InputTag
            label="Medical Conditions"
            placeholder="Enter any medical conditions"
            value={medicalConditions}
            onTagsChange={setMedicalConditions}
          />
          <InputTag
            label="Allergies"
            placeholder="Enter any allergies"
            value={allergies}
            onTagsChange={setAllergies}
          />
          <InputTag
            label="Medications"
            placeholder="Enter any medications"
            value={medications}
            onTagsChange={setMedications}
          />
          <InputSlider
            label="Sleep Hours"
            value={sleepHours}
            onValueChange={setSleepHours}
            min={4}
            max={12}
            step={0.5}
          />
          <InputSlider
            label="Steps Goal"
            value={stepsGoal}
            onValueChange={setStepsGoal}
            min={5000}
            max={20000}
            step={1000}
          />

          <TouchableOpacity
            style={[
              GlobalStyles.button,
              { alignItems: "center", marginBottom: 20 },
            ]}
            onPress={updateProfile}
          >
            <Text style={GlobalStyles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal for Avatar Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Your Avatar</Text>
            <FlatList
              data={avatars}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelectAvatar(item)}
                  style={styles.avatar}
                >
                  <Image
                    source={item}
                    style={[GlobalStyles.avatar, { margin: 5 }]}
                    accessibilityLabel="Avatar"
                  />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[GlobalStyles.button, { marginTop: 20 }]}
            >
              <Text style={GlobalStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  avatar: {
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#040F15",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#32CA9A",
  },
});

export default EditProfile;
