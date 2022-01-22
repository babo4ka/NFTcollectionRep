import './css/Examples.scss';

const Example = (props) =>{
    const imageURL = "https://99px.ru/sstorage/86/2016/06/image_860106162325305091788.gif";
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