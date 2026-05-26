import { Stack } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{
          title: "Profile",
        }} 
      />
    </Stack>
  )
}

export default TabsLayout