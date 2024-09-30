import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADRESS = "0x33a6a3fA58aa75c934bC5bcad10f92731CcC9608";

export async function doLogin() {
  if (!window.ethereum) throw new Error("No MetaMask found.");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length)
    throw new Error("Wallet not found or not allowed.");

  localStorage.setItem("wallet", accounts[0]);

  return accounts[0];
}

function getContract() {
  if (!window.ethereum) throw new Error("No MetaMask found.");

  const web3 = new Web3(window.ethereum);
  const from = localStorage.getItem("wallet");

  return new web3.eth.Contract(ABI, CONTRACT_ADRESS, { from });
}

export function addTweet(text) {
  const contract = getContract();

  return contract.methods.addTweet(text).send();
}

export function changeUserName(newName) {
  const contract = getContract();

  return contract.methods.changeUsername(newName).send();
}

export async function getLastTweets(page) {
  const contract = getContract();
  const tweets = await contract.methods.getLastTweets(page).call();

  const filteredTweets = tweets
    .map((t) => ({ ...t }))
    .filter((t) => t.text !== "");
  return filteredTweets;
}
