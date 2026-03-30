import { SectionList, Text, StyleSheet, View, StatusBar } from 'react-native'; 

export default function SectionListScreen() {
  const sections = [ 
    { title: 'Seção 1', data: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] }, 
    { title: 'Seção 2', data: ['Item 5', 'Item 6', 'Item 7'] }, 
    { title: 'Seção 3', data: ['Item 8', 'Item 9'] }, 
  ];

  return ( 
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Seções</Text>

      <SectionList 
        sections={sections} 
        keyExtractor={(item, index) => item + index} 
        renderItem={({ item }) => ( 
          <View style={styles.item}> 
            <Text style={styles.text}>{item}</Text> 
          </View> 
        )} 
        renderSectionHeader={({ section }) => ( 
          <Text style={styles.header}>{section.title}</Text> 
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

  header: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 8,
    marginTop: 10,
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