import React ,{useEffect, useState} from "react";
import {Text,HStack,Center,NativeBaseProvider,extendTheme,VStack,Button,ScrollView} from "native-base";
import { VictoryChart,VictoryTheme,VictoryLine, VictoryLabel, VictoryAxis} from "victory-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTemperatureThreeQuarters,faDroplet, faEraser } from "@fortawesome/free-solid-svg-icons";
import { Dimensions } from "react-native";
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

  const PlotTemperatureData=()=>{
    setTempData(data);
  }
  const PlotHumidityData=()=>{
    setHumData(data);
  }
  const deleteData=()=>{
    setTempData([]);
    setHumData([]);
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
                <ScrollView horizontal={true}>
                  {/* <VictoryChart width={400}>
                      <VictoryLine data={data}
                        animate={{
                        duration: 500,
                        easing: 'sinIn'
                      }}>
                        </VictoryLine>
                    </VictoryChart> */}
                    <VictoryChart width={Dimensions.get('window').width-25} theme={VictoryTheme.material}>
                      <VictoryLine animate={{
                        duration:5000,
                        easing:'polyIn'
                      }}
                      data={tempData} x="year" y="earnings" />
                      <VictoryAxis crossAxis label='Time' axisLabelComponent={<VictoryLabel dy={25}  textAnchor='inherit' />}/>
                      <VictoryAxis dependentAxis crossAxis  label='Temperature'   axisLabelComponent={<VictoryLabel  dy={-30} textAnchor='inherit' />}/>
                    </VictoryChart>
                </ScrollView>
              </HStack>
            </Center>
            <Text mt={1} textAlign='center' color='primary.500' >  <FontAwesomeIcon color="#06b6d4" icon={faDroplet} /> Humidity Graph</Text>
            <Center>
              <HStack >
                <ScrollView horizontal={true}>
                  {/* <VictoryChart width={400} >
                      <VictoryLine data={data}
                        animate={{
                        duration: 500,
                        easing: 'sinIn'
                      }}></VictoryLine>
                    </VictoryChart> */}
                    <VictoryChart width={Dimensions.get('window').width-25} theme={VictoryTheme.material}>
                      <VictoryLine 
                      animate={{
                        duration:5000,
                        easing:'polyIn'
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
                <Button  borderRadius={50} colorScheme='danger' onPress={deleteData}><Text color='white'>Delete Readings <FontAwesomeIcon  color="#ffffff" icon={faEraser}/></Text></Button>
            </HStack>
          </Center>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}


