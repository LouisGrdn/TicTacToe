import { StyleSheet, Pressable } from "react-native";
import Circle from "./Circle";
import { useState } from "react";
import Cross from "./Cross";

export interface BoxProps {
  position: {
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
  };
}

export default function Box({ position = {} }: BoxProps) {
  const [test, setTest] = useState<any>(null);

  const onPress = () => {
    setTest(<Cross />);
  };

  return (
    <Pressable onPress={onPress} style={style.box}>
      {test}
    </Pressable>
  );
}
const style = StyleSheet.create({
  box: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
