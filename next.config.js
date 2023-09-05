/** @type {import('next').NextConfig} */

const nextConfig = {
	// output: 'export',
	trailingSlash: true,
    webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"]
    });

    return config;
  },
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
