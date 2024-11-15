import { createContext, useContext, useEffect, useState } from "react";

// -- context section --

// create a context
const ReminderContext = createContext();

export const useReminder = () => useContext(ReminderContext);

// main component
export default function ReminderContextProvider({ children }) {
  // state for medication name
  const [medicationName, setMedicationName] = useState("");

  // dosage / pill count
  const [pillCount, setPillCount] = useState(1);

  // time picker
  const [reminderTime, setReminderTime] = useState(null);

  // track frequency for everyday
  const [frequency, setFrequency] = useState("");

  // track specific days for 'specificdays'
  const [specificDays, setSpecificDays] = useState([]);

  // value pass to provider
  value = {
    medicationName,
    setMedicationName,
    pillCount,
    setPillCount,
    reminderTime,
    setReminderTime,
    frequency,
    setFrequency,
    specificDays,
    setSpecificDays,
  };
  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
}