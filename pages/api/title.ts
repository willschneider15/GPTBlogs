import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: "Come up with six SEO optimized blog titles for "+req.body.text+" make sure to use emotionally triggered headlines and at least one powerful word. Do not use quotes around each title.",
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 256,
  });
  res.status(200).json({ result: completion.data });
}