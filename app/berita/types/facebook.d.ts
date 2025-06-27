declare global {
  interface Window {
    FB: {
      init: (params: any) => void;
      XFBML: {
        parse: (element?: Element) => void;
      };
    };
    fbAsyncInit: () => void;
  }
}

export {};