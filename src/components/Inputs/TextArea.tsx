import React, {useId} from 'react';

interface TextAreaProps {
    label: string;
    feedback: string;
    placeholder: string;
    name: string;
    error?: boolean;
    required?: boolean;
}

const TextArea = ({label, feedback, placeholder, name, error = false, required = false}: TextAreaProps) => {
    const id : string = useId();
    return (
        <div className="w-full mb-6">
            <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 text-xs rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id={id} name={name} placeholder={placeholder} required={required} rows={5}/>
            <p className={`text-red-500 text-xs italic text-danger ${error ? "block" : "hidden"}`}>{feedback}</p>
        </div>
    );
};

export default TextArea;