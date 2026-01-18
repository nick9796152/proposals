import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["."], // Look in the main folder
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/", 
          filePath: "index.html", // Point directly to your file
          fields: [{ name: "title", type: "string", required: true }]
        }
      ]
    })
  ],
  siteMap: ({ documents, models }) => {
    const pageModels = models.filter((m) => m.type === "page");

    return documents
      .filter((d) => pageModels.some(m => m.name === d.modelName))
      .map((document) => {
        return {
          stableId: document.id,
          urlPath: "/",
          document,
          isHomePage: true,
        };
      }) as SiteMapEntry[];
  }
});
