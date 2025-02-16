import { Link } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";

export default function SelectScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 50,
      }}
    >
      <Text style={{ fontSize: 36 }}>Choose your difficulty</Text>
      <Link
        href={"/grid?difficulty=easy"}
        style={[styles.button, { backgroundColor: "lightgreen" }]}
      >
        <Text style={styles.text}>Easy</Text>
      </Link>
      <Link
        href={"/grid?difficulty=medium"}
        style={[styles.button, { backgroundColor: "yellow" }]}
      >
        <Text style={styles.text}>Medium</Text>
      </Link>
      <Link
        href={"/grid?difficulty=hard"}
        style={[styles.button, { backgroundColor: "#e63946" }]}
      >
        <Text style={styles.text}>Hard</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 35,
    borderRadius: 16,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});
