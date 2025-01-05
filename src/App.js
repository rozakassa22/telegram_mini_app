import React, { useState } from 'react';
import { App } from 'konsta/react';
import Welcome from './components/welcome';
import NextPage from './components/NextPage';
import BakeryAdminsPage from './components/cakeplaces'; 
import ProductsPage from "./components/ProductsPage";

function MyApp() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [selectedBakeryAdmin, setSelectedBakeryAdmin] = useState(null);

  const navigateToNext = () => setCurrentPage('nextPage');
  const navigateToList = () => setCurrentPage('cakePlaces');
  const navigateToProducts = (bakeryAdminId) => {
    setSelectedBakeryAdmin(bakeryAdminId);
    setCurrentPage("products");
  };
  const navigateBack = () => setCurrentPage("cakePlaces");
  return (
    <App theme="ios">
      {currentPage === 'welcome' && <Welcome navigateToNext={navigateToNext} />}
      {currentPage === 'nextPage' && <NextPage navigateToList={navigateToList} />}
      {currentPage === "cakePlaces" && (
        <BakeryAdminsPage navigateToProducts={navigateToProducts} />
      )}
      {currentPage === "products" && (
        <ProductsPage
          bakeryAdminId={selectedBakeryAdmin}
          navigateBack={navigateBack}
        />
      )}
    </App>
  );
}

export default MyApp;
