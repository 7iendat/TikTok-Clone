import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthMenu from '../../components/auth/AuthMenu'
import AuthDetail from '../../components/auth/AuthDetail'

const AuthScreen = () => {
  const [authPage, setAuthPage] = useState(0)
  const [detailPage, setDetailPage] = useState(false)
  return (
    <View style={{flex:1, marginTop:50, backgroundColor:'white'}}>
      {detailPage ? <AuthDetail setDetailPage={setDetailPage} authPage={authPage}/> : <AuthMenu authPage={authPage} setAuthPage={setAuthPage} setDetailPage={setDetailPage}/>}
      
    </View>
  )
}

export default AuthScreen

const styles = StyleSheet.create({})