/** @type {import('next').NextConfig} */

const nextConfig = {
	// output: 'export',
	trailingSlash: true,
	async rewrites() {
		return [
			{
				source: "/api/eurobilltracker/",
				destination: "https://api.eurobilltracker.com/",
			},
		];
	}
}

module.exports = nextConfig
