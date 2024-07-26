// useImagePicker.ts
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const useImagePicker = () => {
  const [selectedImages, setSelectedImages] = useState<
    { id: string; uri: string }[]
  >([]);

  const pickImagesAsync = async () => {
    // Request camera roll permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        quality: 1,
      });

    if (!result.canceled) {
      setSelectedImages(
        result.assets.map((asset) => ({
          id: asset.uri,
          uri: asset.uri,
        }))
      );
    } else {
      alert("You did not select any images.");
    }
  };

  return [selectedImages, pickImagesAsync] as const;
};

export default useImagePicker;
