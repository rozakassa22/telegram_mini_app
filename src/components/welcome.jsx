import React from 'react';
import { Page, Block, Button } from 'konsta/react';

const Welcome = ({ navigateToNext }) => {
  return (
    <Page className="bg-customPink">
      <Block strong className="bg-white flex flex-col items-center justify-center h-screen px-6 text-center">
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
          Welcome to Cake Provider!
        </h1>
        <p className="text-sm text-[#FFE3E3]">
          Discover the best cake places and their delightful products near you.
        </p>

        {/* Next Button */}
        <Button
          className="w-full max-w-xs mt-10 text-white font-bold rounded-lg shadow-lg bg-[#FFB8D2]"
          onClick={navigateToNext}
        >
          Next
        </Button>
      </Block>
    </Page>
  );
};

export default Welcome;
