import React ,{useEffect, useState} from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
  Button,
  Toast
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { VictoryBar, VictoryChart, VictoryLegend, VictoryTheme, Victoryl, VictoryScatter, VictoryLine, VictoryZoomContainer
} from "victory-native";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};
const data = [
  { year: '2011', earnings: 13000 },
  { year: '2012', earnings: 16500 },
  { year: '2013', earnings: 14250 },
  { year: '2014', earnings: 19000 }
 ];
// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const [chartData, setData] = useState(data);
  const addData = () => {
    var maxYear = 2015;
    var d = [...chartData]
    var obj = {year: `${maxYear}`, earnings: Math.random() * (20000 - 10000) + 10000}
    d.push(obj)
    setData(d)
    console.log(chartData);
    maxYear++
   }

   useEffect(()=>{
     setInterval(()=> {
       setData([]);
       addData();
     },5500);
   },[chartData])
  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <VStack space={5} alignItems="center">
        <VictoryChart width={350} theme={VictoryTheme.material}>
          {chartData && 

          <VictoryLine data={chartData} animate={{
            duration: 500,
            easing: 'sinIn'
          }} y="earnings" />}
        </VictoryChart>
        <Button onPress={addData}>Add Earnings</Button>
          {/* <NativeBaseIcon />
          <Heading size="lg">Welcome to NativeBase</Heading>
          <HStack space={2} alignItems="center">
            <Text>Edit</Text>
            <Code>App.js</Code>
            <Text>and save to reload.</Text>
          </HStack>
          <Link href="https://docs.nativebase.io" isExternal>
            <Text color="primary.500" underline fontSize={"xl"}>
              Learn NativeBase
            </Text>
          </Link>
          <ToggleDarkMode /> */}
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
