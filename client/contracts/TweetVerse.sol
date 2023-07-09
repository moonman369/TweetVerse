// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract TweetVerse is ERC721("TwitterVerse", "TVRS") {

    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter s_tweetId;
    Counters.Counter s_commentId;
    string public i_baseUri;

    struct Comment {
        uint256 id;
        uint256 tweetId;
        address author;
        string content;
        // string metadataUri;
    }

    struct Tweet {
        uint256 id;
        uint256 upvotes;
        address author;
        // string metadataUri;
        string name;
        string description;
        uint256 [] comments;
    }

    Tweet[] private s_tweets;
    mapping (uint256 => Comment) private s_comments;
    mapping (uint256 => mapping (address => bool)) private s_upvotesMapping;

    constructor (string memory _baseUri) {
        i_baseUri = _baseUri;
    }


    function tokenURI(uint256 _tokenId)
    public
    view 
    override 
    returns (string memory)
    {
        return string(abi.encodePacked(i_baseUri, _tokenId));
    }


    function postTweet(string memory _name, string memory _description) public {
        _safeMint(msg.sender, s_tweetId.current());
        s_tweets.push(
            Tweet({
                id: s_tweetId.current(),
                upvotes: 0,
                comments: new uint256[] (0),
                author: msg.sender,
                name: _name,
                description: _description
            })
        );
        
        s_tweetId.increment();
    }


    function postComment(uint256 _tweetId, string memory _content) public {
        require(_tweetId >= 0 && _tweetId <= s_tweetId.current(), "TweetVerse: Tweet with the given id doesn't exist.");

        s_tweets[_tweetId].comments.push(s_commentId.current());

        s_comments[s_commentId.current()] = 
        Comment ({
            id: s_commentId.current(),
            tweetId: _tweetId,
            author: msg.sender,
            content: _content
        });

        s_commentId.increment();
        
    }


    function upvote(uint256 _tweetId) public {
        require(_tweetId >= 0 && _tweetId <= s_tweetId.current(), "TweetVerse: Tweet with the given id doesn't exist.");    
        require (!s_upvotesMapping[_tweetId][msg.sender], "TweetVerse: User has already upvoted this tweet.");
        s_tweets[_tweetId].upvotes += 1;
        s_upvotesMapping[_tweetId][msg.sender] = true;
    }


    function getTweetById(uint256 _tweetId) public view returns (Tweet memory) {
        return s_tweets[_tweetId];
    }
 
    function checkIfUserVoted(uint256 _tweetId, address _user) public view returns (bool) {
        require(_tweetId >= 0 && _tweetId <= s_tweetId.current(), "TweetVerse: Tweet with the given id doesn't exist.");
        require(_user != address(0), "TweetVerse: Null address.");
        return s_upvotesMapping[_tweetId][_user];        
    }

    function getCommenstByTweetId(uint256 _tweetId) public view returns (Comment [] memory) {
        Tweet memory tweet = s_tweets[_tweetId];
        Comment [] memory tweetComments = new Comment[] (tweet.comments.length);

        for (uint256 i = 0; i < tweet.comments.length; i++) {
            tweetComments[i] = s_comments[tweet.comments[i]];
        }

        return tweetComments;
    }


    function getAllTweets() public view returns(Tweet[] memory) {
        return s_tweets;
    }


}