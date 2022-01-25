import './css/SiteButton.scss';

const PageButton = (props)=>{

    function goToPage(){
        window.location.assign(props.page);
    }

    return(
        <button id={props.id} onClick={()=>goToPage()} className={props.class_name}>{props.text}</button>
    )
}

const SiteButton = (props)=>{
    const btn_class_name = "site_btn " + props.cn;
    

    return(
        props.isLeading? (
            <PageButton id={props.id} page={props.page} text={props.text} class_name={btn_class_name}></PageButton>
        ):(
            <button id={props.id} className={btn_class_name}>{props.text}</button>
        )
    )
}

export default SiteButton;