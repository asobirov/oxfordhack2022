import { gpt } from '@lib/openai';

export const getItemFact = async (product: string) => {
  const prompts = [
    `Recycling empty ${product} helps to `,
    `The harmful effect of empty ${product} on the environment is `,
    `Empty ${product} pollute the nature by `
  ];

  return await gpt(prompts[Math.floor(Math.random() * prompts.length)])
}
