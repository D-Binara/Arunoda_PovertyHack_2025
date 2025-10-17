"use client";

import { useState, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AudioRecorder as Recorder } from '@/lib/audio';
import { toast } from 'sonner';

interface AudioRecorderProps {
  maxDuration?: number; // in seconds
  onRecordingComplete: (blob: Blob) => void;
}

export function AudioRecorder({ maxDuration = 30, onRecordingComplete }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const recorderRef = useRef<Recorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const recorder = new Recorder();
      await recorder.start();
      recorderRef.current = recorder;
      setIsRecording(true);
      setDuration(0);

      // Track duration
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          const next = prev + 1;
          if (next >= maxDuration) {
            stopRecording();
          }
          return next;
        });
      }, 1000);
    } catch (error) {
      toast.error('Could not access microphone. Please check permissions.');
      console.error(error);
    }
  };

  const stopRecording = async () => {
    if (!recorderRef.current) return;

    try {
      const blob = await recorderRef.current.stop();
      onRecordingComplete(blob);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      setIsRecording(false);
      setDuration(0);
      recorderRef.current = null;
    } catch (error) {
      toast.error('Recording failed');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        variant={isRecording ? 'destructive' : 'default'}
        size="lg"
        className="rounded-full"
      >
        {isRecording ? (
          <>
            <Square className="h-5 w-5 mr-2" />
            Stop ({maxDuration - duration}s)
          </>
        ) : (
          <>
            <Mic className="h-5 w-5 mr-2" />
            Record Audio
          </>
        )}
      </Button>

      {isRecording && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Recording...</span>
        </div>
      )}
    </div>
  );
}
