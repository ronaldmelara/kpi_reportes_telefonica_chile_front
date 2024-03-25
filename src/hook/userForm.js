import { useState } from "react";

export const useForm = ( initialForm = {}) => {
    const [ formState, setFormSate ] = useState(initialForm);

    const onInputChange = ({ target })=>{
        const { name, value } = target;
        setFormSate({
            ...formState,
            [ name ]:value
        });
    }

    const onResetForm = () => {
        setFormSate(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }
}