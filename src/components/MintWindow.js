import './css/MintWindow.scss'

const MintWindow = (props) =>{
    const objClassName = "mint_window " + props.cn;
    return(
        <div className={objClassName}>minter window
        {/* <button id="mintBtn">GO MINT</button> */}

    </div>
    )
}

export default MintWindow;