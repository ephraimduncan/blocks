import { blocksMetadata } from "./blocks-metadata";
import type { BlocksCategoryMetadata } from "./declarations";
import { categoryIds } from "./declarations";

const categories: Omit<BlocksCategoryMetadata, "count">[] = [
  {
    id: categoryIds.CommandMenu,
    name: "Command Menu",
    thumbnailCustomClasses: "w-9/12",
  },
  {
    id: categoryIds.Dialogs,
    name: "Dialogs",
    thumbnailCustomClasses: "w-9/12",
  },
  {
    id: categoryIds.FileUpload,
    name: "File Upload",
  },
  {
    id: categoryIds.FormLayout,
    name: "Form Layout",
    thumbnailCustomClasses: "w-8/12",
  },
  {
    id: categoryIds.GridList,
    name: "Grid List",
  },
  {
    id: categoryIds.Login,
    name: "Login & Signup",
    thumbnailCustomClasses: "w-8/12",
  },
  {
    id: categoryIds.Stats,
    name: "Stats",
  },
  {
    id: categoryIds.Sidebar,
    name: "Sidebar",
    thumbnailCustomClasses: "w-10/12 self-end",
  },

  {
    id: categoryIds.AI,
    name: "AI Components",
    thumbnailCustomClasses: "w-10/12",
  },
  {
    id: categoryIds.Tables,
    name: "Tables",
    thumbnailCustomClasses: "w-11/12 justify-self-end",
  },
  {
    id: categoryIds.Onboarding,
    name: "Onboarding",
    thumbnailCustomClasses: "w-8/12",
  },
  {
    id: categoryIds.Chat,
    name: "AI Chat",
    thumbnailCustomClasses: "w-10/12",
  },
];

export const blocksCategoriesMetadata = categories
  .map((category) => ({
    ...category,
    count: String(
      blocksMetadata.filter((block) => block.category === category.id).length
    ),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
