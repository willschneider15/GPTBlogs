# GPTBlogs



https://user-images.githubusercontent.com/44822021/208080500-4612b53e-5969-4695-9b0f-03d256909b7f.mp4



## Introduction

This open-source project was built to give bloggers flexible tooling for their content creation. It only takes 5-10 minutes to set up and is cheaper than using services that mark up the price of OpenAI. The tool is streamlined to create higher-quality content by guiding the user thru a series of prompts.

Here is how it works:
- First enter what you want the blog to be about.
- Second select one of the six optimized blog title options.
- Third edit the generated outline.
- Fourth highlight then generate blog content from the outline.
- Lastly publish your content directly to the CMS.

This process forces the user to work with the AI to improve the quality of the content. This same process can be found within other more expensive options on the market.

## Tech Stack:
- [Next.js](https://nextjs.org/): v13.0.6 (framework)
- Node: v19.2.0
- Typescript: v4.9.4 (language)
- [Sanity](https://www.sanity.io/): v3.0.6 (cms)
- [OpenAI](https://openai.com/api/): v3.1.0 (gpt api)
- [DaisyUI](https://daisyui.com/): v2.43.0 (component library)
- [Tailwind](https://tailwindcss.com/): v4.0.0 (css library)

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

Open [http://localhost:3000](http://localhost:3000) with your browser and you should see:
![My Image](/public/homeScreen.png)

## Pages
You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
- index.tsx (home page for user to select title)
- generate.tsx (where user works to generate blog using outline)

## API
[Routes](https://nextjs.org/docs/api-routes/introduction) can be created, read, updated, and destroyed.
- blog.ts (generates blog content from outline)
- createBlog.ts (publishes blog content to the cms)
- outline.ts (generates the blog outline based on your title)
- title.ts (generates the blog title)

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
