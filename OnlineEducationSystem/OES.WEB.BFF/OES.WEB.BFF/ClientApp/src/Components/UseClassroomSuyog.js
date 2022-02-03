import  useClassroom  from './ClassroomSuyog'

function UseClassroomSuyog() {
    const data = useClassroom();
    return (
        <p>
            Hello josy and shuchi
            {
                    console.log(data)
            }
        </p>
        
        );

}
export  default UseClassroomSuyog;