"use client"
import axios from 'axios';
import { Slider } from "@/components/ui/slider"
import { useState, useEffect } from 'react';

export default function Home() {
  const [sliderValue, setSliderValue] = useState<number[]>([0]);
  const [text, setText] = useState<string>("Introduction to Dinosaurs");
  
  useEffect(() => {
    //setText("Slider value changed to: " + sliderValue.join(", "));
    const fetchChatCompletion = async () => {
      try {
        const response = await axios.get('/api', {
          headers: {
            'number': sliderValue[0].toString(),
          },
        });
        setText(response.data.chatCompletion.choices[0].message.content);
      } catch (error) {
        console.error('Failed to fetch chat completion:', error);
      }
    };

    fetchChatCompletion();

  }, [sliderValue]);

  return (
    <div className="flex justify-center items-center flex-col h-screen max-w-md mx-auto py-8">
      <h1>Introduction to Dinosaurs</h1>
      <h1 className="mb-4">{text}</h1>
      <Slider 
        defaultValue={sliderValue} 
        max={9} 
        step={1} 
        onValueChange={setSliderValue}
      />
      <div className="">
        {/* You can use sliderValue state here to display or use the value */}
      </div>
    </div>
  );
}
