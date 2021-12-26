import React from "react";
import { useState } from "react";
import { IState as Props} from "../App";

interface IProps{
    people: Props["people"],
    setPeople: React.Dispatch<React.SetStateAction<Props["people"]>>
}

const AddToList = ({people, setPeople}: IProps) => {
    const [input, setInput] = useState({
        name: "",
        age: "",
        image: "",
        note: ""
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const clickHandler = () => {
        if(!input.name || !input.age || !input.image)
            return;
        
        setPeople([
            ...people,
            {
                name: input.name,
                age: parseInt(input.age),
                url: input.image,
                note: input.note
            }
        ]);
        setInput({
            name: "",
            age: "",
            image: "",
            note: ""
        });
    }

    return (
        <div className="AddToList">
            <input type="text" placeholder="Name" className="AddToList-input" value={input.name} name="name" onChange={changeHandler} />
            <input type="number" placeholder="Age" className="AddToList-input" value={input.age} name="age" onChange={changeHandler} />
            <input type="text" placeholder="Image url" className="AddToList-input" value={input.image} name="image" onChange={changeHandler} />
            <textarea placeholder="Note" className="AddToList-input" value={input.note} name="note" onChange={changeHandler} />
            <button className="AddToList-btn" onClick={clickHandler}>
                Add to list
            </button>
        </div>
    );
}

export default AddToList;