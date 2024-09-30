"use client";
import NewTweet from "@/components/NewTweet";
import Tweet from "@/components/Tweet";
import { useEffect, useState } from "react";
import { getLastTweets } from "@/services/web3Services";

export default function TimeLine() {
  useEffect(() => {
    document.title = "CrypTwitter | TimeLine";
  }, []);

  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);

  async function loadTweets(page = 1) {
    try {
      const results = await getLastTweets(page);
      if (page > 1) {
        tweets.push(...results);
        setTweets(results);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  useEffect(() => {
    loadTweets(page);
  }, [page]);

  function btnLoadMoreClick() {
    setPage(page + 1);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="layout">
            <NewTweet />
            {tweets && tweets.length ? (
              tweets
                .slice()
                .reverse()
                .map((t) => <Tweet key={Number(t.timestamp)} data={t} />)
            ) : (
              <p> Não há publicações ainda.</p>
            )}
            {tweets.length > 0 && tweets.length % 10 === 0 ? (
              <input
                type="button"
                className="btn btn-primary"
                value="Mais Tweets"
                onClick={btnLoadMoreClick}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
