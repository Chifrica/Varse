import React from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { style } from './style'

const KYCSetUp = () => {
    return (
      <SafeAreaView>
        <ScrollView>
          <Image 
            source={require('../../../../assets/icons/logo.png')} 
            style={style.image}  
          />

          <View>
            <Text style={style.headerTxt}>KYC Set Up</Text>
            <Text>You are just a step away from becoming a vendor</Text>
          </View>

          <View>
            <Text>Basic Info</Text>
            <Text>Documents</Text>
          </View>

          <View>
            <View>
              <View>
                <Text>Business Name</Text>
                <TextInput 
                  placeholder='Business name'
                />
              </View>

              <View>
                <Text>Category</Text>
                {/* Drop-down menu */}
              </View>
            </View>
            <View>
              <Text>Full Name</Text>
              <TextInput 
                placeholder='full name'
              />
            </View>
            <Text>Address</Text>
            <TextInput 
              placeholder='address'  
            />
          </View>

          <TouchableOpacity>
            <Text>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }

export default KYCSetUp
