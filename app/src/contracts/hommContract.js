import Web3 from 'web3';
import contractAbi from './contract-abi.json';

const web3 = new Web3('https://api.avax-test.network/ext/bc/C/rpc');
const contractAddress = '0x4BFd358BC1edAc58714e52a930858EF748f9B68C';

const hommContract = new web3.eth.Contract(contractAbi, contractAddress);

// Confirm a theme
export const confirmTheme = async (themeId) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const result = await hommContract.methods.confirmTheme(themeId).send({ from: sender });
        return result;
    } catch (error) {
        console.error('Error calling confirmTheme:', error);
        return null;
    }
};

// Delete an article
export const deleteArticle = async (themeId, articleIndex) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const result = await hommContract.methods.deleteArticle(themeId, articleIndex).send({ from: sender });
        return result;
    } catch (error) {
        console.error('Error calling deleteArticle:', error);
        return null;
    }
};

// Like an article
export const likeArticle = async (themeId, articleIndex) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const result = await hommContract.methods.likeArticle(themeId, articleIndex).send({ from: sender });
        return result;
    } catch (error) {
        console.error('Error calling likeArticle:', error);
        return null;
    }
};

// Like a comment
export const likeComment = async (themeId, articleIndex, commentId) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const result = await hommContract.methods.likeComment(themeId, articleIndex, commentId).send({ from: sender });
        return result;
    } catch (error) {
        console.error('Error calling likeComment:', error);
        return null;
    }
};

// Post an article
export const postArticle = async (themeId, content, imageUrl) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const result = await hommContract.methods.postArticle(themeId, content, imageUrl).send({ from: sender });
        return result;
    } catch (error) {
        console.error('Error calling postArticle:', error);
        return null;
    }
};

// Post a comment
export const postComment = async (themeId, articleIndex, content) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const result = await hommContract.methods.postComment(themeId, articleIndex, content).send({ from: sender });
        return result;
    } catch (error) {
        console.error('Error calling postComment:', error);
        return null;
    }
};

// Post a reply to a comment
export const postReplyToComment = async (themeId, articleIndex, commentId, content) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const result = await hommContract.methods.postReplyToComment(themeId, articleIndex, commentId, content).send({ from: sender });
        return result;
    } catch (error) {
        console.error('Error calling postReplyToComment:', error);
        return null;
    }
};

// Post a theme
export const postTheme = async (name, latitude, longitude) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const result = await hommContract.methods.postTheme(name, latitude, longitude).send({ from: sender });
        return result;
    } catch (error) {
        console.error('Error calling postTheme:', error);
        return null;
    }
};

// Sign up a user
export const signUpUser = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const result = await hommContract.methods.signUpUser().send({ from: sender });
        return result;
    } catch (error) {
        console.error('Error calling signUpUser:', error);
        return null;
    }
};

export async function callSignUpUser() {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await hommContract.methods.callSignUpUser().send({ from: accounts[0] });
        return result;
    } catch (error) {
        console.error('Error calling callSignUpUser:', error);
        return false;
    }
}

// Get the count of articles
export const getArticlesCount = async () => {
    try {
        const result = await hommContract.methods.articlesCount().call();
        return result;
    } catch (error) {
        console.error('Error calling getArticlesCount:', error);
        return null;
    }
};

// Get an article by index
export const getArticleByIndex = async (themeId, articleIndex) => {
    try {
        const result = await hommContract.methods.getArticleByIndex(themeId, articleIndex).call();
        return result;
    } catch (error) {
        console.error('Error calling getArticleByIndex:', error);
        return null;
    }
};

// Get a comment by commentId
export const getComment = async (themeId, articleIndex, commentId) => {
    try {
        const result = await hommContract.methods.getComment(themeId, articleIndex, commentId).call();
        return result;
    } catch (error) {
        console.error('Error calling getComment:', error);
        return null;
    }
};

// Get comment IDs for an article
export const getCommentIdsForArticle = async (themeId, articleIndex) => {
    try {
        const result = await hommContract.methods.getCommentIdsForArticle(themeId, articleIndex).call();
        return result;
    } catch (error) {
        console.error('Error calling getCommentIdsForArticle:', error);
        return null;
    }
};

// Get likes for a comment
export const getCommentLikes = async (themeId, articleIndex, commentId) => {
    try {
        const result = await hommContract.methods.getCommentLikes(themeId, articleIndex, commentId).call();
        return result;
    } catch (error) {
        console.error('Error calling getCommentLikes:', error);
        return null;
    }
};

// Get themes
export const getThemes = async (themeId) => {
    try {
        const result = await hommContract.methods.getThemes(themeId).call();
        return result;
    } catch (error) {
        console.error('Error calling getThemes:', error);
        return null;
    }
};

// Get user information
export const getUser = async (userAddress) => {
    try {
        const result = await hommContract.methods.getUser(userAddress).call();
        return result;
    } catch (error) {
        console.error('Error calling getUser:', error);
        return null;
    }
};

// Check if a theme is set
export const isThemeSet = async (themeId) => {
    try {
        const result = await hommContract.methods.isThemeSet(themeId).call();
        return result;
    } catch (error) {
        console.error('Error calling isThemeSet:', error);
        return null;
    }
};

// Get themes count
export const getThemesCount = async () => {
    try {
        const result = await hommContract.methods.themesCount().call();
        return result;
    } catch (error) {
        console.error('Error calling getThemesCount:', error);
        return null;
    }
};

// Get theme-to-articles mapping
export const getThemeToArticles = async (themeId, articleIndex) => {
    try {
        const result = await hommContract.methods.themeToArticles(themeId, articleIndex).call();
        return result;
    } catch (error) {
        console.error('Error calling getThemeToArticles:', error);
        return null;
    }
};