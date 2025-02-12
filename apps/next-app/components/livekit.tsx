"use client"
import {
    ControlBar,
    GridLayout,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer,
    useTracks,
  } from '@livekit/components-react';
  
  import '@livekit/components-styles';
import axios from 'axios';
  
  import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
  
  const serverUrl = 'wss://live-stream-j0ngkwts.livekit.cloud';
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6ImZvdS1vdW0teXl2IiwiY2FuU3Vic2NyaWJlIjp0cnVlLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZX0sImlzcyI6IkFQSTVRSFFjOWpOUGFEVSIsImV4cCI6MTczODA1NjY5MSwibmJmIjowLCJzdWIiOiJhYXNkYXNkXzE3MzgwMzUwOTE2NDYifQ.1DuOCT46gzAtAnW39R7AfPi6hRBkCHibquNrWS4FgsI';
  
  export default function App() {

    const [token , setToken] = useState("")

    useEffect(()=>{
      axios.post("http://localhost:3000/api/call/token" , {name : Math.random().toString(), rommId : "fou-oum-yyv"}).then((res)=>{
        setToken(res.data.token)
      })
    },[])

    return (
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={serverUrl}
        // Use the default LiveKit theme for nice styles.
        data-lk-theme="default"
        style={{ height: '100vh' }}
      >
        {/* Your custom component with basic video conferencing functionality. */}
        {/* <MyVideoConference /> */}
        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
        <RoomAudioRenderer />
        {/* Controls for the user to start/stop audio, video, and screen
        share tracks and to leave the room. */}
        {/* <ControlBar /> */}
      </LiveKitRoom>
    );
  }
  
  function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
      [
        { source: Track.Source.Camera, withPlaceholder: true },
        { source: Track.Source.ScreenShare, withPlaceholder: false },
      ],
      { onlySubscribed: false },
    );
    return (
      <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
        {/* The GridLayout accepts zero or one child. The child is used
        as a template to render all passed in tracks. */}
        <ParticipantTile />
      </GridLayout>
    );
  }