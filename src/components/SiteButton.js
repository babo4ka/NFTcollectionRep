import './css/SiteButton.scss';

const SiteButton = (props)=>{
    const btn_class_name = "site_btn " + props.cn;

    return(
        <button className={btn_class_name}>{props.text}</button>
    )
}

export default SiteButton;