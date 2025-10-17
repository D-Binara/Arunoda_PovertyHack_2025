"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AudioPlayerProps {
  audioUrl?: string;
  text?: string;
  autoSpeak?: boolean;
}

export function AudioPlayer({ audioUrl, text, autoSpeak = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player">
      <Button
        onClick={togglePlay}
        size="lg"
        variant="default"
        className="rounded-full w-12 h-12 p-0"
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
      </Button>

      <div className="flex-1 space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Volume2 className="h-3 w-3" />
          <span>{audioUrl ? 'Audio Available' : 'Text-to-Speech'}</span>
        </div>
      </div>

      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
    </div>
  );
}
