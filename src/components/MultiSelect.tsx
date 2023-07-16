import React, {useState} from 'react';
import {Chip, Option, Select, Typography} from '@material-tailwind/react';
import {UseFormRegisterReturn, UseFormSetValue} from "react-hook-form";

interface GenericSelectData {
    name: string;
}

interface MultiSelectProps {
    data: Array<GenericSelectData>,
    register: UseFormRegisterReturn,
    setValue: UseFormSetValue<any>,
    valueName: string,
    placeholder: string,
    errors: string,
    label: string,
}

const MultiSelect = ({data, register, setValue, valueName, placeholder, errors, label}: MultiSelectProps) => {
    const [selectedValues, setSelectedValues] = useState<Array<string>>([]);

    const handleAddValue = (value: string) => {
        if (!selectedValues.includes(value)) {
            setSelectedValues([...selectedValues, value]);
            setValue(valueName, [...selectedValues, value]);  // Set value for react-hook-form
        }
    };

    const handleRemoveGenre = (removedValue: string) => {
        const newSelectedGenres = selectedValues.filter(value => value !== removedValue);
        setSelectedValues(newSelectedGenres);
        setValue(valueName, newSelectedGenres);  // Set value for react-hook-form
    };

    return (
        <div>
            <Typography
                variant="small"
                color="white"
                className="font-medium"
            >
                {label}
            </Typography>

            <div className="w-full flex flex-col gap-y-4">
                <div className="flex flex-wrap">
                    {selectedValues.map(value => (
                        <Chip
                            color="light-blue"
                            size="lg"
                            variant="outlined"
                            className="m-1"
                            onClose={() => handleRemoveGenre(value)}
                            value={value}
                        />
                    ))}
                </div>
                <Select
                    onChange={handleAddValue}
                    className="bg-white"
                    variant="outlined"
                >
                    {data.map((value: { name: string }, index: number) => (
                        <Option key={index} value={value.name}>{value.name}</Option>
                    ))}
                </Select>
                <input {...register} type="hidden"/>
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
    );
};

export default MultiSelect;
