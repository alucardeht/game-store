import React, {HTMLInputTypeAttribute} from 'react';
import {Checkbox, Input, Typography} from "@material-tailwind/react";

interface Props {
    register: any;
    errors: any;
    name: string;
    placeholder?: string;
    label: string;
    type: HTMLInputTypeAttribute;
    highlightedText?: string;
    highlightedTextLink?: string;
}

const FormItem = ({register, errors, name, placeholder, label, type, highlightedText, highlightedTextLink}: Props) => {
    if (type === 'checkbox') {
        return (
            <div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <Checkbox id={name} aria-describedby={name} {...register}
                                  label={<Typography color="white" className="font-medium flex">{label}
                                      {highlightedText ? (<Typography as="a" href={highlightedTextLink} color="blue"
                                                                      className="font-medium hover:text-blue-700 transition-colors">
                                          &nbsp;{highlightedText}.
                                      </Typography>) : '.'}
                                  </Typography>}
                                  form={name}/>
                    </div>
                </div>
                {errors ? (
                    <Typography
                        variant="small"
                        color="red"
                        className="mb-4 font-medium"
                    >
                        This is a required field
                    </Typography>) : null}
            </div>
        )
    }

    return (
        <div>
            <Typography
                variant="small"
                color="white"
                className="mb-4 font-medium"
            >
                {label}
            </Typography>

            <Input
                type={type} id={name}
                placeholder={placeholder}
                className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                labelProps={{
                    className: "hidden"
                }}
                containerProps={{className: "min-w-[100px]"}}
                {...register}
            />
            {errors ? (
                <Typography
                    variant="small"
                    color="red"
                    className="mb-4 font-medium"
                >
                    This is a required field
                </Typography>) : null}
        </div>
    );
};

export default FormItem;
