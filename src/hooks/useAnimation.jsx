import {useEffect, useRef, useState} from "react";

export const useAnimation = (
    objectsWithAnimation = {}
) => {
    const [listWithoutAnimations, setListWithoutAnimations] = useState({})
    const listOfAnimations = useRef(objectsWithAnimation)
    const defaultAnimation = 'animate__animated animate__bounce'

    const setTemporaryAnimation = ({target}) => {
        const {name} = target
        const setTemporarilyAnimation = listOfAnimations.current[name] === '' ? defaultAnimation : listOfAnimations.current[name]

        setListWithoutAnimations({
            ...listWithoutAnimations,
            [name]: setTemporarilyAnimation
        })

        // Remove the animation after 1 second so that it can be used again
        setTimeout(() => {
            setListWithoutAnimations({
                ...listWithoutAnimations,
                [name]: ''
            })
        }, 1000)
    }

    useEffect(() => {
        for(let object in objectsWithAnimation) {
            setListWithoutAnimations({
                ...listWithoutAnimations,
                [object]: ''
            })
        }
    }, []);

    return ({
        ...listWithoutAnimations,
        setTemporaryAnimation
    })
}
