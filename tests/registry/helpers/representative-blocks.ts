export type RepresentativeBlock = {
  category: string;
  id: string;
  type: "file" | "directory";
};

export const representativeBlocks: RepresentativeBlock[] = [
  { category: "file-upload", id: "file-upload-01", type: "directory" },
  { category: "form-layout", id: "form-layout-01", type: "file" },
  { category: "login", id: "login-01", type: "file" },
  { category: "stats", id: "stats-01", type: "file" },
  { category: "grid-list", id: "grid-list-01", type: "file" },
  { category: "dialogs", id: "dialog-01", type: "file" },
  { category: "sidebar", id: "sidebar-01", type: "directory" },
  { category: "command-menu", id: "command-menu-01", type: "file" },
  { category: "ai", id: "ai-01", type: "file" },
  { category: "tables", id: "table-01", type: "file" },
  { category: "onboarding", id: "onboarding-01", type: "file" },
];
