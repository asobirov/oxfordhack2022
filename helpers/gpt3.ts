import {Configuration, OpenAIApi} from 'openai';
import * as dotenv from 'dotenv';

dotenv.config({path: '../.env'});

export const gpt3 = async function(prompt:string) {
  const  secretKey = process.env.OPENAI_SECRET_KEY;

  const configuration = new Configuration({
    apiKey: secretKey,
  });

  const openai = new OpenAIApi(configuration);

  try{
    const gptResponse = await openai.createCompletion("text-davinci-001", {
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 64,
      presence_penalty:1,
      stop: ".",
      echo: true
    });
    const reply = gptResponse.data.choices?.at(0)?.text;
    return reply;
  }
  catch(error){
    console.log(error);
  }

}

// async function test() {
//   let givenObject = "cans";
//   let inputString = "Benefits of recycling " + givenObject;
//   const answerCheck = await gpt3(inputString);
//   console.log(answerCheck);
// }



// test();