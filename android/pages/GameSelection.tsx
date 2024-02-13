import React, { useState } from "react";
import {
    SafeAreaView,
    Text,
    useColorScheme,
    Dimensions,
    View,
    Button,
} from 'react-native';
import { Slider } from '@react-native-assets/slider'

// export function GameSelection(): React.JSX.Element {
const GameSelection = () => {
    const backgroundStyle = {
        // backgroundColor: isDarkMode ? Colors.black : Colors.white,
        height: Dimensions.get('window').height,
        overflow: 'hidden',
        display: 'block',
    };

    const paramViewStyle = {
        flexDirection: "row", alignItems: "center", paddingTop: 40, padding: 10
    };

    const paramTextStyle = {
        width: "30%"
    }

    const paramValueStyle = {
        width: "10%"
    }

    const [mrWhiteCount, setMrWhiteCount] = useState(4);
    const [undercoversCount, setUndercoversCount] = useState(4);

    return (
        <SafeAreaView style={{ ...backgroundStyle, width: "100%" }}>
            <View style={{ flexDirection: "column", margin: 10, flex: 1 }}>
                <View style={{ ...paramViewStyle }}>
                    <Text style={{ ...paramTextStyle }}>Mr. White count</Text>
                    <Slider value={mrWhiteCount} onValueChange={(val) => {setMrWhiteCount(val)}} minimumValue={0} maximumValue={5} step={1} style={{ flex: 1, paddingHorizontal: 10 }} />
                    <Text style={{ ...paramValueStyle }}>{mrWhiteCount}</Text>
                </View>
                <View style={{ ...paramViewStyle }}>
                    <Text style={{ ...paramTextStyle }}>Undercovers count</Text>
                    <Slider value={undercoversCount} onValueChange={(val) => {setUndercoversCount(val)}} minimumValue={0} maximumValue={5} step={1} style={{ flex: 1, paddingHorizontal: 10 }} />
                    <Text style={{ ...paramValueStyle }}>{undercoversCount}</Text>
                </View>
                <View style={{marginTop: 40}}>
                    <Button title="Suivant"></Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default GameSelection;