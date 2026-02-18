export type UiSurface =
  | 'block_card'
  | 'code_viewer'
  | 'preview_panel'
  | 'registry_dialog'
  | 'header'
  | 'footer'
  | 'docs_page';

type BaseProperties = {
  route_path: string;
  route_query_keys: string[];
  referrer_host: string;
  vercel_env: string;
  app_version: string;
};

type BlockContext = {
  block_id?: string;
  category_id?: string;
};

type SearchSubmittedProperties = BaseProperties & {
  query_length: number;
  token_count: number;
  ui_surface: UiSurface;
};

type SearchFilterChangedProperties = BaseProperties & {
  filter_key: string;
  filter_value: string;
  ui_surface: UiSurface;
};

type BlockPreviewOpenedProperties = BaseProperties & {
  block_id: string;
  category_id: string;
  ui_surface: UiSurface;
};

type SnippetCopiedProperties = BaseProperties &
  BlockContext & {
    snippet_type: 'source_code' | 'registry_config' | 'install_command';
    language: string;
    ui_surface: UiSurface;
  };

type RegistryInstallClickedProperties = BaseProperties & {
  block_id: string;
  category_id: string;
  ui_surface: UiSurface;
};

type CtaClickedProperties = BaseProperties &
  BlockContext & {
    cta_id: string;
    destination_host: string;
    ui_surface: UiSurface;
  };

export type AnalyticsEventMap = {
  search_submitted: SearchSubmittedProperties;
  search_filter_changed: SearchFilterChangedProperties;
  block_preview_opened: BlockPreviewOpenedProperties;
  snippet_copied: SnippetCopiedProperties;
  registry_install_clicked: RegistryInstallClickedProperties;
  cta_clicked: CtaClickedProperties;
};

export type AnalyticsEventName = keyof AnalyticsEventMap;
