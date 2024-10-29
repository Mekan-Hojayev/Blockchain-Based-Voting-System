async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(["Lionel Messi", "Cristiano Ronaldo", "Neymar Jr"]);
  
    console.log("Voting contract deployed to:", voting.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  