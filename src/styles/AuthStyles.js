import { StyleSheet } from "react-native";
import { deviceHeight, deviceWidth } from "../helpers/Dimensions";
import Colors from "../helpers/Colors";

const AuthStyles = StyleSheet.create({
  formContainer: {
    marginHorizontal: deviceWidth * 0.1,
    elevation: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 34,
    paddingHorizontal: 19,
    marginTop: -(deviceHeight * 0.08),
    marginBottom: 25
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  }
})

export default AuthStyles