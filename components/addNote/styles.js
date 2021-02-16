import { StyleSheet } from "react-native"
export default StyleSheet.create({
  container: {
    flex: 1,
    color: "#ffff",
    backgroundColor: "#009688",
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "center",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    paddingVertical: 20,
    fontWeight: "bold",
    fontSize: 34,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    width: "80%",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
