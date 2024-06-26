import Slider from "@react-native-community/slider";
import * as React from "react";
import { List, Text } from "react-native-paper";

const Payments = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [workProgress, setWorkProgress] = React.useState(0);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Plumbing Projects">
      <List.Accordion
        title="Korean Didi ko Ghar"
        description="95% complete"
        left={(props) => <List.Icon {...props} icon="folder" />}
      >
        <List.Item title="Drainage" />
        <List.Item title="Pipe Fitting" />
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
        <List.Item title="Bathroom Fitting" />
        <List.Item title="Tank Fitting" />
        <List.Item title="Apparatus Fitting" />
      </List.Accordion>

      <List.Accordion
        title="Mata Tirtha Ko Ghar"
        description="90% complete"
        left={(props) => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item title="Drainage" />
        <List.Item title="Pipe Fitting" />
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
        <List.Item title="Bathroom Fitting" />
        <List.Item title="Tank Fitting" />
        <List.Item title="Apparatus Fitting" />
      </List.Accordion>
    </List.Section>
  );
};

export default Payments;
