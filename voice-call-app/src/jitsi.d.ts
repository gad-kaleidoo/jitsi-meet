interface JitsiMeetExternalAPIOptions {
    roomName: string;
    width?: string | number;
    height?: string | number;
    parentNode: HTMLElement;
    configOverwrite?: Record<string, any>;
    interfaceConfigOverwrite?: Record<string, any>;
    userInfo?: {
      displayName?: string;
      email?: string;
    };
  }
  
  declare class JitsiMeetExternalAPI {
    constructor(domain: string, options: JitsiMeetExternalAPIOptions);
    addListener(event: string, callback: () => void): void;
    // Add more Jitsi API methods if needed
  }
  
  interface Window {
    JitsiMeetExternalAPI: typeof JitsiMeetExternalAPI;
  }
  