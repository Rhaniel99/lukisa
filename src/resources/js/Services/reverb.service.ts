import Echo from 'laravel-echo';
import echo from '@/echo';

export function getEcho(): Echo<any> {
  return echo;
}