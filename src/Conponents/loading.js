function Loading (props){
    const show=props.display?"block":"none";
    const style = {
        width:"100%",
        height:"100%",
        position:"fixed",
        top:0,
        left:0,
        backgroundColor:"rgb(255 255 255)",
        opacity:0.7,
        zIndex:100,
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        backgroundImage:"url(sample.gif)",
        display:show
    }
    return (
        <div style={style}>
        </div>
    );
}
export default Loading;