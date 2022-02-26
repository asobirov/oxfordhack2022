import {gpt3} from './gpt3';

// function for selecting one of the random prompts provided
function randomPromptSelector(prompts:Array<string>){
  const max = prompts.length;
  const randomNo = Math.floor(Math.random() * (max));
  return prompts[randomNo];
}

// function that'll use GPT3 function to generate a random fact about the object provided as input.
export const generateFact = async function (objectName:string) {
  const promptStrings = [`Recycling empty ${objectName} helps to `,  `The harmful effect of empty ${objectName} on the environment is `,  `Empty ${objectName} pollute the nature by `];
  const selectPrompt = randomPromptSelector(promptStrings);
  console.log("The prompt is - " + selectPrompt);
  const fact = await gpt3(selectPrompt);
  return fact;
};

// async function test(){
//   const objectName = "wrappers";
//   const fact = await generateFact(objectName);
//   console.log(fact);
// }

// test();