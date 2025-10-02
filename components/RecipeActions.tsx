import { changeStarredStatus, deleteRecipe } from "@/helpers/db";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { SQLiteDatabase } from "expo-sqlite";
import { Pressable, Text, View } from "react-native";
const RecipeActions = ({
	db,
	recipeId,
	isStarred,
}: {
	db: SQLiteDatabase;
	recipeId: string;
	isStarred: boolean;
}) => {
	return (
		<View className="flex flex-col justify-end items-end p-4 gap-5">
			<Pressable
				className="w-16 h-16 flex items-center justify-center bg-pink-600 rounded-full"
				onPress={() => {
					changeStarredStatus(db, recipeId, !isStarred);
					router.navigate("/all");
				}}
			>
				<Text className="text-white">
					{isStarred ? (
						<Entypo name="star-outlined" size={24} color="white" />
					) : (
						<Entypo name="star" size={24} color="white" />
					)}
				</Text>
			</Pressable>
			<Pressable
				className="w-16 h-16 flex items-center justify-center bg-green-600  rounded-full"
				onPress={() =>
					router.push({ pathname: "/edit/[id]", params: { id: recipeId } })
				}
			>
				<Text className="text-white">
					<Entypo name="edit" size={24} color="white" />
				</Text>
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
				<Text className="text-white">
					<FontAwesome name="trash" size={24} color="white" />
				</Text>
			</Pressable>
		</View>
	);
};

export default RecipeActions;
