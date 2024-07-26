// App.tsx
import useImagePicker from "@/hooks/useImagePicker";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, View } from "react-native";

interface ImageProps {
  id: string;
  uri: string;
}

export default function ProjectImages(currentImgs: any) {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [selectedImages, pickImagesAsync] = useImagePicker();

  useEffect(() => {
    // Fetch images from the database
    // const databaseImages: ImageProps[] = [
    //   { id: "1", uri: "https://example.com/image1.jpg" },
    //   { id: "2", uri: "https://example.com/image2.jpg" },
    //   { id: "3", uri: "https://example.com/image3.jpg" },
    // ];
    setImages(currentImgs);
  }, []);

  useEffect(() => {
    // Add newly selected images to the list of images
    setImages([...images, ...selectedImages]);
  }, [selectedImages]);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.image} />
        )}
      />
      <Button title="Pick images from camera roll" onPress={pickImagesAsync} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "33.33%",
    height: 100,
    resizeMode: "cover",
  },
});
