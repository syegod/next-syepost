'use client';
import { FC, useEffect, useState } from 'react';
import { MdOutlineWbSunny } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";

interface SwitchThemeProps {

}

export const SwitchTheme: FC<SwitchThemeProps> = ({

}) => {
    const [theme, setTheme] = useState<'dark' | 'light'>('light');

    useEffect(() => {
        if (window) {
            const currentTheme = localStorage.getItem('theme');

            if (!currentTheme) {
                localStorage.setItem('theme', 'dark');
            } else {
                const body = document.querySelector('body');
                if (currentTheme === 'dark') {
                    setTheme('dark');
                    if (!body?.classList.contains('dark')) {
                        body?.classList.add('dark');
                    }
                }
                if (currentTheme === 'light') {
                    setTheme('light');
                    if (body?.classList.contains('dark')) {
                        body?.classList.remove('dark');
                    }
                }
            }
            }
    }, []);

    const handleClick = () => {
        const body = document.querySelector('body');
        if (theme === 'light') {
            setTheme('dark');
            if (localStorage.getItem('theme') !== 'dark') {
                localStorage.setItem('theme', 'dark');
            }
            if (!body?.classList.contains('dark')) {
                body?.classList.add('dark');
            }
        } else {
            setTheme('light');
            if (localStorage.getItem('theme') !== 'light') {
                localStorage.setItem('theme', 'light');
            }
            if (body?.classList.contains('dark')) {
                body?.classList.remove('dark');
            }
        }
    }

    return (
        <button onClick={handleClick}>
            {theme === 'dark' ? <IoIosMoon size={23} /> : <MdOutlineWbSunny size={23} />}
        </button>
    )
}