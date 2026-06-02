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
  "Listened to someone today",
  "Shared advice",
  "Helped a stranger",
  "Checked in on a friend",
];

export default function ContinueScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [place, setPlace] = useState("Seoul, South Korea");
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const canContinue = message.trim().length > 0 && place.trim().length > 0;

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
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
          <Text style={styles.title}>Add your stop.</Text>
          <Text style={styles.subtitle}>
            One photo, one line, and one place.{"\n"}
            Keep the ripple moving.
          </Text>
        </View>

        <Pressable style={styles.photoCard} onPress={pickImage}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoPreview} />
          ) : (
            <>
              <View style={styles.photoCopy}>
                <Text style={styles.cardLabel}>Photo</Text>
                <Text style={styles.photoTitle}>Add a moment photo</Text>
                <Text style={styles.photoText}>
                  A place, an object, the sky — anything that remembers this stop.
                </Text>
              </View>

              <View style={styles.photoButton}>
                <Text style={styles.photoButtonText}>+</Text>
              </View>
            </>
          )}
        </Pressable>

        <View style={styles.inputCard}>
          <Text style={styles.cardLabel}>One line</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            multiline
            placeholder="I listened to someone today..."
            placeholderTextColor="#9A8F9B"
            style={styles.input}
          />
        </View>

        <View style={styles.examples}>
          {examples.map((item) => (
            <Pressable
              key={item}
              style={styles.chip}
              onPress={() => setMessage(item)}
            >
              <Text style={styles.chipText}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.placeCard}>
          <Text style={styles.cardLabel}>Place</Text>
          <TextInput
            value={place}
            onChangeText={setPlace}
            placeholder="City, Country"
            placeholderTextColor="#9A8F9B"
            style={styles.placeInput}
          />
        </View>

        <View style={styles.previewCard}>
          <Text style={styles.cardLabel}>Preview</Text>
          <Text style={styles.previewRoute}>Seoul 🇰🇷 → {place || "?"}</Text>
          <Text style={styles.previewText}>
            {message || "Your one-line moment will appear here."}
          </Text>
        </View>

        <Pressable
          disabled={!canContinue}
          style={[styles.primaryButton, !canContinue && styles.disabledButton]}
          onPress={() =>
            router.push({
              pathname: "/passport",
              params: {
                text: message.trim(),
                place: place.trim(),
                continued: "true",
                photo: photoUri ?? "",
              },
            })
          }
        >
          <Text style={styles.primaryButtonText}>Continue ripple</Text>
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
    width: 310,
    height: 310,
    backgroundColor: "#F7C7D9",
    top: -110,
    right: -100,
    opacity: 0.42,
  },
  blobTwo: {
    width: 260,
    height: 260,
    backgroundColor: "#D8C7F7",
    top: 300,
    left: -130,
    opacity: 0.22,
  },
  blobThree: {
    width: 240,
    height: 240,
    backgroundColor: "#F8D8C8",
    bottom: -80,
    right: -80,
    opacity: 0.36,
  },
  phone: {
    flex: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 26,
    paddingTop: 32,
    paddingBottom: 32,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 22,
  },
  backText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1F1D2B",
  },
  header: {
    marginBottom: 18,
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
    fontSize: 16,
    lineHeight: 24,
    color: "#6F6472",
    fontWeight: "500",
  },
  photoCard: {
    minHeight: 142,
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 12,
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
  cardLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#E98FB0",
    textTransform: "uppercase",
    letterSpacing: 0.7,
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
    fontWeight: "600",
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
  inputCard: {
    backgroundColor: "rgba(255,255,255,0.82)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    minHeight: 116,
  },
  input: {
    minHeight: 68,
    fontSize: 19,
    lineHeight: 27,
    fontWeight: "800",
    color: "#1F1D2B",
    outlineStyle: "none" as any,
  },
  examples: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6F6472",
  },
  placeCard: {
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    marginBottom: 12,
  },
  placeInput: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1F1D2B",
    outlineStyle: "none" as any,
  },
  previewCard: {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.85)",
    marginBottom: 16,
  },
  previewRoute: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1F1D2B",
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
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