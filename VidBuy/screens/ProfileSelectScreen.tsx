import React, { useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import ProfileOption from '../components/ProfileOption/ProfileOption';
import OptionButton from '../components/OptionButton/OptionButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProfileSelect'>;
};




const ProfileSelectScreen = ({ navigation }: Props) => {
  const [selected, setSelected] = useState<'user' | 'influencer' | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your Profile Category</Text>
      <Text style={styles.subtitle}>Select which type of personality you are:</Text>

      <View>
      <ProfileOption
      icon={<Image source={require("../assets/User-image.png")} style={{ width: 80, height:80 }}></Image>}
      label="User"
      description="Are you looking to connect with influencers?
      Choose your favorite influencer and connect with them."
      selected={selected === 'user'}
      onPress={() => setSelected('user')}
      />
      </View>

      <View>

      <ProfileOption
      icon={<Image source={require("../assets/Influencer-image.png")} style={{ width: 80, height:80 }}></Image>}
      label="Influencer"
      description="Are you looking to connect with influencers?
      Choose your favorite influencer and connect with them."
      selected={selected === 'influencer'}
      onPress={() => setSelected('influencer')}
      />
      </View>

      <OptionButton
        title="Continue"
        disabled={!selected}
        onPress={() => navigation.navigate('Login')}
      />
      <Text style={styles.textTerms}>By you continueing you're agreed to the T&C's and consent
        personal information being used in accordance with the privacy policy
      </Text>
    </View>
  );
};

export default ProfileSelectScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', },
  title: { fontSize: 24, marginBottom: 20, fontFamily:'Roboto' },
  subtitle: {fontSize:12},
  textTerms:{fontSize:12, padding:10, width:224, textAlign:"center",color:"#c0c0c0"},
});
