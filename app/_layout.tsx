import Loading from "@/components/Loading";
import { initDb } from "@/helpers/db";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<Suspense fallback={<Loading />}>
				<SQLiteProvider onInit={initDb} databaseName="database" useSuspense>
					<View className="dark:bg-zinc-900">
						<Stack screenOptions={{ headerShown: false }} />
					</View>
				</SQLiteProvider>
			</Suspense>
		</SafeAreaProvider>
	);
}
