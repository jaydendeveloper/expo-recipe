import { Link } from "expo-router";
import { Text, View } from "react-native";

const Navigator = () => {
	return (
		<View className="flex-row p-5 bg-gray-200">
			<Link className="flex-1 h-full" href="/">
				<Text className="text-xl font-bold text-center">Starred</Text>
			</Link>
			<Link className="flex-1 h-full" href="/all">
				<Text className="text-xl font-bold text-center">All</Text>
			</Link>
			<Link className="flex-1 h-full" href="/new">
				<Text className="text-xl font-bold text-center">+ New</Text>
			</Link>
		</View>
	);
};

export default Navigator;
