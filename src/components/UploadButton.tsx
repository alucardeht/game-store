import React from 'react';
import {Button} from "@material-tailwind/react";
import {CloudArrowUpIcon} from "@heroicons/react/24/solid";
import {UseFormRegisterReturn} from "react-hook-form";

interface UploadButtonProps {
    register: UseFormRegisterReturn;
    name: string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    onClick: (name: string) => void;
    changeColor?: boolean;
    multiple?: boolean;
}

const UploadButton = ({
                          register,
                          name,
                          onChange,
                          onClick,
                          label,
                          changeColor = false,
                          multiple = false
                      }: UploadButtonProps) => {
    return (
        <>
            <input
                {...register}
                id={name}
                type="file"
                onChange={(event) => onChange(event, name)}
                hidden
                multiple={multiple}
                accept="image/png, image/jpeg"
            />
            <Button variant="gradient"
                    className={`flex items-center gap-3 ${changeColor ? 'text-default' : ''}`}
                    onClick={() => onClick(name)}>
                <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5"/> {label}
            </Button>
        </>

    );
};

export default UploadButton;
