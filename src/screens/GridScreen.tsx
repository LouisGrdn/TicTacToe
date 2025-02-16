import { View, StyleSheet } from "react-native";
import Row from "../components/Row";
import { useEffect, useState } from "react";
import { Game, getNextMove } from "../services/TicTacToe";

export interface PositionType {
  top?: boolean;
  bottom?: boolean;
  right?: boolean;
  left?: boolean;
}

export default function GridScreen() {
  const [game, setGame] = useState<Game>({
    turn: 0,
    grid: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    currentPlayer: "Player",
  });

  useEffect(() => {
    if (game.currentPlayer === "Bot") {
      const new_grid = getNextMove(game.grid, game.turn).choice;
      setTimeout(() => {
        setGame((prev) => ({
          grid: new_grid,
          turn: prev.turn + 1,
          currentPlayer: "Player",
        }));
      }, 1000);
    }
  }, [game]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Row
        positions={[
          { top: true, left: true },
          { top: true },
          { top: true, right: true },
        ]}
        values={{ index: 0, value: game.grid[0] }}
        game={game}
        setGame={setGame}
      />
      <View style={styles.horizontalSpacer} />
      <Row
        positions={[{ left: true }, {}, { right: true }]}
        values={{ index: 1, value: game.grid[1] }}
        game={game}
        setGame={setGame}
      />
      <View style={styles.horizontalSpacer} />
      <Row
        positions={[
          { bottom: true, left: true },
          { bottom: true },
          { bottom: true, right: true },
        ]}
        values={{ index: 2, value: game.grid[2] }}
        game={game}
        setGame={setGame}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalSpacer: {
    backgroundColor: "black",
    height: 20,
    width: 340,
    borderRadius: 10,
  },
});
