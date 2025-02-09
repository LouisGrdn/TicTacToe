import { transform } from "@babel/core";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Cross() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ rotate: "45deg" }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ rotate: "-45deg" }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    scale.value = withTiming(1, { duration: 1000 });
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.line, animatedStyle1]} />
      <Animated.View style={[styles.line, animatedStyle2]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    height: 10,
    width: 100,
    backgroundColor: "black",
    position: "absolute",
  },
});
