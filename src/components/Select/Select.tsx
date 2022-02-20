import styles from './Select.module.scss';
import Option from './Option';
import { MdKeyboardArrowUp } from 'react-icons/md'
import { useState } from 'react';

interface SelectType {
    defaultValue: string,
    options: any[]
    setOptions: Function
}

export default function Select({
    defaultValue,
    options,
    setOptions
}: SelectType) {
    const [selectedOption, setSelectedOption] = useState<any | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    function selectOption(id: number) {
        setOptions(options.map((option: any) => {
            option.select = false;
            if (option.id === id) {
                option.select = true;
                setSelectedOption(option);
            }
            return option
        }))
        setOpen(false);
    }

    function toggleOpen() {
        const nowState = open;
        setOpen(!nowState);
    }

    if (options.length) {
        return (
            <div className={styles.select}>
                <div className={open ? [styles.select__title, styles.select__title_open].join(" ") : styles.select__title} onClick={() => toggleOpen()}>
                    <p>{selectedOption ?? defaultValue}</p>
                    <MdKeyboardArrowUp />
                </div>
                {open && (
                    <div className={styles.select__list}>
                        <hr />
                        {options.map((option: any, i: number) => {
                            return (
                                <Option
                                    option={option}
                                    selectOption={selectOption}
                                    key={i}
                                />
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }

    return <></>
}