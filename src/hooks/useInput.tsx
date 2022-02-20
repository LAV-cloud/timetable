import { SetStateAction, useState } from 'react';

interface eventTargetValue {
    target: {
        value: SetStateAction<string>
    }
}

export default function useInput(defaultValue: string = "") {
    const [value, setValue] = useState(defaultValue);

    return {
        bind: {
            value,
            onChange: (e: eventTargetValue) => setValue(e.target.value)
        },
        clear: () => setValue(defaultValue),
        value: () => value,
    }
}