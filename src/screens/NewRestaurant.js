import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

export default function NewRestaurant() {
  const days = ['Mon', 'Thu', 'Wed', 'Tue', 'Fry', 'Sat', 'Sun'];

  const [selectedCity, setSelectedCity] = useState('');
  const [checkedDays, setCheckedDays] = useState({});

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Restaurant</Text>

      <Text style={styles.label}>Restaurant Name</Text>
      <TextInput style={styles.input} placeholder="Name" />

      <Text style={styles.label}>City:</Text>
      <Picker
        selectedValue={selectedCity}
        onValueChange={(value) => setSelectedCity(value)}
        style={styles.picker}
      >
        <Picker.Item label="City" value="" />
        <Picker.Item label="Barcelona" value="barcelona" />
        <Picker.Item label="Madrid" value="madrid" />
      </Picker>

      <Text style={styles.label}>Location:</Text>
      <TextInput style={styles.input} placeholder="Location" />

      <Text style={styles.label}>Schedule:</Text>

      {days.map((day) => (
        <View key={day} style={styles.scheduleRow}>
          <Switch
            value={checkedDays[day]}
            onValueChange={(value) =>
              setCheckedDays({ ...checkedDays, [day]: value })
            }
          />
          <Text style={styles.dayLabel}>{day}:</Text>
          <TextInput style={styles.timeInput} placeholder="00:00" />
          <Text> - </Text>
          <TextInput style={styles.timeInput} placeholder="00:00" />
        </View>
      ))}

      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Prices:</Text>
      <View style={styles.priceRow}>
        <TouchableOpacity style={styles.priceBtn}>
          <Text>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.priceBtn}>
          <Text>Mid</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.priceBtn}>
          <Text>High</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Image:</Text>
      <TouchableOpacity style={styles.imagePicker}>
        <Text>Upload</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Choose the main image:</Text>
      <ScrollView horizontal>
        <Image
          source={{ uri: 'https://picsum.photos/200' }}
          style={styles.galleryImg}
        />
        <Image
          source={{ uri: 'https://picsum.photos/201' }}
          style={styles.galleryImg}
        />
        <Image
          source={{ uri: 'https://picsum.photos/202' }}
          style={styles.galleryImg}
        />
      </ScrollView>

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={{ color: '#fff' }}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { marginTop: 15, fontSize: 16 },
  input: { borderWidth: 1, padding: 10, marginTop: 5, borderRadius: 8 },
  picker: { borderWidth: 1, marginTop: 5 },
  scheduleRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  dayLabel: { width: 40, marginLeft: 10 },
  timeInput: {
    borderWidth: 1,
    width: 60,
    textAlign: 'center',
    borderRadius: 8,
    padding: 5
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  priceBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    width: 70,
    alignItems: 'center'
  },
  imagePicker: {
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10
  },
  galleryImg: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginRight: 10
  },
  saveBtn: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20
  }
});
