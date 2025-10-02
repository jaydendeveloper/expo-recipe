import Loading from "@/components/Loading";
import { initDb } from "@/helpers/db";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<Suspense fallback={<Loading />}>
				<SQLiteProvider onInit={initDb} databaseName="database" useSuspense>
					<Stack screenOptions={{ headerShown: false }} />
				</SQLiteProvider>
			</Suspense>
		</SafeAreaProvider>
	);
}
