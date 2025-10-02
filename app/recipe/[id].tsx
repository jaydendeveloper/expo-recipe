import Loading from "@/components/Loading";
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
		}, [db, id])
	);

	if (!recipe) return <Loading />;

	return (
		<SafeAreaView className="dark:bg-zinc-900 flex-1">
			<TopBar title={`${recipe?.title}` + (recipe?.isStarred ? "⭐" : "")} />
			<View className="p-4 gap-4 ">
				<Text className="text-2xl font-bold dark:text-white">Ingredients</Text>
				<Text className="dark:text-white">{recipe?.ingredients}</Text>
				<Text className="text-2xl font-bold dark:text-white">Instructions</Text>
				<Text className="dark:text-white">{recipe?.instructions}</Text>
			</View>
			<View className="flex-1" />
			<RecipeActions
				db={db}
				recipeId={id as string}
				isStarred={recipe.isStarred}
			/>
			<Navigator currentPage={`/recipe/${id}`} />
		</SafeAreaView>
	);
};

export default Recipe;
