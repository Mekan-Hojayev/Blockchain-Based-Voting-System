// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool voted;
        uint8 vote; // Index of the voted candidate
    }

    address public owner;
    Candidate[] public candidates;
    mapping(address => Voter) public voters;

    constructor(string[] memory candidateNames) {
        owner = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
    }

    function vote(uint8 _candidateIndex) public {
        require(!voters[msg.sender].voted, "Already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        voters[msg.sender].voted = true;
        voters[msg.sender].vote = _candidateIndex;
        candidates[_candidateIndex].voteCount += 1;
    }

    function winningCandidate() public view returns (string memory winnerName) {
        uint256 maxVotes = 0;
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerName = candidates[i].name;
            }
        }
    }
}
