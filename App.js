import React, { useState } from 'react';
import { View } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import Mapa from './src/screens/Mapa';
import Llista from './src/screens/Llista';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 15, marginBottom: 15, }}>
        <SegmentedControlTab
          values={['Map', 'List']}
          selectedIndex={selectedIndex}
          onTabPress={(index) => setSelectedIndex(index)}
          borderRadius={20}
          tabsContainerStyle={{ width: 300, backgroundColor: '#E6E6E6', borderRadius: 20, padding: 6 }}
          tabStyle={{ borderColor: 'transparent', backgroundColor: 'transparent'}}
          activeTabStyle={{ backgroundColor: '#FFFFFF', borderRaddius: 18 }}
          tabTextStyle={{ color: '#000000', fontWeight: 500}}
          activeTabTextStyle={{ color: '#000000', fontWeight: 600 }}
        />
      </View>

      <View style={{ flex: 1 }}>
        {selectedIndex === 0 ? <Mapa /> : <Llista />}
      </View>
    </SafeAreaView>
  );
}