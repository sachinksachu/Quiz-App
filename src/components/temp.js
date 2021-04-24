const processArray = () => {
    let dataObj = [...quest]

    let optionArray = []

    let obj1 = {
        id: 3,
        answer: true,
        option: dataObj[count].correct_answer, //pushing correct answer to option array
        selected : false
    }

    optionArray.push(obj1)

    dataObj[count].incorrect_answers.map((o, i) => { //pushhing incorrect answers to option array
        let obj2 = {
            id: i,
            answer: false,
            option: o,
            selected : false
        }
        optionArray.push(obj2)
    })

 return optionArray.sort(() => Math.random() - 0.5) //shuffling option array

}