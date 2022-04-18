// TODO: JSdoc each field
export interface ChromeManifest {
  // Required: Are to be sourced from package.json

  manifest_version: 3;
  name: string;
  version: string;

  // Recommended

  action?: {
    default_icon?: Record<string, string>;
    default_title?: string;
    default_popup?: string;
  };

  // TODO: Find a type with the rest of the locales
  default_locale?: "en";
  description?: string;
  icons?: Record<string, string>;

  // Optional

  author?: string;
  // What's going on here?
  automation?: string;
  background?: {
    // Required
    service_worker: "background.js";
    // Optional
    type?: any;
  };
  // TODO: Find documentation
  chrome_settings_overrides?: Record<string, any>;
  // TODO: Find documentation
  chrome_url_overrides?: any;
  commands?: {
    // TODO: Find a list of default names
    [commandName: string]: {
      suggested_key?: {
        default?: string;
        windows?: string;
        mac?: string;
        linux?: string;
        chromeos?: string;
      };
      description?: string;
      global?: boolean; // default: false
    };
  };
  // Most people aren't going to use this; you're on your own
  content_capabilities?: any[];
  content_scripts?: {
    matches: string[];
    css?: string[];
    js?: string[];
    match_about_blank?: boolean; // default: false
    match_origin_as_fallback?: boolean; // defaults to false? idk
  }[];
  content_security_policy?: {
    extension_pages: string;
    sandbox: string;
  };
  // TODO: Find the actual type for this
  converted_from_user_script?: any;
  cross_origin_embedder_policy?: { value: "require-corp" };
  cross_origin_opener_policy?: { value: "same-origin" };
  // TODO: Get the chrome local type in here as well
  current_locale?: "en";
  // TODO: Give this some more info once google documents it
  declarative_net_request?: any;
  /**
   * If this is an extension that hooks into the chrome dev tools, then the page
   * specified here is used.
   */
  devtools_page?: string;
  // TODO: Give this some more info once google documents it
  differential_fingerprint?: any;
  event_rules?: {
    event: string;
    actions?: { type: string }[];
    conditions?: { type: string; css?: string[] }[];
  }[];
  externally_connectable?: {
    ids?: string[];
    matches?: string[];
    // TODO: idk what it defaults to?
    accepts_tls_channel_id?: boolean;
  };
  file_browser_handlers?: {
    id: string;
    default_title?: string;
    // Should be of the format filesystem:*.docx or filesystem:*.*
    file_filters?: string[];
  }[];
  file_system_provider_capabilities?: {
    configurable: boolean;
    multiple_mounts: boolean;
    // TODO: can it be anything else?
    source: "network";
  };
  homepage_url?: string;
  host_permissions?: (
    | "debugger"
    | "declarativeNetRequest"
    | "devtools"
    | "experimental"
    | "geolocation"
    | "mdns"
    | "proxy"
    | "tts"
    | "ttsEngine"
    | "wallpaper"
  )[];
  import?: {
    id: string;
    minimum_version?: string;
  }[];
  incognito?: "spanning" | "split" | "not_allowed";
  // TODO: Find a better source?
  // Referencing this post: https://github.com/GoogleChrome/developer.chrome.com/issues/250#issuecomment-821740592
  input_components?: {
    name: string;
    type: "ime";
    id: string;
    description?: string;
    language?: string;
    layout?: string;
  }[];
  // Advised not to use in general
  key?: string;
  minimum_chrome_version?: string;
  nacl_modules?: {
    path: string;
    mime_type: string;
  }[];
  // Source: https://source.chromium.org/chromium/chromium/src/+/main:chrome/common/extensions/manifest_handlers/natively_connectable_handler.cc;drc=354945de1fb564ef04c07cf8bfedf434d2d81747
  // This could very well be wrong, but I haven't found better documentation
  natively_connectable?: string[];
  // Source: https://stackoverflow.com/a/69976327/12865420
  oauth2?: {
    client_id: string;
    scopes: string[];
  };
  // TODO: What does this default to? False?
  offline_enabled?: boolean;
  omnibox?: Record<string, string>;
  optional_permissions?: ChromePermission[];
  options_page?: string;
  options_ui?: {
    page: string;
    open_in_tab?: boolean;
  };
  permissions?: ChromePermission[];
  platforms?: {
    nacl_arch: string;
    sub_package_path: string;
  }[];
  // TODO: Find documentation
  replacement_web_app?: any;
  // TODO: Further document this if it improves
  requirements?: Record<string, any>;
  sandbox?: {
    pages: string[];
    content_security_policy?: string;
  };
  short_name?: string;
  storage?: {
    /** Path to JSON schema */
    managed_schema: string;
  };
  // TODO: Remove this once it is removed from the docs
  system_indicator?: never;
  tts_engine?: {
    voices: {
      voice_name: string;
      lang: string;
      event_types: (
        | "start"
        | "word"
        | "sentence"
        | "marker"
        | "end"
        | "error"
      )[];
    }[];
  };
  update_url?: string;
  version_name?: string;
  web_accessible_resources?: {
    resources?: string[];
    matches?: string[];
    extension_ids?: string[];
    use_dynamic_url?: boolean;
  }[];
}

export type ChromePermission =
  | "activeTab"
  | "alarms"
  | "background"
  | "bookmarks"
  | "browsingData"
  | "certificateProvider"
  | "clipboardRead"
  | "clipboardWrite"
  | "contentSettings"
  | "contextMenus"
  | "cookies"
  | "debugger"
  | "declarativeContent"
  | "declarativeNetRequest"
  | "declarativeNetRequestFeedback"
  | "declarativeWebRequest"
  | "desktopCapture"
  | "documentScan"
  | "downloads"
  | "enterprise.deviceAttributes"
  | "enterprise.hardwarePlatform"
  | "enterprise.networkingAttributes"
  | "enterprise.platformKeys"
  | "experimental"
  | "fileBrowserHandler"
  | "fileSystemProvider"
  | "fontSettings"
  | "gcm"
  | "geolocation"
  | "history"
  | "identity"
  | "idle"
  | "loginState"
  | "management"
  | "nativeMessaging"
  | "notifications"
  | "pageCapture"
  | "platformKeys"
  | "power"
  | "printerProvider"
  | "printing"
  | "printingMetrics"
  | "privacy"
  | "processes"
  | "proxy"
  | "scripting"
  | "search"
  | "sessions"
  | "signedInDevices"
  | "storage"
  | "system.cpu"
  | "system.display"
  | "system.memory"
  | "system.storage"
  | "tabCapture"
  | "tabGroups"
  | "tabs"
  | "topSites"
  | "tts"
  | "ttsEngine"
  | "unlimitedStorage"
  | "vpnProvider"
  | "wallpaper"
  | "webNavigation"
  | "webRequest"
  | "webRequestBlocking";

export type SdkConfig = Omit<ChromeManifest, "version" | "manifest_version">;
