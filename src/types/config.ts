export interface Config {
  /** Application Config */
  app: {
    /** Name of the app is loaded from the `manifest.json` */
    TITLE: string;
    /** Theme is also loaded from the `manifest.json` */
    THEME_COLOR: string;
    /** URL to our public API Gateway endpoint */
    URL: string;
    /** Where the bundled distribution files (`index.js`, `index.css`) are hosted */
    DIST_URL: string;
    /** Where the contents of the `public` folder are hosted (might be the same as `config.app.DIST_URL`) */
    PUBLIC_URL: string;
    BACKEND_URL: string;
  };
}
