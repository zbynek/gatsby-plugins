"use strict";

const typeDefs = `
    type HtmlRehype implements Node @dontinfer {
        html: String
        htmlAst: JSON
        tableOfContents: JSON
    }
`;

// Is there a better way to check for existing types?
const useTypeExists = (store, name) => type => {
  const types = store.getState().schemaCustomization.types;
  const plugin = types.find(node => {
    var _node$plugin;
    return (node === null || node === void 0 ? void 0 : (_node$plugin = node.plugin) === null || _node$plugin === void 0 ? void 0 : _node$plugin.name) === name;
  });
  if (plugin === undefined) {
    return false;
  }
  const defs = plugin.typeOrTypeDef.definitions;
  const exists = defs.find(node => {
    var _node$name;
    return (node === null || node === void 0 ? void 0 : (_node$name = node.name) === null || _node$name === void 0 ? void 0 : _node$name.value) === type;
  });
  return exists !== undefined;
};
module.exports = (nodeApiArgs, pluginOptions = {}) => {
  const {
    plugins = []
  } = pluginOptions;
  const typeExistsDeprecated = useTypeExists(nodeApiArgs.store, `jamify-source-ghost`);
  const typeExists = useTypeExists(nodeApiArgs.store, `gatsby-source-try-ghost`);
  if (!(typeExists(`HtmlRehype`) || typeExistsDeprecated(`HtmlRehype`))) {
    nodeApiArgs.actions.createTypes(typeDefs);
  }

  // This allows subplugins to use Node APIs bound to `gatsby-transformer-remark`
  // to customize the GraphQL schema. This makes it possible for subplugins to
  // modify types owned by `gatsby-transformer-html`.
  plugins.forEach(plugin => {
    const resolvedPlugin = plugin.module || plugin.module || require(plugin.resolve);
    if (typeof resolvedPlugin.createSchemaCustomization === `function`) {
      resolvedPlugin.createSchemaCustomization(nodeApiArgs, plugin.pluginOptions);
    }
  });
};