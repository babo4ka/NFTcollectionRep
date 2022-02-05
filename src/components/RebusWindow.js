import React , {Component, useEffect} from 'react';
import './css/RebusWindow.scss';


const RebusWindow = () =>{

    
    useEffect(()=>{
        
    });
    

    return(
        <div class="modal fade" id="rebusWindow" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content rebus_content">

                    <div className="rebus_header">
                        <h5 class="modal-title" id="exampleModalLabel">#</h5>
                    </div>
                        
                    <div className="rebus_main_content">
                            
                        <div id="draggable" className="exmpl">1</div>
                        <div className="exmpl">2</div>
                        <div className="exmpl">3</div>

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