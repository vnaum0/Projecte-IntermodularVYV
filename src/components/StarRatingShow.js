import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function StarRating({ rating, size = 16, color = "#FFD700" }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesome key={i} name="star" size={size} color={color} />);
  }
  if (halfStar) {
    stars.push(<FontAwesome key="half" name="star-half-empty" size={size} color={color} />);
  }
  while (stars.length < 5) {
    stars.push(<FontAwesome key={'empty' + stars.length} name="star-o" size={size} color={color} />);
  }

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
}
