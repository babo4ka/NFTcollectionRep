import './css/Example.css';

const Example = (props) =>{
    const objClassName = "example_window " + props.cn;
    return(
        <div className={objClassName}>
        </div>
    )
}

export default Example;