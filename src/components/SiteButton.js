import './css/SiteButton.scss';

export function PageButton(props){
    const btn_class_name = "site_btn " + props.cn;

    function goToPage(){
        window.location.assign(props.page);
    }

    return(
        <button id={props.id} onClick={()=>goToPage()} className={btn_class_name}>
            <div className="btn_text btn_text_fill">{props.text}</div>
        </button>
    )
}


export function OpenRebusButton(props){
    const btn_class_name = "site_btn " + props.cn;

    return(
        <button 
        onClick={props.setNumber} 
        data-bs-toggle={props.data_bs_toggle} 
        data-bs-target={props.data_bs_target} 
        data-bs-whatever={props.data_bs_whatever}
        id={props.id} 
        className={btn_class_name}>
            <div className="btn_text btn_text_fill">{props.text}</div>
        </button>
    )
}

const SiteButton = (props)=>{
    const btn_class_name = "site_btn " + props.cn;
    const text_class_name = "btn_text btn_text_fill " + props.tn;


    return(
        <button id={props.id} className={btn_class_name}>
            <div className={text_class_name}>{props.text}</div>
        </button>
    )
}
export default SiteButton;