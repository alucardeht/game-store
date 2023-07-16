import '@/styles/globals.css';
import Header from '@/components/Header';
import {Provider} from 'jotai';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {ThemeProvider} from '@material-tailwind/react';
import customTheme from '@/utils/theme';

const App = ({Component, pageProps}) => {
    const router = useRouter();

    const additionClasses = useMemo(() => {
        if (router.pathname === '/login') {
            return 'login-style';
        }

        if (router.pathname === '/register') {
            return 'register-style';
        }

        if (router.pathname === '/success') {
            return 'success-style';
        }

        return 'brilliant-main-screens';
    }, [router.pathname]);

    return (
        <Provider>
            <ThemeProvider value={customTheme}>
                <Header/>
                <div className={`brilliant-container ${additionClasses}`}>
                    <Component {...pageProps} />
                </div>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
