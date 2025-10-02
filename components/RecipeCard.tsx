import { Text, View } from "react-native";

const RecipeCard = ({
	title,
	ingredients,
	instructions,
}: {
	title: string;
	ingredients: string;
	instructions: string;
}) => {
	return (
		<View className="border p-4 m-2 rounded">
			<Text className="text-xl font-bold">{title}</Text>
			<Text className="text-gray-600">Ingredients: {ingredients}</Text>
			<Text className="text-gray-600">Instructions: {instructions}</Text>
		</View>
	);
};

export default RecipeCard;
