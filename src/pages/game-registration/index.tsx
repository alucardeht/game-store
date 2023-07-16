import React from 'react';
import {useForm} from 'react-hook-form';
import {Button} from '@material-tailwind/react';
import {useAuth} from '@/hooks/useAuth';

const GameRegistration = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <h1>Cadastro de Jogos</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Button type="submit">Cadastrar</Button>
            </form>
        </div>
    );
};

export default GameRegistration;
