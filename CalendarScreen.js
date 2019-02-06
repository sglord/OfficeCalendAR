import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View, Text } from 'react-native';

// google login for user to check whether or not they are going to the event
// google calendar auth  - server side?

class CalendarScreen extends Component {
	static navigationOptions = {
		title: 'Calendar'
	};

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Calendar Screen</Text>
			</View>
		);
	}
}

// const AppNavigator = createStackNavigator(
// 	{
// 		Calendar: CalendarScreen,
// 		Camera: OCRCameraScreen
// 	},
// 	{
// 		initialRouteName: 'Calendar'
// 	}
// );
// export default createAppContainer(AppNavigator);

export default CalendarScreen;
