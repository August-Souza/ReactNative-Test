import React, { useEffect, useState} from 'react';
import {SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    })
  }, [])

  async function handleProject() {
    const response = await api.post('projectS', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'August'
    })

    const project = response.data

    setProjects([...projects, project])
  }
  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#608ceb"/>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item: project}) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
          onPress={handleProject}
          style={styles.button}
          activeOpacity={0.}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
  },
  button: {
    alignSelf: 'stretch',
    borderRadius: 4,
    height: 50,
    margin: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: '100',
    fontSize: 16,
    color: '#608ceb'
  }
})
