export type BlocksCategoryMetadata = {
  id: string;
  name: string;
  thumbnail?: string;
  thumbnailCustomClasses?: string;
  count: string;
  hasCharts?: boolean;
};

export type BlocksMetadata = {
  id: string;
  category: string;
  name: string;
  iframeHeight?: string;
  type: "file" | "directory";
};

export const categoryIds: { [key: string]: string } = {
  FileUpload: "file-upload",
  FormLayout: "form-layout",
  Login: "login",
  Stats: "stats",
  GridList: "grid-list",
  Dialogs: "dialogs",
  Sidebar: "sidebar",

  AI: "ai",
  Tables: "tables",
};
