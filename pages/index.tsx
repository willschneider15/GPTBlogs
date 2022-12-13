
import type { NextPage } from 'next';
import Link from 'next/link'
import React, { useEffect } from 'react';

const Home: NextPage = () => {
  const [value, setValue] = React.useState<string>('');
  const [prompt, setPrompt] = React.useState<string>('');
  const [completion, setCompletion] = React.useState<string>('');
  const [text, setText] = React.useState<string>('');
  const [loading, setLoading] = React.useState<string>('');
  const [flag, setFlag] = React.useState<boolean>(false);

  useEffect(() => {
    // setCompletion("Pick your favorite text")
  }, [])

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []);

  const handleKeyDown = React.useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setPrompt(value);
        setLoading('Loading...');
        const response = await fetch('/api/title', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: value }),
        });
        const data = await response.json();
        setLoading('');
        setCompletion(data.result.choices[0].text);
        setText(data.result.choices[0].text.split('\n')[0].substring(3))
      
      }
    }, [value]);

    const searchButton = async () => {
      
        setPrompt(value);
        setLoading('Loading...');
        const response = await fetch('/api/title', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: value }),
        });
        const data = await response.json();
        setLoading('');
        setCompletion(data.result.choices[0].text);
        setText(data.result.choices[0].text.split('\n')[0].substring(3))
        
      };
    

  return (
 
      <div className="h-screen flex flex-col m-auto justify-center items-center">
        
        <h1 className='text-3xl pb-10'>Please enter what the article is about: </h1>
        <div className='flex flex-row mb-20'>
          <input className="input input-bordered w-96" value={value} onChange={handleInput} onKeyDown={handleKeyDown} placeholder="What is the article about?"/>
          <button className="ml-5 btn glass h-12 px-6 text-lg text-indigo-100" onClick={searchButton}>Search</button>
        </div>

        <h3 className='pb-5'>{loading}</h3>
        
        <select className="select select-info w-full max-w-xs mb-20" onLoad={(e) => {setText("Pick your favorite title")}} 
          
          onChange={(e) => {
            setText(e.target.value);
            setFlag(true)
          }
          }
          defaultValue={"Pick your favorite title"}>
          <option key={"Pick"} value={"Pick your favorite title"} disabled>Pick your favorite title</option>
          {completion.split('\n').map((item, index) => (item != "") ?
          <option value={item.substring(3)} key={index}>{item}</option> : <option disabled hidden key={index}/>)
          }
    
        </select>
        {flag ? (<Link href={{pathname:'/generate', query:{id:text}}} className="btn glass h-12 px-6 m-2 text-lg text-indigo-100">Generate Outline</Link>) : (<button className="btn glass h-12 px-6 m-2 text-lg text-indigo-100">Waiting For Input</button>)}
       
        <h3  className='pb-20'>NOTE: You must select from dropdown to generate.</h3>
        <h3 className='pb-5'>Team: 🍑 for OpenAI Hackathon</h3>
        <img src='/lablab.jpeg' width={50} height={50}/>
      </div>
  
    
    
  );
};

export default Home;