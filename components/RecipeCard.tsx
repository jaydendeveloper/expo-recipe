import { Pressable, Text, View, type PressableProps } from "react-native";

const RecipeCard = ({
	title,
	ingredients,
	instructions,
	isStarred,
	...props
}: {
	title: string;
	ingredients: string;
	instructions: string;
	isStarred: boolean;
} & PressableProps) => {
	return (
		<Pressable
			{...props}
			className="bg-white dark:bg-slate-800 rounded-xl p-4 m-2 shadow-md"
		>
			<View className="flex flex-row justify-between items-start">
				<Text className="text-2xl font-bold text-slate-900 dark:text-white w-11/12">
					{title}
				</Text>
				{isStarred ? <Text className="text-2xl ml-2">⭐</Text> : null}
			</View>
			<Text
				className="text-slate-500 dark:text-slate-400 mt-2"
				numberOfLines={2}
			>
				{ingredients}
			</Text>
		</Pressable>
	);
};

export default RecipeCard;
