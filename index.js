require('dotenv').config();
const express = require('express');
const pool = require('./config/database');
const app = express();
const format = require('pg-format');

app.get('/api/search', async (req, res) => {

    const { letter } = req.query;
    let validWords = process(letter)
    try {
        const updatedValidwords = JSON.stringify(validWords).replace("[", "").replace("]", "").replaceAll("\"", "\'")
        let query = format(`Select word from dictionary
        where sorted_word IN (${updatedValidwords})
        Order By length(word) desc`);
        let findedWords = await pool.query(query);
        res.send({ data: findedWords.rows })
    }
    catch (error) {
        throw new Error(error.message)
    }
})

let wordsList = [];
let currentWord = [];
/**
 * Proccess function Create a Tree and travisal tree to find valid posible words
 * @param {*} letter 
 * @returns 
 */
function process(letter) {
    const splitedWord = letter.split("").sort()
    const tree = createTree(splitedWord);

    treeTraversal(tree);
    wordsList = [...new Set(wordsList)];
    const validWordsList = wordsList.filter(word => word.length > 1)
    wordsList = []; // Reset wordlist 
    currentWord = []; // Reset Current Word
    return validWordsList;
}

/**
 * Create a tree based on input letter
 * @param {array} word 
 * @returns a Tree 
 */
function createTree(word) {
    let rightLetters = [];
    let node = {
        title: word[0],
        childrens: []
    }
    for (let i = 1; i < word.length; i++) {
        rightLetters = word.slice(i);
        const result = createTree(rightLetters);
        node.childrens.push(result);
    }
    return node
}

/**
 * 
 * @param {object} data 
 * @returns 
 */
const treeTraversal = (data) => {
    if (data.childrens.length > 0) {
        currentWord.push(data.title)
        for (let i = 0; i < data.childrens.length; i++) {
            treeTraversal(data.childrens[i]);
        }
        const word = currentWord.join("");
        wordsList.push(word);
        currentWord.pop();
    }
    else {
        currentWord.push(data.title);
        const word = currentWord.join("");
        wordsList.push(word);
        currentWord.pop();
        return;
    }
};


app.listen(3000, () => {
    console.log('Listening on port 3000');
})
