import {
	createAppContainer,
	createSwitchNavigator,
	createStackNavigator
} from 'react-navigation';

import CalendarScreen from './CalendarScreen';
import CameraScreen from './CameraScreen';

const AppNavigator = createStackNavigator(
	{
		Camera: { screen: CameraScreen },
		Calendar: { screen: CalendarScreen }
	},
	{ initialRouteName: 'Camera' }
);

// export default createAppContainer(
// 	createSwitchNavigator({
// 		// You could add another route here for authentication.
// 		// Read more at https://reactnavigation.org/docs/en/auth-flow.html
// 		Main: AppNavigator
// 	})
// );
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
