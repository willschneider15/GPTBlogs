import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link'

const Home: NextPage = () => {
  const [value, setValue] = React.useState<string>('');
  const [prompt, setPrompt] = React.useState<string>('');
  const [completion, setCompletion] = React.useState<string>('');
  const [text, setText] = React.useState<string>('');

  const createOutline = async () => {
    console.log(text);
  }

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []);

  const handleKeyDown = React.useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setPrompt(value);
        setCompletion('Loading...');
        const response = await fetch('/api/title', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: value }),
        });
        const data = await response.json();
        setValue('');
        setCompletion(data.result.choices[0].text);
        setText(data.result.choices[0].text.split('\n')[0].substring(3))
      }
    }, [value]);

  return (
    <div className="h-screen flex flex-col m-auto justify-center items-center">
      <h1 className='text-3xl pb-10'>Please enter what the article is about: </h1>
      <input className="input input-bordered w-full max-w-xs mb-20" value={value} onChange={handleInput} onKeyDown={handleKeyDown} placeholder="What is the article about?"/>
      
      <select className="select w-full max-w-xs" defaultValue={text} value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}>
        <option disabled selected>Pick your favorite title</option>
        {completion.split('\n').map(item => (item != "") ?
        <option value={item.substring(3)}>{item}</option> :
        <br/>)
        }
  
      </select>
      <Link href={{pathname:'/outline', query:{id:text}}} className="btn glass h-12 px-6 m-2 text-lg text-indigo-100">Submit</Link>

      <h3>NOTE: You must click the dropdown there is no default.</h3>
    
    </div>
  );
};

export default Home;