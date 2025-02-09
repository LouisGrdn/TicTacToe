import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Circle() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    scale.value = withTiming(1, { duration: 1000 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return <Animated.View style={[animatedStyle, styles.circle]} />;
}

const styles = StyleSheet.create({
  circle: {
    height: 85,
    width: 85,
    borderWidth: 12,
    borderRadius: 50,
  },
});
