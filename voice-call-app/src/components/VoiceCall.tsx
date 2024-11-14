import React, { useEffect, useState } from 'react';
import AgoraRTC, { IAgoraRTCClient, ILocalAudioTrack } from 'agora-rtc-sdk-ng';

const VoiceCall = () => {
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null);
  const appId = 'ed27c06f960f4be291dcfb82c9b3fe14'; // Replace with your App ID from the Agora Console
  const channel = 'test'; // Your channel name
  const token = '007eJxTYDCJ/Wgl6rTsnZDQj7VvKpxnWm8+9ozhZrf2U8H+sJVaN2wVGFJTjMyTDczSLM0M0kySUo0sDVOS05IsjJItk4zTUg1NZI+bpjcEMjJwXq9iYWSAQBCfhaEktbiEgQEAUwUffg=='; // Replace with your token if applicable

  useEffect(() => {
    // Initialize Agora client
    const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    setClient(agoraClient);

    const initialize = async () => {
      try {
        await agoraClient.join(appId, channel, token, null);
        const track = await AgoraRTC.createMicrophoneAudioTrack();
        await agoraClient.publish([track]);
        setLocalAudioTrack(track);
      } catch (error) {
        console.error('Failed to join and publish on Agora channel:', error);
      }
    };

    initialize();

    return () => {
      localAudioTrack?.close();
      agoraClient?.leave();
    };
  }, []);

  return <div>Live Audio Call with Agora</div>;
};

export default VoiceCall;
