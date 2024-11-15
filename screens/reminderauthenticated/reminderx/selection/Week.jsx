import TimeSelector from "./TimeSelector";

export default function Week({ navigation }) {
  return (
    <TimeSelector
      navigation={navigation}
      header={"When do you need to take the dose?"}
    />
  );
}