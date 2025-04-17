import { FileUploadThumbnail } from "@/components/thumbnails/file-upload";
import { FormLayoutThumbnail } from "@/components/thumbnails/form-layout";
import { LoginThumbnail } from "@/components/thumbnails/login";
import { StatsThumbnail } from "@/components/thumbnails/stats";

import { DialogThumbnail } from "@/components/thumbnails/dialog";
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
    thumbnail: DialogThumbnail,
    hasCharts: false,
  },
  {
    id: categoryIds.FileUpload,
    name: "File Upload",
    thumbnail: FileUploadThumbnail,
    hasCharts: false,
  },
  {
    id: categoryIds.FormLayout,
    name: "Form Layout",
    thumbnail: FormLayoutThumbnail,
    hasCharts: false,
  },
  {
    id: categoryIds.GridList,
    name: "Grid List",
    thumbnail: StatsThumbnail,
    hasCharts: false,
  },
  {
    id: categoryIds.Login,
    name: "Login & Signup",
    thumbnail: LoginThumbnail,
    hasCharts: false,
  },
  {
    id: categoryIds.Stats,
    name: "Stats",
    thumbnail: StatsThumbnail,
    hasCharts: false,
  },
  {
    id: categoryIds.Sidebar,
    name: "Sidebar",
    thumbnail: StatsThumbnail,
    hasCharts: false,
  },
];

export const blocksCategoriesMetadata = initializeAndUpdateCategories();
