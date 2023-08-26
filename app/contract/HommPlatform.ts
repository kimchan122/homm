import Web3 from 'web3';
// import HommPlatformABI from './HommPlatform.json';

const HommPlatformABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            }
        ],
        "name": "confirmTheme",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_articleIndex",
                "type": "uint256"
            }
        ],
        "name": "deleteArticle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_articleIndex",
                "type": "uint256"
            }
        ],
        "name": "likeArticle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_articleIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_commentId",
                "type": "uint256"
            }
        ],
        "name": "likeComment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_content",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_imageUrl",
                "type": "string"
            }
        ],
        "name": "postArticle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_articleIndex",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_content",
                "type": "string"
            }
        ],
        "name": "postComment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_articleIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_commentId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_content",
                "type": "string"
            }
        ],
        "name": "postReplyToComment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "int256",
                "name": "_latitude",
                "type": "int256"
            },
            {
                "internalType": "int256",
                "name": "_longitude",
                "type": "int256"
            }
        ],
        "name": "postTheme",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "signUpUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "articlesCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_articleIndex",
                "type": "uint256"
            }
        ],
        "name": "getArticleByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_articleIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_commentId",
                "type": "uint256"
            }
        ],
        "name": "getComment",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_articleIndex",
                "type": "uint256"
            }
        ],
        "name": "getCommentIdsForArticle",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_articleIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_commentId",
                "type": "uint256"
            }
        ],
        "name": "getCommentLikes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_themeId",
                "type": "uint256"
            }
        ],
        "name": "getThemes",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "themeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "int256",
                        "name": "latitude",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "longitude",
                        "type": "int256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isOfficial",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "createdBy",
                        "type": "address"
                    }
                ],
                "internalType": "struct HommPlatform.Theme",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getUser",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "isThemeSet",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "themes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "themeId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "int256",
                "name": "latitude",
                "type": "int256"
            },
            {
                "internalType": "int256",
                "name": "longitude",
                "type": "int256"
            },
            {
                "internalType": "bool",
                "name": "isOfficial",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "createdBy",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "themesCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "themeToArticles",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "themeId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "articleId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "createdBy",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "imageUrl",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "likes",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "commentsCount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const AVALANCHE_FUJI_RPC_URL = 'https://api.avax-test.network/ext/bc/C/rpc';

export default class HommPlatform {

    private web3: Web3;
    private contract: any;
    private readonly CONTRACT_ADDRESS = '0xEB4E23a8c93c4c3d4340A229d38DD4aDb82bf40d';

    constructor(web3Provider: any) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(AVALANCHE_FUJI_RPC_URL));
        this.contract = new this.web3.eth.Contract(HommPlatformABI as any, this.CONTRACT_ADDRESS);

        const hasGetUserFunction = this.checkABIForFunction("getUser");
        if (!hasGetUserFunction) {
            console.error("ABI does not contain the getUser function. Please check the ABI.");
        } else {
            console.log("passed");
        }
    }

    checkABIForFunction(functionName: string): boolean {
        return HommPlatformABI.some(entry => entry.name === functionName && entry.type === "function");
    }

    async isConnected(): Promise<boolean> {
        try {
            const blockNumber = await this.web3.eth.getBlockNumber();
            console.log("Connected to Avalanche testnet, current block number:", blockNumber);
            return true;
        } catch (error) {
            console.error("Error connecting to Avalanche testnet:", error);
            return false;
        }
    }



    async signUpUser(): Promise<void> {
        const accounts = await this.web3.eth.getAccounts();
        if (!accounts || accounts.length === 0) {
            throw new Error("No accounts available");
        }
        const fromAddress = accounts[0];
        try {
            await this.contract.methods.signUpUser().send({ from: fromAddress });
            console.log("User signed up successfully");
        } catch (error) {
            throw new Error(`Error during signUpUser: ${(error as Error).message}`);
        }
    }

    public async getUser(address: string): Promise<boolean> {
        try {
            const isUser = await this.contract.methods.getUser(address).call();
            return isUser;
        } catch (error) {
            console.error('Error during getUser call:', error);
            throw error;
        }
    }


    async postTheme(name: string, latitude: number, longitude: number): Promise<void> {
        const accounts = await this.web3.eth.getAccounts();
        await this.contract.methods.postTheme(name, latitude, longitude).send({ from: accounts[0] });
    }

    async confirmTheme(themeId: number): Promise<void> {
        const accounts = await this.web3.eth.getAccounts();
        await this.contract.methods.confirmTheme(themeId).send({ from: accounts[0] });
    }

    async getThemes(themeId: number): Promise<any> {
        return this.contract.methods.getThemes(themeId).call();
    }

    async postArticle(themeId: number, content: string, imageUrl: string): Promise<void> {
        const accounts = await this.web3.eth.getAccounts();
        await this.contract.methods.postArticle(themeId, content, imageUrl).send({ from: accounts[0] });
    }

    async likeArticle(themeId: number, articleIndex: number): Promise<void> {
        const accounts = await this.web3.eth.getAccounts();
        await this.contract.methods.likeArticle(themeId, articleIndex).send({ from: accounts[0] });
    }

    async getArticleByIndex(themeId: number, articleIndex: number): Promise<any> {
        return this.contract.methods.getArticleByIndex(themeId, articleIndex).call();
    }

    async deleteArticle(themeId: number, articleIndex: number): Promise<void> {
        const accounts = await this.web3.eth.getAccounts();
        await this.contract.methods.deleteArticle(themeId, articleIndex).send({ from: accounts[0] });
    }

    async postComment(themeId: number, articleIndex: number, content: string): Promise<void> {
        const accounts = await this.web3.eth.getAccounts();
        await this.contract.methods.postComment(themeId, articleIndex, content).send({ from: accounts[0] });
    }

    async getCommentIdsForArticle(themeId: number, articleIndex: number): Promise<number[]> {
        return this.contract.methods.getCommentIdsForArticle(themeId, articleIndex).call();
    }

    async getComment(themeId: number, articleIndex: number, commentId: number): Promise<any> {
        return this.contract.methods.getComment(themeId, articleIndex, commentId).call();
    }

    async likeComment(themeId: number, articleIndex: number, commentId: number): Promise<void> {
        const accounts = await this.web3.eth.getAccounts();
        await this.contract.methods.likeComment(themeId, articleIndex, commentId).send({ from: accounts[0] });
    }

    async postReplyToComment(themeId: number, articleIndex: number, commentId: number, content: string): Promise<void> {
        const accounts = await this.web3.eth.getAccounts();
        await this.contract.methods.postReplyToComment(themeId, articleIndex, commentId, content).send({ from: accounts[0] });
    }
}