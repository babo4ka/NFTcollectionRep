import exmpl from '../images/example.jpg'

export const AllRebuses=()=>{
    // const rebusNumber = [1,2];

    const rebusData = [
        [
            {title: 'items', items: [1,2,3,4,5,6,7], pics:[exmpl, exmpl, exmpl, exmpl, exmpl, exmpl, exmpl]},
            {title: 'nests', items: [], needed: 5, order:[4,3,5,2,7], pics:[]}
        ],
        [
            {title: 'items', items: [1,2,3,4,5], pics:[exmpl, exmpl, exmpl, exmpl, exmpl]},
            {title: 'nests', items: [], needed: 3, order:[1,3,5], pics:[]}
        ]
    ]


    return{
        rebusData:rebusData
    }
}
