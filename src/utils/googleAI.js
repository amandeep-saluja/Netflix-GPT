import { GoogleGenerativeAI } from '@google/generative-ai';
import { GOOGLE_AI_API_KEY } from './constants';

const genAI = new GoogleGenerativeAI(GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default model;
