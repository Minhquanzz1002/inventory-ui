import React, {useId} from 'react';
import {Status} from "@/components/Forms/ProductForm";
import {ArrowDown} from "@/components/Icons";
interface SelectProps {
    label: string;
    name: string;
    children: React.ReactNode;
}
const Select = ({label, children, name}: SelectProps) => {
    const id : string = useId();
    return (
        <div className="w-full mb-6">
            <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <div className="relative">
                <select
                    className="block appearance-none w-full text-xs bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded  focus:outline-none focus:bg-white focus:border-gray-500"
                    name={name}
                    id={id}>
                    {children}
                </select>
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 cursor-pointer">
                    <ArrowDown/>
                </div>
            </div>
        </div>
    );
};

export default Select;