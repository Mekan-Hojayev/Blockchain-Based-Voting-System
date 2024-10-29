import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Voting from './contracts/Voting.json';

function VotingApp() {
  const [candidates, setCandidates] = useState([]);
  const [votingContract, setVotingContract] = useState(null);
 
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const network = await provider.getNetwork();
        const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
        const contract = new ethers.Contract(contractAddress, Voting.abi, signer);
        setVotingContract(contract);
      
        const candidates = await Promise.all([
          contract.candidates(0),
          contract.candidates(1),
          contract.candidates(2)
        ]);

        setCandidates(candidates);
      }
    };
    init();
  }, []);

  const voteCandidate = async (index) => {
    if (votingContract) {
      await votingContract.vote(index);
      alert("Vote castedsuccessfully!"); } };
      return (
        <div>
          <h1>Vote for the Best Football Player</h1>
          <ul>
            {candidates.map((candidate, index) => (
              <li key={index}>
                {candidate.name} - {candidate.voteCount.toString()} votes 
                <button onClick={() => voteCandidate(index)}>Vote</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
   
    export default VotingApp;   
