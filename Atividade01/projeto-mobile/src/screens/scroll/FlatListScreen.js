import { FlatList, Text, StyleSheet, View, StatusBar } from 'react-native'; 

export default function FlatListScreen() {
  const data = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
  }));

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      
      <Text style={styles.title}>Minha Lista</Text>

      <FlatList 
        data={data} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => ( 
          <View style={styles.item}> 
            <Text style={styles.text}>{item.name}</Text> 
          </View> 
        )} 
        contentContainerStyle={styles.container} 
        showsVerticalScrollIndicator={false}
      /> 
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
    color: '#e2e8f0',
    fontWeight: '600',
  }, 
});