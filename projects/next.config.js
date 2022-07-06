const webpack = require("webpack");
const withImages = require("next-images");

module.exports = withImages({
  basePath: '/web',  
  esModule: true,
  trailingSlash: true,
  images: {
    disableStaticImages: true,
  },
  //fileExtensions: ["jpg", "jpeg", "png", "svg", "gif", "ico", "webp", "jp2", "avif"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {   
    ignoreDuringBuilds: true,
  },
});
