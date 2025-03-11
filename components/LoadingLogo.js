import { Animated, Easing } from "react-native";
import Logo from "../assets/icon.png";
import { useEffect } from "react";

const rotation = new Animated.Value(0);
const opacity = new Animated.Value(1);

const LoadingLogo = ({ size = 30 }) => {
  useEffect(() => {
    // Rotation animation
    const rotateAnim = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000, // 2 seconds for a full rotation
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Blinking animation
    const blinkAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500, // Fade out over 0.5 seconds
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500, // Fade in over 0.5 seconds
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    // Start animations
    rotateAnim.start();
    blinkAnim.start();

    // Cleanup animations on unmount
    return () => {
      rotateAnim.stop();
      blinkAnim.stop();
    };
  }, []);

  // Interpolate rotation value
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.Image
      source={Logo}
      style={{
        width: size,
        height: size,
        transform: [{ rotate: rotateInterpolate }], // Apply rotation
        opacity: opacity, // Apply blinking
      }}
    />
  );
};

export default LoadingLogo;
