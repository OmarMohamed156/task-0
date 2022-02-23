import React ,{useEffect, useState} from "react";
import {Text,HStack,Center,NativeBaseProvider,extendTheme,VStack,Button,ScrollView} from "native-base";
import { VictoryChart,VictoryTheme,VictoryLine, VictoryLabel, VictoryAxis} from "victory-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTemperatureThreeQuarters,faDroplet, faEraser } from "@fortawesome/free-solid-svg-icons";
import { Dimensions } from "react-native";
import axios from "axios";
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};
const data = [
  { year: '2011', earnings: '13k' },
  { year: '2012', earnings: '16.5k' },
  { year: '2013', earnings: '14k' },
  { year: '2014', earnings: '19k' }
 ];
// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const [tempData, setTempData] = useState([]);
  const [humData, setHumData] = useState([]);
  // const [alarmStatus,setAlarmStatus]= useState();
  const [alarmStatusMessage,setAlarmStatusMessage] = useState('Set');

  const PlotTemperatureData=()=>{
    setInterval(()=>{
      axios.get('http://remote-monitoring-api.herokuapp.com/readings/temp',{
        headers: {
          'Content-Type': 'application/json'
      }
      }).then((res)=>{
        console.log(res.data.temperatures);
        setTempData(res.data.temperatures);
      })
    },12000)
  }
  const PlotHumidityData=()=>{

    // setHumData(data);
  }
  const deleteData=()=>{
    setTempData([]);
    setHumData([]);
  }
  const setAlarm = (status)=>{
    axios.post('https://remote-monitoring-api.herokuapp.com/control/alarm',{
      "is_set": status
    })
    .then((res)=>{
      console.log(res.status);
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }
  const toggleAlarm=()=>{
    axios.get('https://remote-monitoring-api.herokuapp.com/control/alarm')
    .then((res)=>{
      console.log(res.data.alarm);
      if(res.data.alarm == 1){
        setAlarmStatusMessage('Set')
        setAlarm(0);
      }
      else{
        setAlarmStatusMessage('Disable')
        setAlarm(1);
      }
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }
  //  useEffect(()=>{
  //    setInterval(()=> {
  //      setData([]);
  //      addData();
  //    },5500);
  //  },[chartData])
  return (
    <NativeBaseProvider>
      <Center height='89%' >
        <ScrollView>
        <VStack safeArea > 
            <Text mt={1} textAlign='center' color='tertiary.600'> <FontAwesomeIcon  color="#059669" icon={faTemperatureThreeQuarters}/> Tempreature Graph</Text>
            <Center>
              <HStack >
                <ScrollView mx={5} horizontal={true}>
                    <VictoryChart domain={{x:[0,100]}} width={Dimensions.get('window').width} >
                      <VictoryLine style={{
                        data: { stroke: '#059669'}
                      }} animate={{
                        duration:5000,
                        easing:'sinIn'
                      }}
                      data={tempData}  y="temperature" />
                      <VictoryAxis crossAxis label='Time' axisLabelComponent={<VictoryLabel dy={25}  textAnchor='inherit' />}/>
                      <VictoryAxis dependentAxis crossAxis  label='Temperature'   axisLabelComponent={<VictoryLabel  dy={-30} textAnchor='inherit' />}/>
                    </VictoryChart>
                </ScrollView>
              </HStack>
            </Center>
            <Text mt={1} textAlign='center' color='primary.500' >  <FontAwesomeIcon color="#06b6d4" icon={faDroplet} /> Humidity Graph</Text>
            <Center>
              <HStack >
                <ScrollView mx={5} horizontal={true}>
                    <VictoryChart domain={{x:[0,100]}} width={Dimensions.get('window').width-25} theme={VictoryTheme.material}>
                      <VictoryLine style={{
                        data: { stroke: '#059669'}
                      }}
                      animate={{
                        duration:5000,
                        easing: 'sinOut'
                      }} data={humData} x="year" y="earnings" />
                      <VictoryAxis crossAxis label='Time' axisLabelComponent={<VictoryLabel dy={25}  textAnchor='inherit' />}/>
                      <VictoryAxis dependentAxis crossAxis  label='Humidity'   axisLabelComponent={<VictoryLabel  dy={-30} textAnchor='inherit' />}/>
                    </VictoryChart>
                </ScrollView>
              </HStack>
            </Center>
          </VStack>
        </ScrollView>
      </Center>
      <Center height='11%'>
        <VStack>
          <HStack justifyContent='space-around' >
            <Button borderRadius={50} mx={3}  colorScheme="tertiary"  onPress={PlotTemperatureData}><Text color='white' >Get Temperature <FontAwesomeIcon  color="#ffffff" icon={faTemperatureThreeQuarters}/></Text></Button>
            <Button  borderRadius={50} mx={3}   colorScheme="primary" onPress={PlotHumidityData}><Text color='white'>Get Humidity <FontAwesomeIcon  color="#ffffff" icon={faDroplet}/></Text></Button>
          </HStack>
          <Center>
            <HStack my={1}>
              <Button  borderRadius={50} colorScheme='danger' onPress={toggleAlarm} on ><Text color='white'>{alarmStatusMessage} Alarm <FontAwesomeIcon  color="#ffffff" icon={faEraser}/></Text></Button>
            </HStack>
          </Center>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}


