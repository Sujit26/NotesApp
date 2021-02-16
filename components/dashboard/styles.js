import { StyleSheet} from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "85%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    backgroundColor: "pink",
  },
  header: {
    fontSize: 25,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    borderRadius: 5,
    margin: 20,
    paddingRight: 20,
    width: 138,
    height: 136,
    color: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    top: 10,
    left: 10,
  },
  category: {
    color: "#FFFBFB",
    fontSize: 10,
    top: 8,
    left: 10,
  },
  note: {
    color: "#fff",
    fontSize: 12,
    top: 10,
    left: 10,
  },
});
