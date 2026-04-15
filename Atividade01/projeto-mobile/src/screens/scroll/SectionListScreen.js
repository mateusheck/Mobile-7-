import { SectionList, Text, StyleSheet, View, } from 'react-native'; 


export default function SectionListScreen() {
  const sections = [ 
  { title: 'Seção 1', data: [' Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 4', 'Item 6'] }, 
  { title: 'Seção 2', data: [' Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11'] }, 
  { title: 'Seção 3', data: [' Item 12', 'Item 13', 'Item 14', 'Item 15'] }, 
  { title: 'Seção 4', data: [' Item 12', 'Item 13', 'Item 14', 'Item 15'] }, 
  { title: 'Seção 5', data: [' Item 12', 'Item 13', 'Item 14', 'Item 15'] }, 
];
   return ( 
    <View style={styles.container}> 
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
        contentContainerStyle={styles.list} 
      /> 
    </View> 
  ); 
} 
 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1,
    marginTop: 20, 
  }, 
  list: { 
    padding: 20, 
    marginTop: 20, 
  }, 
  header: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    backgroundColor: '#d0d0d0', 
    padding: 10, 
    borderRadius: 8, 
  }, 
  item: { 
    marginBottom: 10, 
    padding: 15, 
    backgroundColor: '#f9fbe7', 
    borderRadius: 8, 
  }, 
  text: { 
    fontSize: 16, 
  }, 
});