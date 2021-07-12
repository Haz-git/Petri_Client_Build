//This file contains common device breakpoints for easier media queries:

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '414px',
    tablet: '768px',
    laptopS: '850px',
    laptop: '1024px',
    laptopL: '1440px',
    desktopS: '1920px',
    desktopL: '2560px',
};

export const deviceMin = {
    //Styles work for allotted width or higher.
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptopS: `(min-width: ${size.laptopS})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktopS: `(min-width: ${size.desktopS})`,
    desktopL: `(min-width: ${size.desktopL})`,
};

export const deviceMax = {
    //Styles work for allotted width or lower.
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptopS: `(max-width: ${size.laptopS})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktopS: `(max-width: ${size.desktopS})`,
    desktopL: `(max-width: ${size.desktopL})`,
};
