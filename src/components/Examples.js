import './css/Examples.scss';

const Example = (props) =>{
    const imageURL = "https://papik.pro/uploads/posts/2021-09/1630498392_11-papik-pro-p-patrik-risunok-12.jpg";
    const class_name = "col col-md-4 col-6 example";
    return(
        <div className="row">
            <div className="container">
            <div className="row row-cols-sm-5 examples_row">
                <div className={class_name}>
                    <img src={imageURL} className="pic"></img>
                </div>
                <div className={class_name}>
                    <img src={imageURL} className="pic"></img>
                </div>
                <div className={class_name}>
                    <img src={imageURL} className="pic"></img>
                </div>
                <div className={class_name}>
                    <img src={imageURL} className="pic"></img>
                </div>
                <div className={class_name}>
                    <img src={imageURL} className="pic"></img>
                </div>
            </div>

            <div className="row row-cols-sm-5 examples_row">
                <div className={class_name}>
                    <img src={imageURL} className="pic"></img>
                </div>
                <div className={class_name}>
                    <img src={imageURL} className="pic"></img>
                </div>
                <div className={class_name}>
                    <img src={imageURL} className="pic"></img>
                </div>
                <div className={class_name}>
                    <img src={imageURL} className="pic"></img>
                </div>
                <div className={class_name}>
                    <img src={imageURL} className="pic"></img>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Example;