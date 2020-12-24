
import axios from 'axios';
import Navbar from './Navbar'; 
import {UserContext} from './UserContext'; 
import React , {useContext , useState ,useEffect} from 'react'
function Watchlist() {

    const {user , setUser} = useContext(UserContext); 

    const [watchlist , setWatchlist] = useState(); 
    useEffect(()=>{
        setUser({
            name: sessionStorage.getItem('sessionName'),
            email: sessionStorage.getItem('sessionEmail'),
            passowrd : sessionStorage.getItem('sessionPassword'), 
            authenticated : sessionStorage.getItem('sessionAuthenticated')
        })
    }, []);
    

    function getWatchlist() {
        if (user.authenticated){
            console.log(`axios.post ${user.email} ${user.password}`);
            axios.post(`/api/users/watchlist/getWatchlist/info/rashad.arbab@uwaterloo.ca/admn6392`).then((res)=>{
                if(res){
                    setWatchlist(res.data); 
                    console.log(JSON.stringify(res.data)) ; 
                }
            }).catch((err)=>{
                console.log(err); 
            })
        }
    }

    useEffect (()=>{
        getWatchlist(); 
    }, [user.authenticated]);

    return (
        <div>
            <Navbar/>
            
        </div>
    )
} export default Watchlist; 