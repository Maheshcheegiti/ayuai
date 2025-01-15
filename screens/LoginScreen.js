import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import YogaImage from "../assets/images/yoga.png";
import { CountryPicker } from "react-native-country-codes-picker";
import GlobalStyles from "../components/GlobalStyles";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    dial_code: "+91",
    code: "IN",
  });

  const handleSendOTP = async () => {
    if (phoneNumber.trim().length === 10) {
      console.log(`${selectedCountry.dial_code}${phoneNumber}`);
      alert(`OTP sent to ${selectedCountry.dial_code} ${phoneNumber}`);
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={YogaImage} style={styles.image} resizeMode="contain" />

      {/* Title */}
      <Text style={GlobalStyles.primaryHeading}>Enter Your Mobile Number</Text>

      {/* Subtitle */}
      <Text style={GlobalStyles.primaryText}>
        Select your country code and enter your phone number.
      </Text>

      {/* Phone Input */}
      <View style={styles.phoneInputContainer}>
        {/* Country Code Selector */}
        <TouchableOpacity
          style={styles.countryPickerButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.callingCode}>{selectedCountry.dial_code}</Text>
        </TouchableOpacity>

        {/* Phone Number Input */}
        <TextInput
          style={styles.phoneInput}
          keyboardType="phone-pad"
          placeholder="Enter mobile number"
          placeholderTextColor="#757575"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={10}
        />
      </View>

      {/* Send OTP Button */}
      <TouchableOpacity style={GlobalStyles.button} onPress={handleSendOTP}>
        <Text style={GlobalStyles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      {/* Country Picker Modal */}
      <CountryPicker
        show={showPicker}
        pickerButtonOnPress={(item) => {
          setSelectedCountry(item);
          setShowPicker(false);
        }}
        enableModalAvoiding={true}
        inputPlaceholder="Search for a country"
        searchMessage="Country not found"
        style={{
          modal: { backgroundColor: "#040F15", height: 300 },
          line: { backgroundColor: "#32CA9A" },
          itemsList: { backgroundColor: "#040F15" },
          countryButtonStyles: {
            backgroundColor: "#000",
          },
          countryName: {
            color: "#32CA9A",
          },
          dialCode: {
            color: "#32CA9A",
          },
          textInput: {
            borderRadius: 5,
            padding: 10,
            backgroundColor: "#1A1A1A",
            color: "#FFFFFF",
          },
        }}
        onBackdropPress={() => setShowPicker(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#040F15",
    padding: 20,
  },
  image: {
    height: 200,
  },
  phoneInputContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    padding: 10,
    borderRadius: 8,
    marginVertical: 20,
  },
  countryPickerButton: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#32CA9A",
  },
  callingCode: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  phoneInput: {
    flex: 1,
    fontSize: 20,
    color: "#FFFFFF",
    paddingLeft: 10,
  },
});

export default LoginScreen;
