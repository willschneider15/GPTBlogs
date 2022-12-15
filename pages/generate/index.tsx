import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'

const Outline: NextPage = () => {
  const [value, setValue] = React.useState<string>('');
  const [prompt, setPrompt] = React.useState<string>('');
  const [completion, setCompletion] = React.useState<Object>();
  const [completionGenerate, setCompletionGenerate] = React.useState<Object>();
  const [text, setText] = React.useState<string>('');
  const router = useRouter();
  const data = router.query;
  const title = data.id;
  let savedText: string;


  interface PostData {
    title: string;
    subtitle: string;
    body: string;
    image: string;
  }
 
  useEffect(() => {
      const createOutline = async () => {
          const body = document.getElementById("body");
          console.log("body "+body)
          console.log("title " +title)
          if(title != "" && body!=null){
              
              const response = await fetch('/api/outline', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: title }),
              });
              const data = await response.json();
              setCompletion(data.result.choices[0].text);
              body.innerHTML=data.result.choices[0].text;
          }
        }

        createOutline().catch(console.error)
  }, [])
  
  //NOTE: This function is still in testing and is used to update the CMS
  function buttonSubmit() {
    const blog = document.getElementById("blog");
    if(blog != null){
      fetch("/api/createBlog", {
        method: "POST",
        body: JSON.stringify({title: title, body: blog.innerHTML}),
      })   
      .catch((err) => {
        console.log(err);
     
      });
    }
   
  };

  

  const generateButton = async () => {
    const blog = document.getElementById("blog");

    if(window.getSelection()!.toString() != null && blog != null){
      
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: window.getSelection()!.toString()}),
      });
      const data = await response.json();
  
      setCompletionGenerate(data.result.choices[0].text);
      setText(data.result.choices[0].text.split('\n')[0].substring(3))
      blog.innerHTML+=data.result.choices[0].text;
    }
  };
  


  return (
    <div className='flex flex-row'>
      <div className="basis-1/2 h-screen flex flex-col m-auto justify-center items-center" >
        <h1 className='text-3xl pb-10'>Please edit your outline to your linking: </h1>
        <textarea id="body" className="textarea textarea-info w-9/12 h-4/6 mb-10" ></textarea>
        <button className="btn glass h-12 px-6 m-2 text-lg text-indigo-100" onClick={generateButton}>Generate Highlighted Section</button>

          <h3>NOTE: Include stats and numbers to further improve the final output.</h3>
      </div>
      <div className="basis-1/2 h-screen flex flex-col m-auto justify-center items-center" >
        <h1 className='text-3xl pb-10'>Generated article: </h1>
        <textarea id="blog" className="textarea textarea-info w-9/12 h-4/6 mb-10" ></textarea>
        <button className="btn glass h-12 px-6 m-2 text-lg text-indigo-100" onClick={buttonSubmit}>Publish</button>

          <h3>NOTE: Publishes to Google Doc where you can share and do further editing.</h3>
      </div>
    </div>
  );
};

export default Outline;