import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export class HomeScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Home Screen</Text>
				<Button
					title="Go to Calendar"
					onPress={() => this.props.navigation.navigate('Calendar')}
				/>
				<Button
					title="Go to Camera"
					onPress={() => this.props.navigation.navigate('Camera')}
				/>
			</View>
		);
	}
}

export class AwayScreen extends React.Component {
	render() {
		return (
			<View>
				<Text>Away Screen</Text>
			</View>
		);
	}
}
