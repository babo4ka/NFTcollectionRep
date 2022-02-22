import './css/Examples.scss';
import { useEffect } from 'react';
import SiteButton from './SiteButton';

const Example = (props) =>{
    // const imageURL = "https://99px.ru/sstorage/86/2016/06/image_860106162325305091788.gif";
    // const class_name = "col col-md-4 col-6 example";
    
    function write(){
        console.log(document.getElementById('token_input').value)
    }

    return(
        <div className="row">
            <div className="container-fluid">
                <div className="row justify-content-center token_input_row">
                    <div className="col-12">
                        <div className="container">
                            <div classname="row">
                                <input type="text" className="col-12" id="token_input" placeholder='Enter token ID'/>
                            </div>
                            <div className='row justify-content-center'>
                                <SiteButton func={()=>write()} text="Search token" id="search_btn" cn="col-lg-2 col-sm-4 col-4"></SiteButton>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default Example;