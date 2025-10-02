import Navigator from "@/components/Navigator";
import RecipeCard from "@/components/RecipeCard";
import TopBar from "@/components/TopBar";
import { Link, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AllRecipes = () => {
	const db = useSQLiteContext();
	const [recipes, setRecipes] = React.useState<Recipe[] | []>([]);

	useFocusEffect(
		React.useCallback(() => {
			async function getRecipes() {
				const results = await db.getAllAsync("SELECT * FROM recipes");
				setRecipes((results as Recipe[]) || []);
			}
			getRecipes();
		}, [db])
	);

	return (
		<SafeAreaView className="flex-1">
			<TopBar title={"All Recipes"} />
			<View className="flex-1 justify-center items-center">
				<View className="flex-1 w-full">
					<FlatList
						data={recipes}
						renderItem={({ item }) => (
							<Link
								href={{
									pathname: "/recipe/[id]",
									params: { id: item.id.toString() },
								}}
								asChild
							>
								<RecipeCard
									title={item.title}
									ingredients={item.ingredients}
									instructions={item.instructions}
									isStarred={item.isStarred}
								/>
							</Link>
						)}
						keyExtractor={(item) => item.id.toString()}
					/>
				</View>
			</View>
			<Navigator currentPage="/all" />
		</SafeAreaView>
	);
};

export default AllRecipes;
