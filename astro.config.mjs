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
					collapsed: true,
					autogenerate: { directory: "unbound" },
				},
				{
					label: "NSD",
					collapsed: true,
					autogenerate: { directory: "nsd4" },
				},
				{
					label: "ldns",
					collapsed: true,
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
