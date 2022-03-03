export const AllRebuses=(number)=>{
    const rebusNumber = [1,2];

    const rebusData = [
        [
            {title: 'items', items: [1,2,3,4,5]},
            {title: 'nests', items: [11,22,33,44,55]}
        ],
        [
            {title: 'items', items: [1,2,3,4,5]},
            {title: 'nests', items: [111,222,333,444,555]}
        ],
    ]

    const object = {
        rebusNumber:rebusNumber[number-1],
        rebusData:rebusData[number-1]
    }

    return{
        object
    }
}

// export const Rebus1 = () =>{
//     const rebusNumber = 1;

//     const rebusData = [
//         {title: 'items', items: [1,2,3,4,5]},
//         {title: 'nests', items: [11,22,33,44,55]}
//     ]

//     return{
//         rebusNumber:rebusNumber,
//         rebusData:rebusData
//     }
// }

// export const Rebus2 = () =>{
//     const rebusNumber = 2;

//     const rebusData = [
//         {title: 'items', items: [1,2,3,4,5]},
//         {title: 'nests', items: [111,222,333,444,555]}
//     ]

//     return{
//         rebusNumber:rebusNumber,
//         rebusData:rebusData
//     }
// }
