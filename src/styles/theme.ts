// theme.ts
import '@emotion/react';
import { Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      white: string;
      darkGrey: string;
      lightGrey: string;
      logoGreen: string;
      lightGreen: string;
      darkerGreen: string;
      lightTan: string;
      lightestTan: string;
      tan: string;
      salmon: string;
      red: string;
      navyBlue: string;
      lightBlue: string;
      lightestBlue: string;
    };
    fonts: {
      header: string;
      body: string;
    };
  }
}

const theme: Theme = {
  colors: {
    white: '#FFFFFF',
    darkGrey: '#4D4D4D',
    lightGrey: '#949494',
    logoGreen: '#75DA99',
    lightGreen: '#D9EAD3',
    darkerGreen: '#3F7652',
    lightTan: '#DEDDD9',
    lightestTan: '#EEEEEC',
    tan: '#AAA29C',
    salmon: '#F2ADA0',
    red: '#FF0000', 
    navyBlue: '#0B5394',
    lightBlue: '#6FA8DC',
    lightestBlue: '#CFE2F3',
  },
  fonts: {
    header: 'Poppins, sans-serif',
    body: 'Muli, sans-serif',
  },
};

export default theme;
