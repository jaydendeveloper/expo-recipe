import { Text, View } from "react-native";

const TopBar = ({ title }: { title: string }) => {
	return (
		<View className="dark:bg-zinc-900 bg-[#f8f8f8] p-4 border-b border-[#eee]">
			<Text className="text-3xl font-bold dark:text-white">{title}</Text>
		</View>
	);
};

export default TopBar;
