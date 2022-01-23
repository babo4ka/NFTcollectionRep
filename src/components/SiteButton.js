import './css/SiteButton.scss';

const SiteButton = (props)=>{
    const btn_class_name = "site_btn " + props.cn;
    
    function foo(){
        window.location.assign("rebuses");
    }

    return(
        <button onClick={()=>foo()} className={btn_class_name}>{props.text}</button>
    )
}

export default SiteButton;