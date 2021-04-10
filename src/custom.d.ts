declare var __WEB__: boolean;
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module NodeJS {
  interface Global {
    __WEB__: boolean;
    window: Window;
  }
}

interface Window {
  __CONFIG__: any;
  __FETCH_STATE__: any;
}
