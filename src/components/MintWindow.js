import './css/MintWindow.css'

const MintWindow = (props) =>{
    const objClassName = "mint_window " + props.cn;
    return(
        <div className={objClassName}>minter window
        {/* <button id="mintBtn">GO MINT</button> */}
    </div>
    )
}

export default MintWindow;