import { Pressable, Text, type PressableProps } from "react-native";

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
			className=" flex flex-row justify-between border p-4 m-2 rounded"
		>
			<Text className="text-2xl font-bold">{title}</Text>
			{isStarred ? <Text className="text-2xl">⭐</Text> : null}
		</Pressable>
	);
};

export default RecipeCard;
