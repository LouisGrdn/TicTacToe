import { StyleSheet, Pressable } from "react-native";
import Circle from "./Circle";
import { useEffect, useState } from "react";
import Cross from "./Cross";
import { Cell, Game } from "../services/TicTacToe";

export interface BoxProps {
  value: Cell;
  game: Game;
  onPress: () => void;
}

export default function Box({ value, game, onPress }: BoxProps) {
  const [test, setTest] = useState<any>(null);

  useEffect(() => {
    switch (value) {
      case 1:
        setTest(<Cross />);
        break;
      case 0:
        setTest(<Circle />);
        break;
    }
  }, [value]);

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
