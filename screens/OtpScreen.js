import React, { useState, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import NamasteImage from "../assets/images/namaste.png";
import AlertBar from "../components/AlertBar";
import { api } from "../api";
import endpoints from "../api/endpoint";
import { setUserInfo } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import SuperTokens from "supertokens-react-native";

const OtpScreen = ({ route, navigation }) => {
  const { countryCode, phoneNumber, deviceId, preAuthSessionId } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(60);
  const [alert, setAlert] = useState(null);
  const dispatch = useDispatch();

  async function getJWT() {
    if (await SuperTokens.doesSessionExist()) {
      let userId = await SuperTokens.getUserId();
      let jwt = await SuperTokens.getAccessToken();

      console.log("User ID:", userId);
      console.log("JWT:", jwt);
    }
  }

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      setLoading(true);
      try {
        const response = await api(endpoints.AUTH_OTP_CONSUME, "POST", {
          deviceId: deviceId,
          preAuthSessionId: preAuthSessionId,
          userInputCode: otpString,
        });

        const responseData = response.data;

        if (response.status === 200) {
          console.log("OTP verified successfully");
          setLoading(false);
          setAlert(null);
          console.log("User data:", responseData);

          getJWT();

          dispatch(setUserInfo(responseData));
          if (responseData.createdNewRecipeUser) {
            navigation.navigate("EditProfile", { newUser: true });
          } else {
            navigation.navigate("Home");
          }
        } else {
          setLoading(false);
          setAlert({
            type: "error",
            message: "Invalid OTP. Please try again.",
          });
        }
      } catch (error) {
        setLoading(false);
        console.error("Error verifying OTP:", error);
        setAlert({
          type: "error",
          message: "An error occurred. Please try again.",
        });
      }
    } else {
      setAlert({
        type: "warning",
        message: "Please enter a 6-digit OTP.",
      });
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await api(endpoints.AUTH_OTP_RESEND, "POST", {
        deviceId: deviceId,
        preAuthSessionId: preAuthSessionId,
      });
      const responseData = response.data;

      if (response.status === 200) {
        console.log("OTP resent successfully");
        setLoading(false);
        setResendDisabled(true);
        setResendTimer(60);
        setAlert({
          type: "success",
          message: "OTP resent successfully.",
        });
      } else {
        setLoading(false);
        setAlert({
          type: "error",
          message: "Failed to resend OTP. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setLoading(false);
      setAlert({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    }
  };

  const handleChangeOtp = (value, index) => {
    // Check if more than one character was entered (likely a paste)
    if (value.length > 1) {
      const updatedOtp = [...otp];
      // Distribute the pasted characters across inputs
      value.split("").forEach((char, idx) => {
        if (index + idx < 6) {
          updatedOtp[index + idx] = char;
        }
      });

      setOtp(updatedOtp);

      // Automatically focus the next unfilled input or last input
      const nextIndex = Math.min(index + value.length, 5);
      otpInputs.current[nextIndex]?.focus();
    } else {
      // Handle single character input
      const updatedOtp = [...otp];
      updatedOtp[index] = value.replace(/\D/, "");
      setOtp(updatedOtp);

      if (value && index < 5) {
        otpInputs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = "";
    setOtp(updatedOtp);

    if (index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  useLayoutEffect(() => {
    if (resendTimer > 0 && resendDisabled) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (resendTimer === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [resendTimer, resendDisabled]);

  return (
    <View style={styles.container}>
      <Image
        source={NamasteImage}
        style={{ height: 200 }}
        resizeMode="contain"
        accessibilityLabel="Namaste Image"
      />
      <Text style={GlobalStyles.primaryHeading}>Welcome to AyuAi</Text>
      <Text style={GlobalStyles.primaryText}>
        Enter the 6-digit OTP sent to your phone number: {countryCode}{" "}
        {phoneNumber}
      </Text>

      {alert && (
        <AlertBar
          type={alert.type}
          message={alert.message}
          style={{
            marginTop: 20,
          }}
        />
      )}

      <View style={styles.otpInputContainer}>
        {otp.map((digit, index) => (
          <View key={index} style={styles.otpBox}>
            <TextInput
              style={styles.otpInput}
              maxLength={6}
              keyboardType="numeric"
              value={digit}
              onChangeText={(value) => handleChangeOtp(value, index)}
              ref={(input) => (otpInputs.current[index] = input)}
              autoFocus={index === 0}
              returnKeyType="next"
              blurOnSubmit={false}
              cursorColor={"#32CA9A"}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index);
                }
              }}
            />
          </View>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0C9EB1" />
      ) : (
        <>
          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={handleVerifyOTP}
          >
            <Text style={GlobalStyles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResendOTP}
            >
              <Text
                style={
                  resendDisabled ? styles.resendTextDisabled : styles.resendText
                }
              >
                Resend OTP
              </Text>
            </TouchableOpacity>
            {resendDisabled ? (
              <Text style={styles.resendText}>in {resendTimer}s</Text>
            ) : null}
          </View>
        </>
      )}
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
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 30,
  },
  otpBox: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "#0C9EB1",
    borderRadius: 5,
  },
  otpInput: {
    height: 50,
    width: 50,
    textAlign: "center",
    fontSize: 20,
    color: "#FFFFFF",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  resendButton: {
    marginRight: 5,
  },
  resendText: {
    color: "#0C9EB1",
    fontSize: 16,
  },
  resendTextDisabled: {
    color: "#666",
    fontSize: 16,
  },
});

export default OtpScreen;
