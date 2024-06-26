import Slider from "@react-native-community/slider";
import * as React from "react";
import { List, Text } from "react-native-paper";

const Wiring = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [workProgress, setWorkProgress] = React.useState(0);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Electrical Projects">
      <List.Accordion
        title="Mata Tirtha Ko Ghar"
        description="90% complete"
        left={(props) => <List.Icon {...props} icon="folder" />}
      >
        <List.Item title="Piping" />
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          step={10}
          onValueChange={setWorkProgress}
        />
        <Text variant="titleMedium">{workProgress} %</Text>
        <List.Item title="Cutting/Fitting" />
        <List.Item title="Metal Box Set" />
        <List.Item title="Wiring" />
        <List.Item title="Light Fitting" />
      </List.Accordion>

      <List.Accordion
        title="Korean Didi ko Ghar"
        description="95% complete"
        left={(props) => <List.Icon {...props} icon="folder" />}
        onPress={handlePress}
      >
        <List.Item title="Piping" />
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          step={10}
          onValueChange={setWorkProgress}
        />
        <Text variant="titleMedium">{workProgress} %</Text>
        <List.Item title="Cutting/Fitting" />
        <List.Item title="Metal Box Set" />
        <List.Item title="Wiring" />
        <List.Item title="Light Fitting" />
      </List.Accordion>
    </List.Section>
  );
};

export default Wiring;
