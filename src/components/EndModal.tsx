import { Modal, Pressable, Text, View, StyleSheet } from "react-native";
import { Game } from "../services/TicTacToe";
import { useCallback, useMemo } from "react";
import { Link } from "expo-router";

interface EndModalProps {
  game: Game;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  restartGame: () => void;
}

export default function EndModal({
  game,
  isVisible,
  setIsVisible,
  restartGame,
}: EndModalProps) {
  const text = useMemo(() => {
    switch (game.winner) {
      case "Bot":
        return "You lost !";
      case "Player":
        return "You won !";
      default:
        return "It's a draw !";
    }
  }, [game.winner]);

  const onBack = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 24 }}>{text}</Text>
          <Pressable
            onPress={restartGame}
            style={[styles.button, { backgroundColor: "lightblue" }]}
          >
            <Text style={styles.text}>Try again</Text>
          </Pressable>
          <Link href={"/"} asChild>
            <Pressable
              onPress={onBack}
              style={[styles.button, { borderWidth: 1 }]}
            >
              <Text style={styles.text}>Back to menu</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: { flex: 1, alignItems: "center", justifyContent: "center" },
  button: {
    width: 120,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    textAlign: "center",
  },
  modalView: {
    backgroundColor: "#e5e5e5",
    height: 200,
    paddingHorizontal: 75,
    paddingVertical: 25,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
