import { InputHTMLAttributes, useEffect, useState } from "react"
import SearchIcon from '../assets/search.svg'
import DropdownIcon from '../assets/dropdown.svg'
import { useDebounce } from "../hooks/Hooks"

interface DropdownFilterProps extends InputHTMLAttributes<HTMLInputElement> {
    type: 'SEARCH' | 'FILTER' | 'DROPDOWN'
    label: string
    resetValue: boolean | undefined
    isShown: boolean
    selectedItem?: any
    items?: any
    onFocus: () => void
    onTermChanges: (searchTerm: string | undefined) => void
}

export default function DropdownFilter({ type, label, resetValue, isShown, items, selectedItem, onTermChanges, onFocus, ...props }: DropdownFilterProps) {
    const [searchTerm, setSeachTerm] = useState<string>("")

    const bouncedSearchText = useDebounce(searchTerm)
    useEffect(() => {
        (type !== 'DROPDOWN') && onTermChanges(bouncedSearchText)
    }, [bouncedSearchText])

    useEffect(() => {
        type === 'DROPDOWN' && onTermChanges(searchTerm)
    }, [searchTerm])

    useEffect(() => {
        console.log(6666, resetValue)
        if(resetValue) setSeachTerm("");
    }, [resetValue])

    const render = () => {
        switch (type) {
            case 'FILTER':
                return <div className="flex flex-row gap-2">
                    <div className="z-20 cursor-pointer" onClick={() => onFocus()}>{label}</div>
                    <img src={DropdownIcon} className="z-20 w-2 cursor-pointer" alt="logo" />
                    <div className={`p-2 bg-white shadow-sm absolute ${isShown ? 'visible' : 'hidden'}`}>
                        <input value={searchTerm} {...props} name={label} placeholder={`Enter ${label}`} className="p-2 border mt-5 border-as-gray" onChange={(e) => setSeachTerm(e.target.value)} type="text" />
                    </div>
                </div>
            case 'SEARCH':
                return <>
                    <img src={SearchIcon} className="z-20 min-w-6 w-6 cursor-pointer block" alt="logo" />
                    <div className={`p-2 bg-white shadow-sm absolute ${isShown ? 'visible' : 'hidden'}`}>
                        <input value={searchTerm} {...props} name={label} placeholder={`Enter ${label}`} className="p-2 border mt-5 border-as-gray" onChange={(e) => setSeachTerm(e.target.value)} type="text" />
                    </div>
                </>
            case 'DROPDOWN':
                return <div className="flex flex-row gap-2">
                    <p>{selectedItem}</p>
                    <img src={DropdownIcon} className="z-20 w-2 cursor-pointer" alt="logo" />
                    <div className="z-20 cursor-pointer" onClick={() => onFocus()}>{label}</div>
                    <ul className={`p-2 flex flex-col bg-white mt-5 w-20 gap-3 shadow-sm absolute  ${isShown ? 'visible' : 'hidden'}`}>
                        {items?.map((item: any) => {
                            return <li className="cursor-pointer" onClick={() => setSeachTerm(item)}>{item}</li>
                        })}
                    </ul>
                </div>

        }
    }

    return (
        <div onClick={onFocus} className="flex flex-col relative z-10 overflow-visible">
            {render()}
        </div>
    )
}
