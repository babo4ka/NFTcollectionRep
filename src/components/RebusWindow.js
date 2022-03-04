import React , {Component, useEffect, useRef, useState} from 'react';
import './css/RebusWindow.scss';

import img from '../images/example.jpg'


const RebusItem = (props)=>{
    const className = `item ${props.className}`

    return(
        <div onDragStart={(e)=>props.onDragStart(e)} onDragEnter={(e)=>props.onDragEnter(e)} key={props.key} draggable className={className}>
           item{props.itemId}
        </div>
    )
}

const RebusNest = (props)=>{
    const className = `nest ${props.className}`

    return(
        <div draggable onDragStart={(e)=>props.onDragStart(e)}  onDragEnter={(e)=>props.onDragEnter(e)} key={props.key} className={className}>
            {props.nestId}
        </div>
    )
}

const RebusWindow = (props) =>{

    
    useEffect(()=>{

    });


    const [rebusData, setRebusData] = useState(props.rebusData);
    
    const dragItem = useRef(null);
    const dragNode = useRef(null);
    
    const [dragging, setDragging] = useState(false);

    const handleDragStart = (e, params)=>{
        console.log(`start dragging...${params}`)
        dragItem.current = params;
        dragNode.current = e.target;
        var plus;
        if(params.groupI == 0){
            plus = "-"
        }else{
            plus = "+"
        }
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(()=>{
            setDragging(true)
        }, 0)
    }

    const handleDragEnd = (plus)=>{
        console.log(`End dragging...`)
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        setDragging(false);
        if(dragItem.current.groupI == 1){
            setTook(took+1)
        }else{
            setTook(took-1)
        }
        dragItem.current = null;
        dragNode.current = null;


    }

    const handleDragEnter = (e, params)=>{
        console.log(`entering drag...${params.itemI}, ${params.groupI}`)
        const currentItem = dragItem.current;
        if(e.target != dragNode.current){
            console.log("target is not the same")
            setRebusData(oldData => {
                let newData = JSON.parse(JSON.stringify(oldData));
                newData[params.groupI].items.splice(params.itemI, 0, newData[currentItem.groupI].items.splice(currentItem.itemI, 1)[0])
                dragItem.current = params;
                return newData;
            })
        }

    }

    const fieldDragEnter = (e, groupI)=>{
        
        const currentItem = dragItem.current;
        if(rebusData[groupI].items.length == 0){
            console.log(`${currentItem.itemI} hello`)
            setRebusData(oldData => {
                let newData = JSON.parse(JSON.stringify(oldData));
                newData[groupI].items.push(newData[currentItem.groupI].items.splice(currentItem.itemI, 1)[0])
                return newData;
            })
        }

    }

    const getStyles = (params) =>{
        const currentItem = dragItem.current;
        if(currentItem.itemI == params.itemI && currentItem.groupI == params.groupI)return 'current col-2'
        return 'col-2'
    }

    const id = `rebusWindow${props.number}`

    const needed = 6;
    const [took, setTook] = useState(0);

    return(
        <div class="modal fade" id={id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content rebus_content">

                    <div className="rebus_header">
                        <h5 class="modal-title" id="exampleModalLabel">#</h5>
                    </div>
                        
                    <div className="rebus_main_content">
                            
                        <div className="container-fluid">

                            <div className="row" id="rebus_holder">
                            
                                {rebusData.map((group, groupI)=>(
                                    <div key={group.title} className="col-12" id={group.title}>
                                        <div className="container-fluid">
                                            <div>
                                                {group.title == 'nests'?(
                                                    <div onDragEnter={(e)=>fieldDragEnter(e, groupI)} className="row justify-content-center row_holder">
                                                        <hr class="line_in_rebus mt-3"></hr>
                                                        <span className='col-6'>Move them here and put them in right order to solve rebus</span>
                                                        <span className='col-6 text-end'>You took {took} of {needed} needed</span>
                                                        {group.items.map((item, itemI) =>(
                                                            <RebusNest 
                                                            key={itemI} 
                                                            nestId={item} 
                                                            className="col-2"
                                                            onDragStart={(e)=>{handleDragStart(e, {itemI, groupI})}} 
                                                            onDragEnter={dragging?(e)=>{handleDragEnter(e, {itemI, groupI})}:null}
                                                            />
                                                        ))}
                                                    </div>
                                                ):(
                                                    <div onDragEnter={(e)=>fieldDragEnter(e, groupI)} className="row justify-content-center row_holder">
                                                        <hr class="line_in_rebus mt-3"></hr>
                                                        <span className='col-6'>This is your cards to solve rebus</span>
                                                        <span className='col-6 text-end'>You can move them back if nessesary</span>
                                                        {group.items.map((item, itemI) =>(
                                                            <RebusItem 
                                                            onDragEnter={dragging?(e)=>{handleDragEnter(e, {itemI, groupI})}:null}
                                                            onDragStart={(e)=>{handleDragStart(e, {itemI, groupI})}} 
                                                            key={itemI} 
                                                            itemId={item} 
                                                            className={dragging?getStyles({itemI, groupI}):"col-2"}
                                                            />
                                                        ))} 
                                                    </div>
                                                )}
                                                
                                            </div>    
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                    <div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button type="button" class="btn btn-primary">Сохранить изменения</button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
    export default RebusWindow;