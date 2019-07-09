import { useState, BaseSyntheticEvent } from 'react'

export const useForm = (initialValues: any) => {
    const [values, setValues] = useState(initialValues)


    return [values, (e: BaseSyntheticEvent) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }]
}