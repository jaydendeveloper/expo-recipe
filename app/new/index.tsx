import Navigator from "@/components/Navigator";
import TopBar from "@/components/TopBar";
import CheckBox from "expo-checkbox";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
	const [formData, setFormData] = React.useState({
		title: "",
		ingredients: "",
		instructions: "",
		isStarred: false,
	});

	const db = useSQLiteContext();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopBar title={"New recipe"} />
			<View className="p-4 gap-5">
				<TextInput
					className="border border-green-700 w-full"
					placeholder="Recipe title"
					value={formData.title}
					onChangeText={(text) => setFormData({ ...formData, title: text })}
				/>
				<TextInput
					className="border border-green-700 w-full"
					placeholder="Recipe ingredients"
					value={formData.ingredients}
					onChangeText={(text) =>
						setFormData({ ...formData, ingredients: text })
					}
				/>
				<TextInput
					className="border border-green-700 w-full"
					placeholder="Recipe instructions"
					value={formData.instructions}
					onChangeText={(text) =>
						setFormData({ ...formData, instructions: text })
					}
				/>
				<View className="flex-row items-center gap-2 mt-2">
					<CheckBox
						color={"#15803d"}
						value={formData.isStarred}
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
							`INSERT INTO recipes (title, ingredients, instructions, isStarred) VALUES (?, ?, ?, ?)`,
							[
								formData.title,
								formData.ingredients,
								formData.instructions,
								formData.isStarred,
							]
						);

						setFormData({
							title: "",
							ingredients: "",
							instructions: "",
							isStarred: false,
						});
					}}
				/>
			</View>
			<View className="flex-1" />
			<Navigator />
		</SafeAreaView>
	);
};

export default Settings;
