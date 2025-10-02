import { deleteRecipe } from "@/helpers/db";
import { router } from "expo-router";
import { SQLiteDatabase } from "expo-sqlite";
import { Pressable, Text, View } from "react-native";

const RecipeActions = ({
	db,
	recipeId,
}: {
	db: SQLiteDatabase;
	recipeId: string;
}) => {
	return (
		<View className="flex flex-col justify-end items-end p-4 gap-5">
			<Pressable
				className="w-16 h-16 flex items-center justify-center bg-green-600  rounded-full"
				onPress={() =>
					router.push({ pathname: "/edit/[id]", params: { id: recipeId } })
				}
			>
				<Text className="text-white">Edit</Text>
			</Pressable>
			<Pressable
				className="w-16 h-16 flex items-center justify-center bg-red-600  rounded-full"
				onPress={async () => {
					const isDeleted = await deleteRecipe(db, recipeId);
					if (isDeleted) {
						router.back();
					} else {
						alert("Error deleting recipe");
					}
				}}
			>
				<Text className="text-white">Delete</Text>
			</Pressable>
		</View>
	);
};

export default RecipeActions;
