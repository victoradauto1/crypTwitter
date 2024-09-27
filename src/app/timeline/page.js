"use client";
import NewTweet from "@/components/NewTweet";
import Tweet from "@/components/Tweet";
import { useEffect, useState} from "react";
import { getLastTweets } from "@/services/web3Services";

export default function TimeLine() {
  useEffect(() => {
    document.title = "CrypTwitter | TimeLine";
  }, []);

  const [tweets, setTweets] = useState([])

  async function loadTweets(page = 1){
    try {
      const results = await getLastTweets(page);
      setTweets(results)

    } catch (error) {
      console.error(error);
      alert(error.message)
    }
  }

  useEffect(()=>{
    loadTweets(1)
  },[])
  return (
    <>
      <div className="container">
        <div className="row">
            <div className="layout">
                <NewTweet/>
                {
                  tweets && tweets.length?
                  tweets.map(t => <Tweet key={Number(t.timestamp)} data={t} />)
                  :
                  <p> Não há publicações ainda.</p>
                }
                <div className="">
                  <input type="button" className="btn btn-primary" value="Mais Tweets"/>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
