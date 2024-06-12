import { formatDistanceToNow } from 'date-fns';

export function timeAgo(timestamp: string): string {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}
