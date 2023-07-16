import React from 'react';
import Image from 'next/image';

interface Props {
    height?: number;
    width?: number;
    additionalClasses?: string;
}

const Logo = ({height = 26, width = 26, additionalClasses}: Props) => {
    return (
        <Image
            src="/images/logo.jpg"
            height={height}
            width={width}
            className={`mr-3 rounded-full ${additionalClasses}`}
            alt="Logo"
        />
    );
};

export default Logo;
