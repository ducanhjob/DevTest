import React from 'react';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import VolumeDiscountForm from './volume-discount-form';

export default function App() {
  return (
    <AppProvider i18n={{}}>
      <VolumeDiscountForm />
    </AppProvider>
  );
}

