import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY
const axiosClient =  axios.create({
    baseURL: import.meta.env.VITE_BASE_URL+'/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
})

const CreateNewResume = (data) => axiosClient.post('/user-resumes', data)


const GetUserResumes = (userEmail) => axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

const UpdateResumeDetails = (id, data) => axiosClient.put(`/user-resumes/${id}`, {
    data: data.data || data // Handle both cases where data might already be wrapped
});

const GetResumeById = (id)=> axiosClient.get('/user-resumes/'+id +'?populate=*')

const DeleteResumeById = (id) => axiosClient.delete('/user-resumes/'+ id) 

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetails,
    GetResumeById,
    DeleteResumeById
}