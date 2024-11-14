import React, { useEffect, useRef } from 'react';
 
const JitsiCall = () => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    // Load Jitsi script if not already loaded
    const loadJitsiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = initializeJitsi;
      document.body.appendChild(script);
    };
 
    // Initialize Jitsi with basic configurations
    const initializeJitsi = () => {
      if (jitsiContainerRef.current) {
        const domain = 'meet.jit.si';
        const options = {
          roomName: 'MyCustomRoom123', // Replace with a unique room name
          width: '100%',
          height: 600,
          parentNode: jitsiContainerRef.current,
          configOverwrite: {
            startWithAudioMuted: false,
          },
          interfaceConfigOverwrite: {
            DEFAULT_REMOTE_DISPLAY_NAME: 'Guest',
          },
        };
        const api = new window.JitsiMeetExternalAPI(domain, options);
        api.addListener('videoConferenceJoined', () => {
          console.log('Local User Joined');
        });
      }
    };
 
    // Check if script is already present
    if (!window.JitsiMeetExternalAPI) {
      loadJitsiScript();
    } else {
      initializeJitsi();
    }
 
    // Cleanup on component unmount
    return () => {
      if (jitsiContainerRef.current) {
        jitsiContainerRef.current.innerHTML = ''; // Clear previous Jitsi meeting if any
      }
    };
  }, []);
 
  return <div ref={jitsiContainerRef} style={{ width: '100%', height: '600px' }} />;
};
 
export default JitsiCall;