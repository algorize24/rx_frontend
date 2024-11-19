import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLayoutEffect, useState } from "react";

// constants
import { Color } from "../../../../constants/Color";
import { Fonts } from "../../../../constants/Font";

// component
import AuthText from "../../../../components/header/AuthText";
import MainButton from "../../../../components/buttons/MainButton";

// context
import { useReminder } from "../../../../context/reminderContext";

// date & time picker expo
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SelectTimeWeek({ navigation, route }) {
  const { medicationName, setReminderTime } = useReminder();
  const { specificDay } = route.params; // Get the specific day from navigation

  const [time, setTime] = useState(new Date()); // Default to current time
  const [show, setShow] = useState(false);

  // Update time when user selects a new time
  const handleTimeChange = (event, selectedDate) => {
    if (event.type === "set") {
      setTime(selectedDate || time); // Set the selected time or keep the previous one
    }
    setShow(false); // Hide the date picker
  };

  const handleNext = () => {
    // Update the reminder time with the selected day and time
    setReminderTime((prevReminderTimes) => {
      const newReminder = { day: specificDay, time: time.toISOString() }; // Convert time to ISO string
      return Array.isArray(prevReminderTimes)
        ? [...prevReminderTimes, newReminder]
        : [newReminder];
    });

    navigation.navigate("AddPillsWeek", {
      specificDay,
      selectedTime: time.toISOString(), // Pass the selected time as an ISO string
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.title}>{medicationName}</Text>,
    });
  }, [navigation, medicationName]);

  return (
    <View style={styles.root}>
      <AuthText style={styles.text}>
        When do you need to take the dose on {specificDay}?
      </AuthText>

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Pressable onPress={() => setShow(true)}>
            <Text style={styles.selectTime}>
              Set the time for your dose reminder
            </Text>
          </Pressable>

          {show && (
            <DateTimePicker
              value={time} // Use the updated time state
              mode="time"
              is24Hour={false}
              display="spinner"
              onChange={handleTimeChange}
              onTouchCancel={() => setShow(false)}
            />
          )}
        </View>

        <View style={styles.buttonView}>
          <MainButton onPress={handleNext} style={styles.button}>
            Next
          </MainButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  title: {
    fontFamily: Fonts.main,
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 14,
  },

  text: {
    textTransform: "none",
    marginHorizontal: 18,
    marginBottom: 20,
    marginTop: 50,
    fontSize: 20,
    width: 320,
  },

  container: {
    flex: 1,
    backgroundColor: Color.container,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "space-between",
    paddingBottom: 20,
  },

  subContainer: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 30,
    justifyContent: "center",
  },

  selectTime: {
    fontSize: 15,
    color: "#fff",
    fontFamily: Fonts.main,
    backgroundColor: Color.textInput,
    padding: 10,
    borderRadius: 6,
    textAlign: "center",
  },

  buttonView: {
    alignItems: "center",
    marginBottom: 20,
  },

  button: {
    width: "90%",
  },
});