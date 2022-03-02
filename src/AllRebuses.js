const RebusItem = (props)=>{
    return(
        <div>
            {props.itemId}
        </div>
    )
}

const RebusNest = (props)=>{
    return(
        <div>
            {props.nestId}
        </div>
    )
}

export const Rebus1 = () =>{
    const rebusNumber = 1;

    const rebusData = {
        itemsIds:[1,2,3,4,5,6,7],

        nestsIds:[1,2,3,4,5]
    }

    return(
        <div>
            <div>
                {rebusData.map(itemId => (
                    <div>
                        <RebusItem itemId={itemId}/>
                    </div>
                ))}
            </div>

            <div>
                {rebusData.map(nestId => (
                    <div>
                        <RebusNest nestId={nestId}/>
                    </div>
                ))}
            </div>
        </div>
    )

}