import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const examples = [
  "Checked in on a friend",
  "Listened to someone",
  "Picked up trash",
  "Shared advice",
];

export default function CreateScreen() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const canCreate = text.trim().length > 0;

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={[styles.blob, styles.blobOne]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobTwo]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobThree]} />

      <View style={styles.phone}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.brand}>Ripple</Text>
          <Text style={styles.title}>Start a moment.</Text>
          <Text style={styles.subtitle}>
            What did you share today?{"\n"}
            작고 가벼운 순간이면 충분해요.
          </Text>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.label}>Your moment</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            multiline
            placeholder="I checked in on a friend..."
            placeholderTextColor="#9A8F9B"
            style={styles.input}
          />
        </View>

        <Pressable style={styles.photoCard} onPress={pickImage}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoPreview} />
          ) : (
            <>
              <View style={styles.photoCopy}>
                <Text style={styles.photoLabel}>Photo</Text>
                <Text style={styles.photoTitle}>Add a photo</Text>
                <Text style={styles.photoText}>
                  No need to capture the act.{"\n"}
                  Just add a photo that reminds you of the moment.
                </Text>
              </View>

              <View style={styles.photoButton}>
                <Text style={styles.photoButtonText}>+</Text>
              </View>
            </>
          )}
        </Pressable>

        <View style={styles.examples}>
          {examples.map((item) => (
            <Pressable
              key={item}
              style={styles.chip}
              onPress={() => setText(item)}
            >
              <Text style={styles.chipText}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          disabled={!canCreate}
          style={[styles.primaryButton, !canCreate && styles.disabledButton]}
          onPress={() =>
            router.push({
              pathname: "/card",
              params: {
                text: text.trim(),
                photo: photoUri ?? "",
              },
            })
          }
        >
          <Text style={styles.primaryButtonText}>Create ripple</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#FFF8F0",
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    borderRadius: 999,
  },
  blobOne: {
    width: 290,
    height: 290,
    backgroundColor: "#F7C7D9",
    top: -100,
    right: -90,
    opacity: 0.42,
  },
  blobTwo: {
    width: 260,
    height: 260,
    backgroundColor: "#D8C7F7",
    top: 310,
    left: -120,
    opacity: 0.22,
  },
  blobThree: {
    width: 230,
    height: 230,
    backgroundColor: "#F8D8C8",
    bottom: -70,
    right: -70,
    opacity: 0.36,
  },
  phone: {
    flex: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 26,
    paddingTop: 32,
    paddingBottom: 36,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 28,
  },
  backText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1F1D2B",
  },
  header: {
    marginBottom: 22,
  },
  brand: {
    fontSize: 15,
    fontWeight: "900",
    color: "#E98FB0",
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "900",
    color: "#1F1D2B",
    letterSpacing: -1.2,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: 26,
    color: "#6F6472",
    fontWeight: "500",
  },
  inputCard: {
    backgroundColor: "rgba(255,255,255,0.82)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    minHeight: 140,
  },
  label: {
    fontSize: 12,
    fontWeight: "900",
    color: "#E98FB0",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    minHeight: 82,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: "#1F1D2B",
    outlineStyle: "none" as any,
  },
  photoCard: {
    marginTop: 16,
    minHeight: 142,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    overflow: "hidden",
  },
  photoPreview: {
    width: "100%",
    height: 190,
    borderRadius: 20,
  },
  photoCopy: {
    flex: 1,
  },
  photoLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#E98FB0",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  photoTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1F1D2B",
    marginBottom: 6,
  },
  photoText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6F6472",
    fontWeight: "500",
  },
  photoButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#1F1D2B",
    alignItems: "center",
    justifyContent: "center",
  },
  photoButtonText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: -2,
  },
  examples: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
    marginBottom: 24,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#6F6472",
  },
  primaryButton: {
    height: 58,
    borderRadius: 20,
    backgroundColor: "#1F1D2B",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  disabledButton: {
    opacity: 0.32,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
});