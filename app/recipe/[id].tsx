import Navigator from "@/components/Navigator";
import RecipeActions from "@/components/RecipeActions";
import TopBar from "@/components/TopBar";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Recipe = () => {
	const { id } = useLocalSearchParams();
	const db = useSQLiteContext();

	const [recipe, setRecipe] = React.useState<Recipe | null>(null);

	useFocusEffect(
		React.useCallback(() => {
			async function getRecipe() {
				const response = await db.getFirstAsync(
					"SELECT * FROM recipes WHERE id = ?",
					[String(id)]
				);
				setRecipe(response as Recipe);
			}
			getRecipe();
		}, [])
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopBar title={`${recipe?.title}` + (recipe?.isStarred ? "⭐" : "")} />
			<View className="p-4 gap-4">
				<Text className="text-2xl font-bold">Ingredients</Text>
				<Text>{recipe?.ingredients}</Text>
				<Text className="text-2xl font-bold">Instructions</Text>
				<Text>{recipe?.instructions}</Text>
			</View>
			<View className="flex-1" />
			<RecipeActions db={db} recipeId={id as string} />
			<Navigator />
		</SafeAreaView>
	);
};

export default Recipe;
