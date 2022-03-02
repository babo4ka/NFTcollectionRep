import React , {Component, useEffect, useRef, useState} from 'react';
import './css/RebusWindow.scss';
import img from '../images/example.jpg'

const RebusItem = (props)=>{
    const [itemId, setItemId] = useState(props.itemId);
    const className = `item ${props.className}`

    const handleDragStart = (e, params)=>{
        console.log("dragging..." + params.id)
    }

    return(
        <div draggable onDragStart={(e)=>handleDragStart(e, {id:itemId})} className={className}>
            <img className="item_img" src={img}></img>
        </div>
    )
}

const RebusWindow = () =>{

    
    useEffect(()=>{
        
    });
    
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

                            <div className="row">
                                {/* items for rebus */}
                                <div className="col-12" id="items">
                                    <div className="container-fluid">
                                        <div className="row justify-content-center">
                                           <RebusItem className="col-2" itemId={1}></RebusItem>
                                           <RebusItem className="col-2" itemId={2}></RebusItem>
                                           <RebusItem className="col-2" itemId={3}></RebusItem>
                                           <RebusItem className="col-2" itemId={54}></RebusItem>
                                           <RebusItem className="col-2" itemId={6}></RebusItem>
                                           <RebusItem className="col-2" itemId={223}></RebusItem>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* nests for items */}
                                <div className="col-12" id="nests">
                                    <div className="container-fluid">
                                        <div className="row justify-content-center">
                                            <div className="col-2">nest</div>
                                            <div className="col-2">nest</div>
                                            <div className="col-2">nest</div>
                                            <div className="col-2">nest</div>
                                            <div className="col-2">nest</div>
                                            <div className="col-2">nest</div>
                                        </div>
                                    </div>
                                </div>

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