import { Link } from "expo-router";
import { Text, View } from "react-native";

const Navigator = ({ currentPage }: { currentPage: string }) => {
	const getLinkStyle = (path: string) => {
		return currentPage === path
			? "text-xl font-bold text-center text-green-600 dark:text-green-400"
			: "text-xl font-bold text-center text-slate-500 dark:text-slate-400";
	};

	return (
		<View className="flex-row p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
			<Link className="flex-1 h-full" href="/">
				<Text className={getLinkStyle("/")}>Starred</Text>
			</Link>
			<Link className="flex-1 h-full" href="/all">
				<Text className={getLinkStyle("/all")}>All</Text>
			</Link>
			<Link className="flex-1 h-full" href="/new">
				<Text className={getLinkStyle("/new")}>+ New</Text>
			</Link>
		</View>
	);
};

export default Navigator;
