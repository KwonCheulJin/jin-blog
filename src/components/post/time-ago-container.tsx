import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';
timeago.register('ko', ko);

type Props = {
  datetime: string;
};
export default function TimeAgoContainer({ datetime }: Props) {
  return <TimeAgo datetime={datetime} locale="ko" />;
}
