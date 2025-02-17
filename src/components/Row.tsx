import { StyleSheet, View } from "react-native";
import Box from "./Box";
import { PositionType } from "../screens/GridScreen";
import { Cell, Game } from "../services/TicTacToe";
import { useCallback, useState } from "react";

interface RowProps {
  positions: PositionType[];
  rowIndex: number;
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
}

export default function Row({
  positions = [],
  rowIndex,
  game,
  setGame,
}: RowProps) {
  const [isPressed, setIsPressed] = useState(false);
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
      if (
        game.currentPlayer === "Player" &&
        !game.grid[rowIndex][index] &&
        !isPressed
      ) {
        setIsPressed(true);
        const new_grid = game.grid;
        new_grid[rowIndex][index] = 0;
        setGame((prev) => ({
          currentPlayer: "Bot",
          grid: new_grid,
          turn: prev.turn + 1,
        }));
      }
      setIsPressed(false);
    },
    [game, setGame, isPressed, setIsPressed]
  );

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Box value={game.grid[rowIndex][0]} game={game} onPress={onPress(0)} />
      <View style={spacerStyle} />
      <Box value={game.grid[rowIndex][1]} game={game} onPress={onPress(1)} />
      <View style={spacerStyle} />
      <Box value={game.grid[rowIndex][2]} game={game} onPress={onPress(2)} />
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
