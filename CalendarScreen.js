import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Permissions } from 'expo';
import {
	StyleSheet,
	View,
	FlatList,
	Dimensions,
	ActivityIndicator,
	Platform,
	Text
} from 'react-native';
import { CalendarList, Agenda } from 'react-native-calendars';

class CalendarScreen extends Component {
	static navigationOptions = {
		title: 'Calendar'
	};
	constructor(props) {
		super(props);
		this.state = {
			items: {
				'2012-05-22': [{ text: 'item 1 - any js object' }],
				'2012-05-23': [{ text: 'item 2 - any js object' }],
				'2012-05-24': [],
				'2012-05-25': [
					{ text: 'item 3 - any js object' },
					{ text: 'any js object' }
				]
			}
		};
	}

	// {
	// 	day: 1,     // day of month (1-31)
	// 	month: 1,   // month of year (1-12)
	// 	year: 2017, // year
	// 	timestamp,   // UTC timestamp representing 00:00 AM of this date
	// 	dateString: '2016-05-13' // date formatted as 'YYYY-MM-DD' string
	// }

	// async componentDidMount() {
	// 	// const { status } = await Permissions.askAsync(Permissions.CALENDAR);
	// 	this.setState({ hasCameraPermission: status === 'granted' });
	// }
	loadItems(day) {
		setTimeout(() => {
			for (let i = -15; i < 85; i++) {
				const time = day.timestamp + i * 24 * 60 * 60 * 1000;
				const strTime = this.timeToString(time);
				if (!this.state.items[strTime]) {
					this.state.items[strTime] = [];
					const numItems = Math.floor(Math.random() * 5);
					for (let j = 0; j < numItems; j++) {
						this.state.items[strTime].push({
							name: 'Item for ' + strTime,
							height: Math.max(50, Math.floor(Math.random() * 150))
						});
					}
				}
			}
			//console.log(this.state.items);
			const newItems = {};
			Object.keys(this.state.items).forEach(key => {
				newItems[key] = this.state.items[key];
			});
			this.setState({
				items: newItems
			});
		}, 0);
		// console.log(`Load Items for ${day.year}-${day.month}`);
	}
	renderItem(item) {
		return (
			<View style={[styles.item, { height: item.height }]}>
				<Text>{item.name}</Text>
			</View>
		);
	}

	renderEmptyDate() {
		return (
			<View style={styles.emptyDate}>
				<Text>This is empty date!</Text>
			</View>
		);
	}

	rowHasChanged(r1, r2) {
		return r1.name !== r2.name;
	}

	timeToString(time) {
		const date = new Date(time);
		return date.toISOString().split('T')[0];
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<Agenda
				items={this.state.items}
				loadItemsForMonth={this.loadItems.bind(this)}
				selected={'2017-05-16'}
				renderItem={this.renderItem.bind(this)}
				renderEmptyDate={this.renderEmptyDate.bind(this)}
				rowHasChanged={this.rowHasChanged.bind(this)}
			/>
		);
	}
}

export default CalendarScreen;

const styles = StyleSheet.create({
	view: {
		alignSelf: 'stretch',
		textAlign: 'center'
	},
	item: {
		backgroundColor: 'aliceblue',
		flex: 1,
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
		marginTop: 17
	},
	emptyDate: {
		height: 15,
		flex: 1,
		paddingTop: 30
	}
});
