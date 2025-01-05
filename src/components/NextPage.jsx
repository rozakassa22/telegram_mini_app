import React from 'react';
import { Page, Block, Button } from 'konsta/react';

const NextPage = ({ navigateToList }) => {
  return (
    <Page className="bg-[#F4F6FF]">
      <Block strong className="bg-white flex flex-col items-center justify-center h-screen px-6 text-center rounded-lg shadow-lg mx-4">
        {/* Circular Logo */}
        <div className="w-24 h-24 bg-[#FFD1D1] rounded-full shadow-lg mb-6 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/80"
            alt="Logo"
            className="rounded-full"
          />
        </div>

        {/* Text */}
        <h1 className="text-2xl font-semibold text-[#FFB8D2] mb-4">
          Let's Get Started!
        </h1>
        <p className="text-sm text-[#FFE3E3]">
          Explore a curated list of amazing cake places just for you.
        </p>

        {/* Start Button */}
        <Button
          className="w-full max-w-xs mt-10 text-white font-bold rounded-lg shadow-lg bg-[#FFB8D2]"
          onClick={navigateToList}
        >
          Start
        </Button>
      </Block>
    </Page>
  );
};

export default NextPage;
