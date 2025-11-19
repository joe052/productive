"use client";
import React from 'react';

const NewTaskButton = () => {
  const buttonStyle = {
    backgroundColor: '#2AB77C',
    color: '#FFFFFF',          
    padding: '8px 15px',
    border: 'none',
    cursor: 'pointer',
    
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 'bold',
    
    borderRadius: '6px', 
    
    boxShadow: '0 0 5px rgba(158, 161, 163, 0.32), 0 0 10px rgba(158, 164, 167, 0.4)',    
    textShadow: '0 1px 0 rgba(0, 0, 0, 0.4), 0 0 3px rgba(255, 255, 255, 0.5)',
    
    outline: '1px solid rgba(255, 255, 255, 0.3)',
    outlineOffset: '-1px',
    
    display: 'inline-block',
    textAlign: 'center',
    transition: 'background-color 0.3s, box-shadow 0.3s', 
  };


  return (
    <button 
      style={buttonStyle}
      onClick={() => alert('New Task Button Clicked!')}
    >
      + New Task
    </button>
  );
};

export default NewTaskButton;