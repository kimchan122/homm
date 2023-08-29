# homm

## Summary
I started this project from the experience of traveling around hard to rent a house in a foreign country two months ago.

Through a community-oriented service that shares honest information about the house, I wanted to solve the problem of current similar services that have a lack of information due to one-way information. So I wanted to try it with this project.

## What i built
- A community-based housing information service
- A community where users leave honest thoughts about their home

## How it works
- Users add places, and other users check places
- Articles about places can be registered
- Users can interact with comments, etc

## Technology used
- Project using ReactJS and Remix
- Deployed smart contract on Avalanche Fuji Testnet.
- ENS is used to determine user rights.

## Bounty track
### Avalanche: C-Chain Application
I deployed a smart contract named 'HommContract' on the Avalanche C-Chain Testnet (Fuji testnet).
The address of the deployed smart contract and the link to Snowtrace are below.
I created smart contract functions to post Themes, Articles, and Comments, and to interact with the posts.
These functions are used in HOMM to allow users to post, share, and respond to articles about their homes.

Contract address: 0x321Db8529eC581018d3B8bD690362f970520Ff87
SNOWTRACE link: https://testnet.snowtrace.io/address/0x321Db8529eC581018d3B8bD690362f970520Ff87

### ENS: Best Projects Using ENS as Usernames & Most Interesting Use of ENS
I used ENS as something like a login service in a component called 'ConnectButton'.
When a user connects through any provider, the service obtains the ENS name and avatar through resolving.
If there is no ENS name, the general address is abbreviated.
I made a difference in authority between general users and users connected to ENS in the dapp and frontend.
Users connected to ENS can use additional privileges for map editing.

## How to start
First of all, did you download this project ok, or connected to VCS? Anything is fine.
If so, you need to run the command below on the command line in the directory where the package.json file is located.
```
yarn install
```
When it does, you will probably see several packages installed.
Then, run the command below on the command line.
```
yarn start
```
After a while, a default browser window set on your PC will open. If you see Google Maps and a little UI, that's a success.

## Etc
I learned about [ ENS thorin ](https://thorin.ens.domains/) this time and tried it anew.
