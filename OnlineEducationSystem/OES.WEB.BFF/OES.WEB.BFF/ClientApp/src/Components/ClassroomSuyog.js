import axios from 'axios';
import { useQuery } from 'react-query';

const claimsKeys = {
    claim: ['classrooms']
}

const config = {
    headers: {
        'X-CSRF': '1'
    }
}

const fetchClaims = async () =>
    axios.get('/api/classroomservice/classrooms/teachers/14/classrooms', config)
        .then((res) => { console.log(res.data); return res.data;})
        .catch((e) => { console.log(e); });


function useClassroom() {
    return useQuery(
        claimsKeys.claim,
        async () => fetchClaims(),
        {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    )
}

export default useClassroom; 