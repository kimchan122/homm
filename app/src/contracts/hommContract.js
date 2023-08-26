import Web3 from 'web3';
import contractAbi from './contract-abi.json';

const web3 = new Web3('https://api.avax-test.network/ext/bc/C/rpc');
const contractAddress = '0xEB4E23a8c93c4c3d4340A229d38DD4aDb82bf40d';

const hommContract = new web3.eth.Contract(contractAbi, contractAddress);

export const getUser = async (userAddress) => {
    try {
        const result = await hommContract.methods.getUser(userAddress).call();
        return result;
    } catch (error) {
        console.error('Error calling getUser:', error);
        return null;
    }
};
