import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "日本Unboundユーザー会",
			sidebar: [
				{
					label: "Unbound",
					autogenerate: { directory: "unbound" },
				},
				{
					label: "NSD",
					autogenerate: { directory: "nsd4" },
				},
				{
					label: "ldns",
					autogenerate: { directory: "ldns" },
				},
				{
					label: "ユーザー会",
					link: "/about/",
				},
			],
		}),
	],
});
