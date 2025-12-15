import { useEffect } from 'react';
import { getEcho } from '@/Services/reverb.service';

export function useReverb(
  channel: string,
  event: string,
  callback: (data: any) => void
) {
  useEffect(() => {
    const echo = getEcho();

    echo.private(channel).listen(event, callback);

    return () => {
      echo.leave(`private-${channel}`);
    };
  }, [channel, event, callback]);
}