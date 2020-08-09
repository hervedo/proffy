import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import heartOutilneIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export interface Teacher {
  name: string;
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  subject: string;
  whatsapp: string; 
}

interface TeacherItemProps {
  classes: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ classes, favorited }) => {

  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleLinkToWhatsapp() {
    api.post('/connections', {user_id: classes.id})
    Linking.openURL(`whatsapp://send?phone=${classes.whatsapp}`); 
    
  }

  async function handleToggleFavorited(){
    const favorites = await AsyncStorage.getItem('favorites');
    
    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }


    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem:Teacher) => {
        return teacherItem.id == classes.id;
      })      
      favoritesArray.splice(favoriteIndex,1);
      setIsFavorited(false);
    }else {
      favoritesArray.push(classes);
      setIsFavorited(true);  
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
  }


  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: classes.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{ classes.name }</Text>
          <Text style={styles.subject}>{ classes.subject }</Text>

        </View>


      </View>

      <Text style={styles.bio}> 
        { classes.bio }
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço Hora: {'   '}
  <Text style={styles.priceValue}>{ classes.cost }</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handleToggleFavorited}
            style={[
              styles.favoriteButton, 
              isFavorited ? styles.favorited : {},
            ]}>
            { isFavorited 
              ? <Image source={unfavoriteIcon}/> 
              : <Image source={heartOutilneIcon}/>
            }
          </RectButton>

          <RectButton onPress={ handleLinkToWhatsapp } style={styles.contactButton}>
            <Image source={whatsappIcon}/>
            <Text style={styles.contactButtonText}>Entrar em contato</Text>

          </RectButton>
        </View>
      </View>
    </View>
      
  )

}

export default TeacherItem;