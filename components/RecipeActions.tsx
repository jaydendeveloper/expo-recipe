import { Pressable, Text, View } from "react-native";

const RecipeActions = () => {
	return (
		<View className="flex flex-col justify-end items-end p-4 gap-5">
			<Pressable
				className="w-16 h-16 flex items-center justify-center bg-green-600  rounded-full"
				onPress={() => {}}
			>
				<Text className="text-white">Edit</Text>
			</Pressable>
			<Pressable
				className="w-16 h-16 flex items-center justify-center bg-red-600  rounded-full"
				onPress={() => {}}
			>
				<Text className="text-white">Delete</Text>
			</Pressable>
		</View>
	);
};

export default RecipeActions;
