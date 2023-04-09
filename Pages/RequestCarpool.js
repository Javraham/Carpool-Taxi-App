import React from 'react';
import { ListItem, Avatar } from "@react-native-material/core";
import {View} from 'react-native';

const Offer = {
    origin: "Oakville",
    destination: "Hamilton"
}

export default function RequestCarpool({navigation}) {
    return (
    <View>
        <ListItem
        onPress={() => {
            navigation.push("Carpool Request", {name: "Plan Your Carpool"})
        }}
        leadingMode="avatar"
        leading={
            <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} />
        }
        title="Brunch this weekend?"
        secondaryText="I'll be in your neighborhood doing errands this…"
        />
    </View>
    )
}

