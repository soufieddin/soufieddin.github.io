/**
 * quizapi
 */
//import path
import { api_path, token } from './consts.js';

/**
 * create url
 */
const createQuizApiUrl = (options = {}) => {
    const url = new URL (`${api_path}${token}`);
    for (const key in options) url.searchParams.append(key, options[key]);
    return url;
}
/**
 * fetch questions
 */
const fetchQuestions =async (options = {}) => {
    const data =await fetch(createQuizApiUrl(options));
    const json =await data.json();
    return json;
};


/**
 * get questions
 */

export const getQuestions = (limit = 10, category = 'Linux', difficulty = 'easy') => fetchQuestions({"limit" : limit, "category" : category, "difficulty" : difficulty});
