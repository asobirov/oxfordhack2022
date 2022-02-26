import { Configuration, OpenAIApi } from 'openai';

export const gpt = async (prompt: string) => {
    const conf = new Configuration({
        apiKey: process.env.OPENAI_SECRET_KEY,
    });

    const openai = new OpenAIApi(conf);

    try {
        const res = await openai.createCompletion('text-davinci-001', {
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 64,
            presence_penalty: 1,
            stop: '.',
            echo: true,
        });
        const reply = res.data.choices?.at(0)?.text;
        return reply;
    } catch (error) {
        console.log(error);
    }
}