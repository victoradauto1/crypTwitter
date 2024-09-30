import { generateAvatarURL } from "@cfx-kit/wallet-avatar";

export default function Tweet(props) {
  return (
    <>
      <div className="tweet">
        <img
          className="tweet_author_logo"
          src={generateAvatarURL(props.data.author)}
        />
        <div className="d-flex flex-column gap-2">
          <div className="tweet_header">
            <div className="tweet_author_name">
              {props.data.username ? props.data.username : "Wallet"}
            </div>
            <div className="tweet_author_slug">@{props.data.author}</div>
            <div className="tweet_publish_time">
              at{" "}
              {new Date(Number(props.data.timestamp) * 1000).toLocaleString()}
            </div>
          </div>
          <div>{props.data.text}</div>
        </div>
      </div>
    </>
  );
}
