import { View, StyleSheet } from "react-native";
import Row from "../components/Row";
import useGameFinished from "../services/TicTacToe";

export interface PositionType {
  top?: boolean;
  bottom?: boolean;
  right?: boolean;
  left?: boolean;
}

export default function GridScreen() {
  useGameFinished();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Row
        positions={[
          { top: true, left: true },
          { top: true },
          { top: true, right: true },
        ]}
      />
      <View style={styles.horizontalSpacer} />
      <Row positions={[{ left: true }, {}, { right: true }]} />
      <View style={styles.horizontalSpacer} />
      <Row
        positions={[
          { bottom: true, left: true },
          { bottom: true },
          { bottom: true, right: true },
        ]}
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
