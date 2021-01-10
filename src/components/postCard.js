import useSWR from "swr";
import Link from "next/link";
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";

const fetcher = (endpoint) =>
  fetch(
    `https://hacker-news.firebaseio.com/v0/${endpoint}.json?print=pretty`
  ).then((res) => res.json());

export default function PostCard({ data }) {

  if (!data) return <></>;

  return (
    <div>
      <a href={data.url} target="_blank" rel="noopener noreferrer">
        {data ? data.title : id}
      </a>
      <div>
        <span>
          {formatDistanceToNowStrict(fromUnixTime(data.time), {
            addSuffix: true,
          })}
        </span>
        <span> / </span>
        <span>by {data.user}</span>
        <span> / </span>
        <span>
          <Link href={`/${data.id}`}>
            <a>{data.comments_count} comments</a>
          </Link>
        </span>
        <span> / </span>
        {data.url && (
          (
          <span>
              {data.url.match(
                /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[^www][a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/
              )}
            </span>
        )
        )}
      </div>
    </div>
  );
}
