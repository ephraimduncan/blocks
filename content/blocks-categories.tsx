import { blocksMetadata } from "./blocks-metadata";
import {
  BlocksCategoryMetadata,
  BlocksMetadata,
  categoryIds,
} from "./declarations";

type CategoryCount = Record<string, number>;

const countByCategory = (blocks: BlocksMetadata[]): CategoryCount => {
  return blocks.reduce((acc: CategoryCount, block: BlocksMetadata) => {
    const { category } = block;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
};

const updateCategoryCounts = (
  categories: Omit<BlocksCategoryMetadata, "count">[],
  counts: CategoryCount
): BlocksCategoryMetadata[] => {
  const countsMap = new Map<string, number>(Object.entries(counts));
  return categories.map((category) => ({
    ...category,
    count: (countsMap.get(category.id) || "0").toString(),
  }));
};

const initializeAndUpdateCategories = (): BlocksCategoryMetadata[] => {
  const categoryCounts = countByCategory(blocksMetadata);
  return updateCategoryCounts(preblocksCategoriesMetadata, categoryCounts);
};

const preblocksCategoriesMetadata: Omit<BlocksCategoryMetadata, "count">[] = [
  {
    id: categoryIds.Dialogs,
    name: "Dialogs",
    hasCharts: false,
    thumbnailCustomClasses: "w-9/12",
  },
  {
    id: categoryIds.FileUpload,
    name: "File Upload",
    hasCharts: false,
  },
  {
    id: categoryIds.FormLayout,
    name: "Form Layout",
    hasCharts: false,
    thumbnailCustomClasses: "w-8/12",
  },
  {
    id: categoryIds.GridList,
    name: "Grid List",
    hasCharts: false,
  },
  {
    id: categoryIds.Login,
    name: "Login & Signup",
    hasCharts: false,
    thumbnailCustomClasses: "w-8/12",
  },
  {
    id: categoryIds.Stats,
    name: "Stats",
    hasCharts: false,
  },
  {
    id: categoryIds.Sidebar,
    name: "Sidebar",
    hasCharts: false,
    thumbnailCustomClasses: "w-10/12 self-end",
  },

  {
    id: categoryIds.AI,
    name: "AI Components",
    hasCharts: false,
    thumbnailCustomClasses: "w-10/12",
  },
  {
    id: categoryIds.Tables,
    name: "Tables",
    hasCharts: false,
    thumbnailCustomClasses: "w-11/12 justify-self-end",
  },
  {
    id: categoryIds.Onboarding,
    name: "Onboarding",
    hasCharts: false,
  },
];

export const blocksCategoriesMetadata = initializeAndUpdateCategories().sort(
  (a, b) => a.name.localeCompare(b.name)
);
