import { useState } from "react";

export function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);

    return [
        fields,
        function (event) {
            
            let value = "";
            if (event.target){
                value = event.target.value;
                setValues({
                    ...fields,
                    [event.target.name]: value
                });
            }
                
            else{
                value = event.value
                setValues({
                    ...fields,
                    [event.name]: value
                });
            } 
            
        }
    ];
}
