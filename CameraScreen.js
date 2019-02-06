import React, { Component } from 'react';
import { Camera, Permissions } from 'expo';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	CameraRoll,
	Image,
	ScrollView,
	Alert
} from 'react-native';

import vision from 'react-cloud-vision-api';
import visionKey from './tokens';
// Vision
vision.init({ auth: `${visionKey}` });

export default class CameraScreen extends Component {
	static navigationOptions = {
		title: 'Camera'
	};
	constructor() {
		super();
		this.state = {
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
			rooms: {
				'ROOM B': 'ROOM B'
			},
			currentText: ''
		};
	}

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	render() {
		const { navigate } = this.props.navigation;

		const { hasCameraPermission, room } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			return (
				<View style={{ flex: 1 }}>
					<Camera
						style={{ flex: 1 }}
						type={this.state.type}
						ref={ref => {
							this.camera = ref;
						}}>
						<View
							style={{
								flex: 1,
								backgroundColor: 'transparent',
								flexDirection: 'row'
							}}>
							<TouchableOpacity
								style={{
									flex: 0.1,
									alignSelf: 'flex-end',
									alignItems: 'center'
								}}
								onPress={() => {
									this.setState({
										type:
											this.state.type === Camera.Constants.Type.back
												? Camera.Constants.Type.front
												: Camera.Constants.Type.back
									});
								}}>
								<Text
									style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
									Flip
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									flex: 0.1,
									alignSelf: 'flex-end',
									alignItems: 'center'
								}}
								onPress={async () => {
									console.log('presses');
									let options = {
										quality: 0.5,
										base64: true
									};
									if (this.camera) {
										try {
											let photo = await this.camera.takePictureAsync(options);
											if (photo.base64) {
												this.setState({ taken: 'loading' });
												try {
													const req = new vision.Request({
														image: new vision.Image({
															base64: photo.base64
														}),
														features: [new vision.Feature('TEXT_DETECTION', 4)]
													});
													const res = await vision.annotate(req);
													let string =
														res.responses[0].textAnnotations[0].description;

													let stringSp = string.split('\n');
													// string.replace('\n', ' ').split(' ');
													let stringFil = stringSp.filter(
														element => element !== ''
													);
													console.log('stringFIL', stringFil);
													// this is where to dispatch string to redux happens
													this.setState({ currentText: stringFil });
												} catch (error) {
													console.log('error1', error);
												}
											}
											navigate('Calendar');
										} catch (error) {
											console.log('error2');
										}
									}
								}}>
								<Text
									style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
									SNAP
								</Text>
							</TouchableOpacity>

							<Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
								{this.state.currentText === ''
									? this.state.taken
									: this.state.currentText}
							</Text>
						</View>
					</Camera>
				</View>
			);
		}
	}
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// "private_key_id": "AIzaSyCo-PUgwmhBc__q9dP6xYxZDG6O6S7BYr8",
// API key 'AIzaSyCo-PUgwmhBc__q9dP6xYxZDG6O6S7BYr8'
// vision.init({ auth: 'AIzaSyCo-PUgwmhBc__q9dP6xYxZDG6O6S7BYr8' });

// const req = new vision.Request({
// 	image: new vision.Image({
// 		base64: base64Img
// 	}),
// 	features: [new vision.Feature('TEXT_DETECTION', 4)]
// });

// const handlePress = () => {
// 	vision.annotate(req).then(
// 		res => {
// 			// handling response
// 			console.log(JSON.stringify(res.responses));
// 		},
// 		e => {
// 			console.log('Error: ', e);
// 		}
// 	);
// };

// export default class App extends Component {
// 	constructor() {
// 		super();
// 		this.state = '';
// 	}
// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				<TouchableOpacity onPress={handlePress}>
// 					<Text style={styles.welcome}>Welcome to OCR Test!</Text>
// 				</TouchableOpacity>
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#F5FCFF'
// 	},
// 	welcome: {
// 		fontSize: 20,
// 		textAlign: 'center',
// 		margin: 10
// 	},
// 	instructions: {
// 		textAlign: 'center',
// 		color: '#333333',
// 		marginBottom: 5
// 	}
// });
