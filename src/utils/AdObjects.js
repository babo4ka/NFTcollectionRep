import image from '../images/bckgrnd.png'
import car1 from '../images/car1.jpg'
import car2 from '../images/car2.jpg'
import car3 from '../images/car3.jpg'

export const AdObjects = ()=>{
    const objects = [
        {
            imageLink:image,
            link:"https://google.com"
        },
        {
            imageLink:car1,
            link:""
        },
        {
            imageLink:car2,
            link:""
        },
        {
            imageLink:car3,
            link:"https://www.youtube.com/watch?v=KVDxGX7ecP4"
        }
    ]
    return{
        objects
    }
}