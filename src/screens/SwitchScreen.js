import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import MapConBubble from './MapConBubble';
import Llista from './LlistaScreen';

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
        <SegmentedControlTab
          values={['Map', 'List']}
          selectedIndex={selectedIndex}
          onTabPress={(index) => setSelectedIndex(index)}
          borderRadius={20}
          tabsContainerStyle={{ width: 300, backgroundColor: '#E6E6E6', borderRadius: 20, padding: 6 }}
          tabStyle={{ borderColor: 'transparent', backgroundColor: 'transparent'}}
          activeTabStyle={{ backgroundColor: '#FFFFFF', borderRadius: 18 }}
          tabTextStyle={{ color: '#000000', fontWeight: '500' }}
          activeTabTextStyle={{ color: '#000000', fontWeight: '600' }}
        />
      </View>

      <View style={{ flex: 1 }}>
        {selectedIndex === 0 ? <MapConBubble /> : <Llista />}
      </View>
    </SafeAreaView>
  );
}