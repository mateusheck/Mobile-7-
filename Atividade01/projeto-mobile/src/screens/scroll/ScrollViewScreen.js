import { ScrollView, Text, StyleSheet, View, StatusBar } from "react-native"; 

export default function ScrollViewScreen() {
  return ( 
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>ScrollView</Text>

      <ScrollView contentContainerStyle={styles.container}> 
        {Array.from({ length: 20 }).map((_, index) => ( 
          <View key={index} style={styles.item}> 
            <Text style={styles.text}>Item {index + 1}</Text> 
          </View> 
        ))} 
      </ScrollView> 
    </View>
  ); 
} 

const styles = StyleSheet.create({ 
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },

  container: { 
    paddingHorizontal: 20,
    paddingBottom: 20,
  },   

  item: { 
    marginBottom: 12, 
    padding: 18, 
    backgroundColor: '#1e293b', 
    borderRadius: 12,
    elevation: 5,
  }, 

  text: { 
    fontSize: 16, 
    fontWeight: '600',
    color: '#e2e8f0',
  }, 
});