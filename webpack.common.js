const HtmlWebPackPlugin   = require("html-webpack-plugin");
const TsConfigPathsPlugin = require("awesome-typescript-loader").TsConfigPathsPlugin;

module.exports = {
  "entry" : "./src/ui/index.ts",

  "module"  : {
    "rules" : [
      {
        "include" : /src/,
        "test"    : /\.ts(x)?$/,

        "use" : {
          "loader"  : "awesome-typescript-loader"
        }
      }
    ]
  },

  "output"  : {
    "publicPath"  : "/"
  },

  "plugins" : [
    new HtmlWebPackPlugin({
      "filename"  : "./index.html",
      "template"  : "./src/ui/index.html"
    })
  ],

  "resolve" : {
    "extensions"  : [".ts", ".tsx", ".js", ".jsx", ".json"],
    "plugins" : [
      new TsConfigPathsPlugin({
        "tsconfig"  : __dirname + "/tsconfig.json",
        "compiler"  : "typescript"
      })
    ]
  },
};
