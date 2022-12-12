import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'

const Outline: NextPage = () => {
  const [value, setValue] = React.useState<string>('');
  const [prompt, setPrompt] = React.useState<string>('');
  const [completion, setCompletion] = React.useState<Object>();
  const [text, setText] = React.useState<string>('');
  const router = useRouter();
  const data = router.query;
  const title = data.id;

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

  function buttonSubmit() {

    fetch("/api/createBlog", {
      method: "POST",
      body: JSON.stringify({title: title, body: completion}),
    })   
    .catch((err) => {
      console.log(err);
   
    });
  };
  

//   const handleInput = React.useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setValue(e.target.value);
//     }, []);

//   const handleKeyDown = React.useCallback(
//     async (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === 'Enter') {
//         setPrompt(value);
//         setCompletion('Loading...');
//         const response = await fetch('/api/title', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ text: value }),
//         });
//         const data = await response.json();
//         setValue('');
//         setCompletion(data.result.choices[0].text);
//         setText(data.result.choices[0].text.split('\n')[0].substring(3))
//       }
//     }, [value]);

  return (
    <div className="h-screen flex flex-col m-auto justify-center items-center" >
      <h1 className='text-3xl pb-10'>Please edit your outline to your linking: </h1>
      <textarea id="body" className="textarea textarea-info w-9/12 h-4/6 mb-10" ></textarea>
      <button className="btn glass h-12 px-6 m-2 text-lg text-indigo-100" onClick={buttonSubmit}>Submit</button>

   
        <h3>NOTE: Include stats and numbers to further improve the final output.</h3>
    </div>
  );
};

export default Outline;