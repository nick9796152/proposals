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
          fields: [
            // 1. Cover Section
            { name: "title", type: "string", required: true },
            { name: "subtitle", type: "string", label: "Cover Subtitle" },
            { name: "author", type: "string", label: "Prepared By" },

            // 2. Service Section (Page 1)
            { name: "page1_title", type: "string", label: "Page 1 Title" },
            { name: "service1_title", type: "string", label: "Service 1 Title" },
            { name: "service1_desc", type: "string", label: "Service 1 Description" },
            { name: "service2_title", type: "string", label: "Service 2 Title" },
            { name: "service2_desc", type: "string", label: "Service 2 Description" },
            { name: "service3_title", type: "string", label: "Service 3 Title" },
            { name: "service3_desc", type: "string", label: "Service 3 Description" },

            // 3. Bill Section (Page 2)
            { name: "page2_title", type: "string", label: "Page 2 Title" }
          ]
        }
      ]
    })
  ],
  // This section FIXES the "Sitemap is empty" error
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
