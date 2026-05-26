import { postsData } from '@/constants'
import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
       <Text style={styles.title}>Scrollable</Text>
      
              {/* ScrollView */}
              <ScrollView>
                  <Text style={styles.scrollText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis earum eligendi repudiandae? Laborum repellendus velit cumque ipsum deserunt dolor alias cupiditate quo quasi? Corrupti vero blanditiis, non cupiditate quasi minus praesentium tempore dolorum, consectetur itaque ad. Aspernatur dolor quo animi illum libero consequatur omnis consequuntur nihil perferendis deleniti tempora doloremque itaque expedita, ducimus velit consectetur at sapiente accusantium voluptas nisi saepe! Quibusdam hic facere, assumenda obcaecati accusamus quia beatae nesciunt quis laboriosam quae at nulla. Cupiditate vel iusto deserunt et similique dolorum laborum nobis impedit.</Text>
              </ScrollView>
      
              {/* FlatList */}
      
              <FlatList
                  data={postsData}
                  renderItem={({item}) => (
                      <View>
                          <Text style={styles.title}>{item.title}</Text>
                          <Text>{item.body}</Text>
                      </View>
                  )}
                  ListHeaderComponent={() => <Text style={styles.title}>FlatList Header</Text>}
              />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "white",
        paddingBottom: 200
    },
    title: {
        fontSize: 24,
        fontWeight: "bold"
    },
    scrollText: {
        fontSize: 16
    }
})