import { Text, View } from "react-native";

const Loading = () => {
	return (
		<View className="flex-1 justify-center items-center dark:bg-zinc-900 dark:text-white dark:border-green-500 placeholder:text-gray-400">
			<Text>Loading...</Text>
		</View>
	);
};

export default Loading;
