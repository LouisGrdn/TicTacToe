import { StyleSheet, View } from "react-native";
import Box from "./Box";
import { PositionType } from "./Grid";

interface RowProps {
  positions: PositionType[];
}

export default function Row({ positions = [] }: RowProps) {
  const positionsValues = Object.values(positions);
  const isTop = !!positionsValues.find((position) => position.top);
  const isBottom = !!positionsValues.find((position) => position.bottom);

  const spacerStyle = [
    styles.verticalSpacer,
    isTop && styles.topRadius,
    isBottom && styles.bottomRadius,
  ];

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Box position={positions[0]}></Box>
      <View style={spacerStyle} />
      <Box position={positions[1]}></Box>
      <View style={spacerStyle} />
      <Box position={positions[2]}></Box>
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
