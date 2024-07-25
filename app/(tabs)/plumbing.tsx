import Progress from "@/components/progress";
import { PlumbingProjects as initialProjects } from "@/data/plumbing_projects";
import { styled } from "nativewind";
import React, { memo, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { List, Text } from "react-native-paper";

const StyledView = styled(View);

interface Task {
  name: string;
  progress: string;
}

interface Project {
  id: number;
  completed: boolean;
  title: string;
  tasks: Task[];
}

interface AccordionItemProps {
  project: Project;
  handleTaskChange: (
    projectId: number,
    taskIndex: number,
    newProgress: string
  ) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = memo(
  ({ project, handleTaskChange }) => {
    const totalProgress =
      project.tasks.reduce((acc, task) => {
        return acc + parseInt(task.progress, 10);
      }, 0) / project.tasks.length;

    return (
      <List.Accordion
        title={project.title}
        description={`${totalProgress.toFixed(2)}% complete`}
        left={(props) => <List.Icon {...props} icon="folder" />}
      >
        <Progress progress={totalProgress} />
        {project.tasks.map((task, taskIndex) => (
          <StyledView
            key={taskIndex}
            className="flex flex-row bg-slate-200 items-center p-4 justify-between"
          >
            <List.Item title={task.name} />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 10,
                fontSize: 16,
                letterSpacing: 1,
                width: "30%",
              }}
              value={task.progress}
              onChangeText={(text) =>
                handleTaskChange(project.id, taskIndex, text)
              }
              keyboardType="numeric"
            />
            <Text variant="titleMedium">{task.progress} %</Text>
          </StyledView>
        ))}
      </List.Accordion>
    );
  }
);

const Plumbing: React.FC = memo(() => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleTaskChange = (
    projectId: number,
    taskIndex: number,
    newProgress: string
  ) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task, index) =>
                index === taskIndex ? { ...task, progress: newProgress } : task
              ),
            }
          : project
      )
    );
  };

  return (
    <List.Section title="Plumbing Projects">
      <ScrollView>
        {projects.map((project) => (
          <AccordionItem
            key={project.id}
            project={project}
            handleTaskChange={handleTaskChange}
          />
        ))}
      </ScrollView>
    </List.Section>
  );
});

export default Plumbing;
