import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg'
import Button from '../components/Button'
import { useCallback, useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';


export default function Home() {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const location = useLocation();

    useEffect(() => {
        context?.resetContext();
    }, [location]);

    const navigationHandler = useCallback((route: string) => {
        navigate(route)
    }, [])

    return (
        <div className='flex flex-col gap-10 justify-center min-h-screen items-center'>
            <img src={Logo} className="logo w-60 animate-fade" alt="logo" />
            <div className='flex flex-col gap-5 animate-fade-up animate-ease-out animate-delay-500'>
                <Button text="Users" onClick={() => navigationHandler('/users')} />
                <Button text="Products" onClick={() => navigationHandler('/products')} />
            </div>
        </div>
    )
}
