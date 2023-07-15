import { useEffect } from "react";
import Leftbar from "./partials/leftbar";
import AddTweet from "./partials/addtweet";
import TweetListings from "./partials/TweetsListings";
import Search from "./partials/search";
import Trends from "./partials/trends";

function Twitter(props: any) {
  useEffect(() => {
    if (props.provider) {
      props.fetchAllTweets();
    }
  }, [props.provider]);
  return (
    <>
      <div className="twitter-main">
        <Leftbar
          signout={props.logoutButton}
          account={props.account}
          provider={props.provider}
          setEnableInfo={props.setEnableInfo}
        ></Leftbar>
        <div className="center">
          <AddTweet
            handleNewTweetDescriptionChange={
              props.handleNewTweetDescriptionChange
            }
            handleNewTweetNameChange={props.handleNewTweetNameChange}
            addNewTweet={props.addNewTweet}
            fetchAllTweets={props.fetchAllTweets}
            refresh={props.refresh}
            username={props.username}
            profileimage={props.profileimage}
            titleRef={props.titleRef}
            descRef={props.descRef}
          ></AddTweet>
          <TweetListings
            tweets={props.tweets}
            // length={props.tweets.length}
            upVote={props.upVote}
            handleCommentChange={props.handleCommentChange}
            addComment={props.addComment}
            commentRef={props.commentRef}
            provider={props.provider}
          ></TweetListings>
        </div>
        <div className="rightbar">
          <Search></Search>
          <Trends></Trends>
        </div>
      </div>
    </>
  );
}

export default Twitter;
