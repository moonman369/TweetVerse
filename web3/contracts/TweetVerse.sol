// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract TwitterDapp is ERC721("TwitterVerse", "TVRS") {

    uint256 tokenId;

    struct tweet{
        uint256 tid;
        uint256 upvotes;
        string name;
        string description;
        string metadata;
        uint256 [] comments;
        address fromAddress;
    }

    tweet[] public tweets;

    function tokenURI(uint256 _tokenId)
    public
    view 
    override 
    returns (string memory)
    {
        bytes memory dataURI = abi.encodePacked( 
            '{',
            '"name":', '"', tweets[_tokenId].name, '",', 
            '"description":' , '"', tweets[_tokenId].description, '"', ',' ,  
            '"attributes":', '[', '{', '"trait_type":', '"Upvotes",' , '"value":', Strings.toString(tweets[_tokenId].upvotes), '}', ']' , '}' 
        );

        return string( 
            abi.encodePacked("data:application/json;base64,", Base64.encode(dataURI)));
    }


}