// import React from 'react';
// import { View, Text } from 'react-native';

// import { createStackNavigator, createAppContainer } from 'react-navigation';

// import CalendarScreen from './CalendarScreen';
// import CameraScreen from './CameraScreen';

// import AppContainer from './Navigator';

// // const AppNavigator = createStackNavigator({
// // 	Camera: CameraScreen,
// // 	Calendar: CalendarScreen
// // });

// export default class App extends React.Component {
// 	render() {
// 		return (
// 			<View>
// 				{/* <AppContainer /> */}
// 				<CameraScreen />
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'center'
// 	}
// });

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import CameraScreen from './CameraScreen';

const AppNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Calendar: {
			screen: CalendarScreen
		},
		Camera: {
			screen: CameraScreen
		}
	},
	{
		initialRouteName: 'Home'
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}
