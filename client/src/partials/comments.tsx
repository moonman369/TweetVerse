import React from "react";

function Comments(props: any) {
  return (
    <>
      <div className="add-tweet reply-tweet">
        <span>
          Reply to{" "}
          <a
            href={`https://mumbai.polygonscan.com/address/${props.tweet.author}`}
            target="_blank"
          >
            {" "}
            @{props.tweet.author.replace(/(.{9})..+/, "$1...")}
          </a>
        </span>
        <div className="tweet-form">
          <form action="">
            <textarea
              ref={props.commentRef}
              name=""
              id=""
              rows={2}
              placeholder="Add your tweet"
              onChange={props.handleCommentChange}
            ></textarea>
            <button
              className="btn twitter-bg"
              onClick={(event) =>
                props.addComment(event, props.length - 1 - props.count)
              }
              // (event) => props.addComment(event, props.count)
            >
              Tweet
            </button>
          </form>
        </div>
      </div>

      {props.tweet.comments.map((comment: any, j: any) => (
        <div className="tweet-list thread" key={j}>
          <img src="images/user.png" alt=""></img>
          <div className="tweet-content">
            <h5>
              <a
                href={`https://mumbai.polygonscan.com/address/${comment.author}`}
                target="_blank"
              >
                @{comment.author.replace(/(.{9})..+/, "$1...")}
              </a>
            </h5>
            <span>
              Replying to{" "}
              <a
                href={`https://mumbai.polygonscan.com/address/${props.tweet.author}`}
                target="_blank"
              >
                {" "}
                @{props.tweet.author.replace(/(.{9})..+/, "$1...")}
              </a>
            </span>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Comments;
