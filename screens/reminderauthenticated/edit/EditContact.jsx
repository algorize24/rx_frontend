import { View, StyleSheet, Text, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// components
import MainButton from "../../../components/buttons/MainButton";
import TextInputs from "../../../components/Inputs/TextInputs";
import TextScreen from "../../../components/header/TextScreen";
import InputText from "../../../components/header/InputText";
import Button from "../../../components/buttons/Button";

// axios
import axios from "axios";

export default function EditContact({ navigation, route }) {
  // this data is from ListContact.jsx
  const _id = route.params.contactId;
  const initialName = route.params.name;
  const initialPhoneNumber = route.params.number;

  // state to edit
  const [name, setName] = useState(initialName);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber.toString());

  // loading state
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);

  // error state
  const [error, setError] = useState("");

  // Handler to edit contact
  const handleEditingContact = async () => {
    setIsContactLoading(true);

    try {
      // send the updated data to the backend
      await axios.patch(`http://10.0.2.2:5000/api/contact/${_id}`, {
        name,
        phone_number: phoneNumber,
      });

      // on success, navigate back to the contact list
      Alert.alert(
        "Contact Updated",
        "The contact details were updated successfully."
      );
      navigation.navigate("Contact");
    } catch (error) {
      setError("Failed to update contact. Please try again later", error);
    } finally {
      setIsContactLoading(false); // Reset loading state
    }
  };

  const handleDeletingContact = () => {
    // Show confirmation dialog
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            setIsDeletingLoading(true); // Set loading state to true when the button is pressed

            try {
              // Send DELETE request to the backend
              await axios.delete(`http://10.0.2.2:5000/api/contact/${_id}`);

              // On success, navigate back to the contact list
              Alert.alert(
                "Contact deleted",
                "The contact was deleted successfully."
              );
              navigation.navigate("Contact");
            } catch (error) {
              setError(
                "Failed to delete the contact. Please try again later",
                error
              );
            } finally {
              setIsDeletingLoading(false); // Reset loading state
            }
          },
        },
      ],
      { cancelable: true } // allows the alert to be dismissed by tapping outside
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <TextScreen style={styles.textScreen}>
            # <Text style={styles.name}>{name || ""}</Text>
          </TextScreen>
        </View>

        <InputText>Name:</InputText>
        <TextInputs
          style={styles.textInput}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <InputText>Number:</InputText>
        <TextInputs
          keyboardType="numeric"
          style={styles.textInput}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={11}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        {!isContactLoading ? (
          <MainButton style={styles.editContact} onPress={handleEditingContact}>
            Edit Contact
          </MainButton>
        ) : (
          <Button style={styles.editContact}>
            <ActivityIndicator color={"#fff"} />
          </Button>
        )}

        {!isDeletingLoading ? (
          <MainButton onPress={handleDeletingContact} style={styles.button}>
            Delete Contact
          </MainButton>
        ) : (
          <Button style={styles.button}>
            <ActivityIndicator color={"#fff"} />
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },

  textContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
  },

  inputContainer: {
    marginTop: 49,
  },

  textInput: {
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  button: {
    marginBottom: 20,
    backgroundColor: Color.redColor,
  },

  buttonContainer: {
    // marginTop: 163,
  },

  name: {
    color: Color.greenColor,
    textTransform: "capitalize",
  },

  textScreen: {
    color: Color.tagLine,
    textTransform: "capitalize",
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    fontSize: 13,
    marginVertical: 10,
  },

  editContact: {
    backgroundColor: Color.greenColor,
    marginBottom: 10,
  },
});
