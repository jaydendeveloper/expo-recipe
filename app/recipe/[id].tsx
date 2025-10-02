import Navigator from "@/components/Navigator";
import RecipeActions from "@/components/RecipeActions";
import TopBar from "@/components/TopBar";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Recipe = () => {
	const { id } = useLocalSearchParams();
	const db = useSQLiteContext();

	const [recipe, setRecipe] = React.useState<Recipe | null>(null);

	React.useEffect(() => {
		const fetchRecipe = async () => {
			const response = await db.getFirstAsync(
				"SELECT * FROM recipes WHERE id = ?",
				[String(id)]
			);
			setRecipe(response as Recipe);
		};

		fetchRecipe();
	}, [id, db]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopBar title={`${recipe?.title}`} />
			<View className="p-4 gap-4">
				<Text className="text-2xl font-bold">Ingredients</Text>
				<Text>{recipe?.ingredients}</Text>
				<Text className="text-2xl font-bold">Instructions</Text>
				<Text>{recipe?.instructions}</Text>
			</View>
			<View className="flex-1" />
			<RecipeActions />
			<Navigator />
		</SafeAreaView>
	);
};

export default Recipe;
