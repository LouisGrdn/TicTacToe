import { View, StyleSheet } from "react-native";
import Row from "../components/Row";
import { useCallback, useEffect, useState } from "react";
import {
  Game,
  getNextMove,
  getWinner,
  isGameFinished,
} from "../services/TicTacToe";
import EndModal from "../components/EndModal";
import { useLocalSearchParams } from "expo-router";

export interface PositionType {
  top?: boolean;
  bottom?: boolean;
  right?: boolean;
  left?: boolean;
}

export default function GridScreen() {
  const { difficulty } = useLocalSearchParams();
  const [game, setGame] = useState<Game>({
    turn: 0,
    grid: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    currentPlayer: "Player",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (game.winner) return;

    if (isGameFinished(game.grid, 0)) {
      setGame((prev) => ({
        ...prev,
        winner: getWinner(game.grid),
      }));
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return;
    }
    if (game.currentPlayer === "Bot") {
      const new_grid = getNextMove(game.grid, game.turn, difficulty as string);
      setTimeout(() => {
        setGame((prev) => ({
          grid: new_grid,
          turn: prev.turn + 1,
          currentPlayer: "Player",
        }));
      }, 1000);
    }
  }, [game]);

  const restartGame = useCallback(() => {
    setGame({
      turn: 0,
      grid: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      currentPlayer: "Player",
      winner: undefined,
    });
    setIsVisible(false);
  }, []);

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Row
          positions={[
            { top: true, left: true },
            { top: true },
            { top: true, right: true },
          ]}
          rowIndex={0}
          game={game}
          setGame={setGame}
        />
        <View style={styles.horizontalSpacer} />
        <Row
          positions={[{ left: true }, {}, { right: true }]}
          rowIndex={1}
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
          rowIndex={2}
          game={game}
          setGame={setGame}
        />
      </View>
      <EndModal
        game={game}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        restartGame={restartGame}
      />
    </>
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
