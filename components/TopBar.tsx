import { Text, View } from "react-native";

const TopBar = ({ title }: { title: string }) => {
	return (
		<View className="bg-[#f8f8f8] p-4 border-b border-[#eee]">
			<Text className="text-3xl font-bold">{title}</Text>
		</View>
	);
};

export default TopBar;
