import React, { useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    })
  }, [])
  
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#608ceb"}/>
      <View style={styles.container}>
        {projects.map(project => (
          <Text style={styles.project} key={project.id}>{project.title}</Text>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({ 
  container: {
    backgroundColor: '#608ceb',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  project: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold'
  }
})
