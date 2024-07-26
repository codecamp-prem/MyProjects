import ProjectImages from "@/components/ProjectImages";
import ProjectProgress from "@/components/ProjectProgress";
import { PlumbingProjects as initialProjects } from "@/data/plumbing_projects";
import { styled } from "nativewind";
import React, { memo, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { List, Text } from "react-native-paper";

const StyledView = styled(View);

interface Task {
  name: string;
  progress: string;
}
interface Image {
  id: string;
  uri: string;
}
interface Project {
  id: number;
  completed: boolean;
  title: string;
  tasks: Task[];
  images: Image[];
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
        <ProjectProgress progress={totalProgress} />
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
      <FlatList
        data={projects}
        keyExtractor={(item) => `project-${item.id}`}
        renderItem={({ item }) => (
          <React.Fragment key={`project-${item.id}`}>
            <AccordionItem project={item} handleTaskChange={handleTaskChange} />
            <ProjectImages
              key={`images-${item.id}`}
              currentImgs={item.images}
            />
          </React.Fragment>
        )}
      />
    </List.Section>
    // <List.Section title="Plumbing Projects">
    //   <ScrollView>
    //     {projects.map((project) => (
    //       <>
    //         <AccordionItem
    //           key={project.id}
    //           project={project}
    //           handleTaskChange={handleTaskChange}
    //         />
    //         <ProjectImages
    //           key={`images-${project.id}`}
    //           currentImgs={project.images}
    //         />
    //       </>
    //     ))}
    //   </ScrollView>
    // </List.Section>
  );
});

export default Plumbing;
