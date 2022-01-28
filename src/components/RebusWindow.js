import React , {Component} from 'react';

export default class RebusWindow extends Component{

    constructor(props){
        super(props);

        this.state = {
            number: props.number
        }
    }

    render(){
        return(
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">this is {this.state.number}th rebus</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                        </div>
                        
                        <div class="modal-body">
                            hello world
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button type="button" class="btn btn-primary">Сохранить изменения</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}