import { StyleSheet, View } from "react-native";
import Box from "./Box";
import { PositionType } from "../screens/GridScreen";
import { Cell, Game } from "../services/TicTacToe";
import { useCallback } from "react";

interface RowProps {
  positions: PositionType[];
  values: { index: number; value: Array<Cell> };
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
}

export default function Row({
  positions = [],
  values,
  game,
  setGame,
}: RowProps) {
  const positionsValues = Object.values(positions);
  const isTop = !!positionsValues.find((position) => position.top);
  const isBottom = !!positionsValues.find((position) => position.bottom);

  const spacerStyle = [
    styles.verticalSpacer,
    isTop && styles.topRadius,
    isBottom && styles.bottomRadius,
  ];

  const onPress = useCallback(
    (index: number) => () => {
      if (game.currentPlayer === "Player") {
        const new_grid = game.grid;
        new_grid[values.index][index] = 0;
        setGame((prev) => ({
          currentPlayer: "Bot",
          grid: new_grid,
          turn: prev.turn + 1,
        }));
      }
    },
    [game]
  );

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Box value={values.value[0]} game={game} onPress={onPress(0)} />
      <View style={spacerStyle} />
      <Box value={values.value[1]} game={game} onPress={onPress(1)} />
      <View style={spacerStyle} />
      <Box value={values.value[2]} game={game} onPress={onPress(2)} />
    </View>
  );
}

const styles = StyleSheet.create({
  verticalSpacer: {
    backgroundColor: "black",
    height: 100,
    width: 20,
  },
  topRadius: { borderTopEndRadius: 10, borderTopStartRadius: 10 },
  bottomRadius: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
});
