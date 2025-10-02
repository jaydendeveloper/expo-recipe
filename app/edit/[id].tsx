import Loading from "@/components/Loading";
import Navigator from "@/components/Navigator";
import TopBar from "@/components/TopBar";
import { Checkbox } from "expo-checkbox";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Recipe = () => {
	const { id } = useLocalSearchParams();
	const db = useSQLiteContext();

	const [formData, setFormData] = React.useState<Recipe>({
		id: 0,
		title: "",
		ingredients: "",
		instructions: "",
		isStarred: false,
	});

	React.useEffect(() => {
		const fetchRecipe = async () => {
			const response = await db.getFirstAsync(
				"SELECT * FROM recipes WHERE id = ?",
				[String(id)]
			);
			setFormData(response as Recipe);
		};

		fetchRecipe();
	}, [id, db]);

	if (
		!db ||
		!id ||
		!formData.title.length ||
		!formData.ingredients.length ||
		!formData.instructions.length
	)
		return <Loading />;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopBar title={"Edit recipe"} />
			<View className="p-4 gap-5">
				<TextInput
					className="border border-green-700 w-full"
					placeholder="Recipe title"
					value={formData?.title || ""}
					onChangeText={(text) => setFormData({ ...formData, title: text })}
				/>
				<TextInput
					className="border border-green-700 w-full"
					placeholder="Recipe ingredients"
					value={formData.ingredients || ""}
					onChangeText={(text) =>
						setFormData({ ...formData, ingredients: text })
					}
				/>
				<TextInput
					className="border border-green-700 w-full"
					placeholder="Recipe instructions"
					value={formData.instructions || ""}
					onChangeText={(text) =>
						setFormData({ ...formData, instructions: text })
					}
				/>
				<View className="flex-row items-center gap-2 mt-2">
					<Checkbox
						color={"#15803d"}
						value={formData.isStarred || false}
						onValueChange={(value) =>
							setFormData({ ...formData, isStarred: value })
						}
					/>
					<Text>Starred</Text>
				</View>
				<Button
					color="#15803d"
					title="Save Recipe"
					onPress={() => {
						if (
							Object.entries(formData)
								.filter(([key]) => key !== "isStarred")
								.some(([_, value]) => !value)
						) {
							console.log("Please fill in all fields");
							return;
						}

						db.runAsync(
							`UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, isStarred = ? WHERE id = ?`,
							[
								formData.title,
								formData.ingredients,
								formData.instructions,
								formData.isStarred,
								String(id),
							]
						);

						router.back();
					}}
				/>
			</View>
			<View className="flex-1" />
			<Navigator />
		</SafeAreaView>
	);
};

export default Recipe;
