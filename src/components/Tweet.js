import { generateAvatarURL } from "@cfx-kit/wallet-avatar"

export default function Tweet(props){
    return(
        <>
            <div className="tweet">
                <img className="tweet_author_logo" src={generateAvatarURL(props.data.author)}/>
            </div>
        </>
    )
}