import { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = ({ 
  maxStars = 5, 
  rating = 0, 
  onChangeRating = () => {}, 
  size = 32, 
  color = "#FFD700", 
  emptyColor = "#CCCCCC" 
}) => {

  const [currentRating, setCurrentRating] = useState(rating);
  
  const handlePress = (star) => {
    setCurrentRating(star);
    onChangeRating(star);
  };

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        return (
          <TouchableOpacity key={index} onPress={() => handlePress(starNumber)}>
            <FontAwesome
              name={starNumber <= currentRating ? 'star' : 'star-o'}
              size={size}
              color={starNumber <= currentRating ? color : emptyColor}
              style={{ marginHorizontal: 2 }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default StarRating;
