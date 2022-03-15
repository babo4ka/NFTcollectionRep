import React , {Component, useEffect, useRef, useState} from 'react';
import './css/RebusWindow.scss';

import { startRebusSolving } from '../utils/interact';

const RebusItem = (props)=>{
    const className = `item ${props.className}`

    return(
        <div onDragStart={(e)=>props.onDragStart(e)} onDragEnter={(e)=>props.onDragEnter(e)} key={props.key} draggable className={className}>
           <img class="item_img" src={props.image}></img>
        </div>
    )
}

const RebusNest = (props)=>{
    const className = `nest ${props.className}`

    return(
        <div draggable onDragStart={(e)=>props.onDragStart(e)}  onDragEnter={(e)=>props.onDragEnter(e)} key={props.key} className={className}>
            <img class="item_img" src={props.image}></img>
        </div>
    )
}


const RebusWindow = (props) =>{

    const [rebusData, setRebusData] = useState(props.rebusData);
    
    const dragItem = useRef(null);
    const dragNode = useRef(null);
    
    const [dragging, setDragging] = useState(false);
    const [draggingToEmpty, setDraggingToEmpty] = useState(false);

    const handleDragStart = (e, params)=>{
        dragItem.current = params;
        dragNode.current = e.target;
        
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(()=>{
            setDragging(true)
        }, 0)
    }

    const handleDragEnd = ()=>{
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        setDragging(false);

        dragItem.current = null;
        dragNode.current = null;

    }

    const handleDragEnter = (e, params)=>{
        if(!draggingToEmpty){
            const currentItem = dragItem.current;
            if(e.target != dragNode.current){
                setRebusData(oldData => {
                    let newData = JSON.parse(JSON.stringify(oldData));
                    newData[params.groupI].items.splice(params.itemI, 0, newData[currentItem.groupI].items.splice(currentItem.itemI, 1)[0])
                    newData[params.groupI].pics.splice(params.itemI, 0, newData[currentItem.groupI].pics.splice(currentItem.itemI, 1)[0])
                    dragItem.current = params;
                    return newData;
                })
            }
        }
    }

    const fieldDragEnter = (e, groupI)=>{
        
        const currentItem = dragItem.current;
        if(rebusData[groupI].items.length == 0){
            setDraggingToEmpty(true)
            setRebusData(oldData => {
                let newData = JSON.parse(JSON.stringify(oldData));
                newData[groupI].items.push(newData[currentItem.groupI].items.splice(currentItem.itemI, 1)[0])
                newData[groupI].pics.push(newData[currentItem.groupI].pics.splice(currentItem.itemI, 1)[0])
                return newData;
            })
        }

    }

    const [sendingSolve, setSendingSolve] = useState(false);

    function sureSending(){
        setSendingSolve(!sendingSolve);
        if(rebusData[1].items.length < rebusData[1].needed){
            setSureSendingTxt("You took less cards than you need! You'll automatically fail this rebus. Are you sure?");
        }else if(rebusData[1].items.length > rebusData[1].needed){
            setSureSendingTxt("You took more cards than you need! You'll automatically fail this rebus. Are you sure?");
        }else{
            setSureSendingTxt("Are you sure with your answer?");
        }
    }

    const [sureSendingTxt, setSureSendingTxt] = useState("");


    const getStyles = (params) =>{
        const currentItem = dragItem.current;
        if(currentItem.itemI == params.itemI && currentItem.groupI == params.groupI)return 'current col-2'
        return 'col-2'
    }

    const id = `rebusWindow${props.number}`

    function onRebusEnd(){

        if(rebusData[1].needed > rebusData[1].items.length){
            console.log("rebus failed(you have less)")
        }else if(rebusData[1].needed < rebusData[1].items.length){
            console.log("rebus failed(you have more)")
        }else{
            for(let i=0; i<rebusData[1].items.length; i++){
                if(rebusData[1].order[i] != rebusData[1].items[i]){
                    console.log("rebus failed(incorrect order)")
                    return;
                }
            }
            
            console.log("rebus solved")
        }
    }

    let timeToSolve = 3*60;
    var timer;
    const [timeToShow, setTimeToShow] = useState();

    function setTimer(){
        timer = setInterval(function(){
            var totalTime = timeToSolve;
    
            var seconds = totalTime%60;
            var minutes = totalTime/60%60;

            seconds = seconds<10? `0${Math.trunc(seconds)}`:Math.trunc(seconds);
            minutes = minutes<10? `0${Math.trunc(minutes)}`:Math.trunc(minutes);


            if(totalTime <= 0){
                clearInterval(timer);
                setTimeToShow("Time is out!")
            }else{

                if(totalTime<10){
                    document.getElementById("timer").classList.add('time_red');
                }

                setTimeToShow(`${minutes}:${seconds}`)
            }
            timeToSolve--;
        }, 1000)
    }

    useEffect(async()=>{
        
        var window = document.getElementById(id)
        window.addEventListener('show.bs.modal', async function (event) { 
            await startRebus();
        })

        window.addEventListener('hidden.bs.modal', function (event) { 
            clearInterval(timer);
            timeToSolve = 3*60;
        })

    }, [])
        
    const [rebusHeader, setRebuseHeader] = useState(`Rebus# ${props.number}`)
    const [started, setStarted] = useState(false);

    async function startRebus(){
        // setTimeout(function(){
        //     setStarted(true)
        //     setTimer();
        // }, 5000)

        const {success, status} = await startRebusSolving(props.number);

        if(success){
            setStarted(true);
            setTimer();
        }else{
            setRebuseHeader(`Couldn't start rebus :( ${status}`)
        }

    }

    return(
        <div class="modal fade" id={id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content rebus_content">

                    <div className="rebus_header mt-2 mb-2 row pe-3 ps-3">
                        <h5 class="modal-title col-12" id="exampleModalLabel">{rebusHeader}</h5>
                        <span id="timer" className="col-12 text-end">Time left: {timeToShow}</span>
                    </div>
                        
                    <div className="rebus_main_content">
                        {started? (
                            <div className="container-fluid">

                                <div className="row" id="rebus_holder">

                                    {rebusData.map((group, groupI)=>(
                                        <div key={group.title} className="col-12" id={group.title}>
                                            <div className="container-fluid">
                                                <div>
                                                    {group.title == 'nests'?(
                                                        <div onDragEnd={()=> setDraggingToEmpty(false)} onDragEnter={(e)=>fieldDragEnter(e, groupI)} className="row justify-content-center row_holder">
                                                            <hr class="line_in_rebus mt-3"></hr>
                                                            <span className='col-6'>Move them here and put them in right order to solve rebus</span>
                                                            <span className='col-6 text-end'>You need {group.needed} cards here</span>
                                                            {group.items.map((item, itemI) =>(
                                                                <RebusNest 
                                                                image={group.pics[itemI]}
                                                                key={itemI} 
                                                                nestId={item} 
                                                                className="col-2"
                                                                onDragStart={(e)=>{handleDragStart(e, {itemI, groupI})}} 
                                                                onDragEnter={dragging?(e)=>{handleDragEnter(e, {itemI, groupI})}:null}
                                                                />
                                                            ))}
                                                        </div>
                                                    ):(
                                                        <div onDragEnd={()=> setDraggingToEmpty(false)} onDragEnter={(e)=>fieldDragEnter(e, groupI)} className="row justify-content-center row_holder">
                                                            <hr class="line_in_rebus mt-3"></hr>
                                                            <span className='col-6'>This is your cards to solve rebus</span>
                                                            <span className='col-6 text-end'>You can move them back if nessesary</span>
                                                            {group.items.map((item, itemI) =>(
                                                                <RebusItem 
                                                                image={group.pics[itemI]}
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
                        ):(
                            ""
                        )}
                            
                        

                    </div>


                    <div className="row justify-content-center mt-2 mb-2">
                        {sendingSolve?(
                            <div className="col-6 row justify-content-center text-center">
                                <div className="col-12">
                                   {sureSendingTxt}
                                </div>

                                <div className="col-12 row justify-content-center">
                                    <button onClick={()=>setSendingSolve(!sendingSolve)} className="col-4 site_btn close_rebus_btn" id="think_more">let me think more</button>
                                    <button onClick={onRebusEnd} className="col-4 site_btn close_rebus_btn" data-bs-dismiss="modal">yes, send solve</button>
                                </div>
                            </div>
                            ):(
                                <button onClick={sureSending} type="button" className="col-4 site_btn close_rebus_btn">Send solve</button>
                            )}
                    </div>
                </div>
            </div>

    
        </div>


        )
    }
    
    export default RebusWindow;