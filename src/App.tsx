import React from 'react';
import Hero from './components/Hero';
import Apps from './components/Apps';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <Hero />
      <Apps />
      <Footer />
    </div>
  );
}

export default App;
