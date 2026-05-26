import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Onboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.skipButton} onPress={() => router.push("/(tabs)")}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.mainContent}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1778808351776-a47c03331bf3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D" }} style={styles.mainImage} />

          <View style={styles.textContent}>
            <Text style={styles.title}>Welcome to Our App</Text>
            <Text style={styles.description}>
              Discover amazing features and enjoy a great experience.
            </Text>
          </View>
        </View>
        <CustomButton title='Get Started' onPress={() => router.push("/(tabs)")} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  skipButton: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    padding: 10,
  },
  skipButtonText: {
    color: "black",
    fontWeight: "bold"
  },
  mainContent: {
    alignItems: "center",
    justifyContent: "center"
  },
  mainImage: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  textContent: {
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  description: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 10
  }
})