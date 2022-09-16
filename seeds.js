const pool = require('./database');
const format = require('pg-format');
/**
 * Read words_dictionary.json file and store into database (word and Stored_word)
 */
async function seeds() {
    try {
        // Read Words
        const staticWords = require('./words_dictionary.json');
        const words = Object.keys(staticWords) // Select Words
        // Store Words one by on into database
        for (let word of words) {
            try {
                console.log(word);
                // sort letters of each word
                const sortedWord = word.split('').sort().join('');
                const query = format(`INSERT INTO public.dictionary
                (word, sorted_word)
                VALUES ('${word}', '${sortedWord}');`);

                await pool.query(query);
            }
            catch (error) {
                console.log(error.message)
            }
        }
        res.send('Request done successfully')
    } catch (error) {
        console.log(error);
    }
}

seeds();