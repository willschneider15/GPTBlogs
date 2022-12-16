# GPTBlogs
Built for the OpenAI Hackathon

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#Aim
The aim is to create toolings that assist people get their blogs done with the help of GPT3(Generative Pre-trained Transformer 3).

#Basic Walkthrough
At First, you will need to type the input of-  
what the article is about.
Then you can select the "Title" that catch your attention.
After which, you can select from dropdown to generate the outline.
Finally, you will have your article generated.

## Getting Started

First, install the dependencies.
```bash
yarn install
```

Then update the file name from .env.local.template to .env.local. Make sure to also add you API key.
```bash
OPENAI_API_KEY= <your-openai-api-key>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-sanity-id>
SANITY_API_TOKEN=<your-sanity-api-token>
```

Then you can run the development locally.
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
