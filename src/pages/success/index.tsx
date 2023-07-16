import React, {useEffect, useState} from 'react';
import {Controls, Player} from "@lottiefiles/react-lottie-player";
import {useRouter} from "next/router";

type RouterProps = {
    redirectTo: string;
};

const Success = () => {
    const router = useRouter();
    const {redirectTo} = router.query as RouterProps;
    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        setAnimation(true);

        setTimeout(() => {
            setAnimation(false);
        }, 2000);

        setTimeout(() => {
            router.push(redirectTo);
        }, 3000);
    }, []);


    return (
        <div
            className={`flex justify-center items-center w-full h-[100vh]`}>
            <Player
                autoplay
                loop
                src={'/lotties/success.json'}
                style={{height: '250px', width: '250px'}}
                className={`transition transform duration-1000 ease-in-out ${animation ? 'scale-125 opacity-100' : 'scale-0 opacity-0'}`}
            >
                <Controls visible={false}/>
            </Player>
        </div>
    );
};

export default Success;
