function AddTweet(props: any) {
  return (
    <>
      <div className="add-tweet">
        <img src={props.profileimage} alt=""></img>
        <div className="tweet-form">
          <form ref={props.formRef} action="">
            <input
              ref={props.titleRef}
              onChange={props.handleNewTweetNameChange}
              placeholder="Add your tweet name"
            />
            <textarea
              ref={props.descRef}
              name=""
              id=""
              rows={3}
              placeholder="Description"
              onChange={props.handleNewTweetDescriptionChange}
            ></textarea>
            <button
              className="button btn twitter-bg"
              onClick={props.addNewTweet}
            >
              Tweet
            </button>
            <button className="button btn twitter-bg" onClick={props.refresh}>
              Refresh
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTweet;
