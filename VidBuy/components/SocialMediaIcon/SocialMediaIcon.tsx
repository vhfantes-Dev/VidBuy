import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import GoogleIcon from '../../assets/icons/GoogleIcon'
import FacebookIcon from '../../assets/icons/FacebookIcon'
import AppleIcon from '../../assets/icons/AppleIcon'
import styles from './styles'

export default function SocialMediaIcon() {
    return (
        <View>
            <Text style={styles.text}>Sign in with</Text>
            <View style={styles.iconArea}>
                <TouchableOpacity style={styles.button}>
                <GoogleIcon></GoogleIcon>
                </TouchableOpacity >

                <TouchableOpacity style={styles.button}>
                <FacebookIcon></FacebookIcon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                <AppleIcon></AppleIcon>
                </TouchableOpacity>
            </View>
        </View>
    )
}