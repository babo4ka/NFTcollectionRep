import React , {Component, useEffect, useRef, useState} from 'react';
import './css/RebusWindow.scss';

import img from '../images/example.jpg'


const RebusItem = (props)=>{
    const className = `item ${props.className}`

    return(
        <div key={props.key} draggable className={className}>
            <img className="item_img" src={img}></img>
        </div>
    )
}

const RebusNest = (props)=>{
    const className = `nest ${props.className}`

    return(
        <div key={props.key} className={className}>
            {props.nestId}
        </div>
    )
}

const RebusWindow = (props) =>{

    
    useEffect(()=>{

    });

    //const rebusData = props.rebusData;
    let rebusData = [
        {title: 'items', items: [1,2,3,4,5]},
        {title: 'nests', items: [11,22,33,44,55]}
    ]
    
    const dragItem = useRef(null);
    const dragNode = useRef(null);


    return(
        <div class="modal fade" id="rebusWindow" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                    <div className="row justify-content-center">
                                                        {group.items.map((item, itemI) =>(
                                                            <RebusNest key={itemI} nestId={item} className="col-2"/>
                                                        ))}
                                                    </div>
                                                ):(
                                                    <div className="row justify-content-center">
                                                        {group.items.map((item, itemI) =>(
                                                            <RebusItem key={itemI} itemId={item} className="col-2"/>
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