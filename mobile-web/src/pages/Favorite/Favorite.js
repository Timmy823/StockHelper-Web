import React, { useEffect, useState, useRef } from 'react';
import { resolvePath, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../utils/TokenUtils';
import ListInstantStock from "../../components/Card/ListInstantStock";
import "./Favorite.css";

const Favorite = () => {
    const navigate = useNavigate();
    const login_token = 'account_info';
    
    const [FavoriteList, setFavoriteList] = useState([]);
    const FavoriteListRef = useRef(FavoriteList);

    const [ButtonIndex, setButtonIndex] = useState(0);
    
    const getFavoriteListInfo = async (account) => {
        const req_url = "http://localhost:5277/member/getFavoriteList" + "?member_account=" + account;
        const request = await fetch(req_url, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            }
        });

        let response = await request.json();
        if (request.status === 200) {
            return response;
        } else {
            return {
                "metadata": {
                    "status": "error",
                    "desc": "取得列表失敗"
                },
                "data": []
            };
        }
    };

    useEffect(()=>{
        if (getAuthToken(login_token) === null)
            navigate('/login');
        getFavoriteListInfo(JSON.parse(getAuthToken(login_token))['member_account'])
        .then((response)=>{
            setFavoriteList(response.data);
        })
    },[]);

    useEffect(()=>{
        FavoriteListRef.current = FavoriteList;
    });

    return (
        <div>
            <div className='favorite-page'>
                <div className='option-button-list'>
                    {FavoriteList.map((list, index) => { 
                        console.log(index);
                        return <li className='option-button'
                            key={index}
                            id={index}
                            onClick={(e)=> {
                                setButtonIndex(e.target.id);
                            }}
                        >{list.list_name}</li>;
                    })}
                </div>
                <div className='stock-list'>
                </div>
            </div>
        </div>
    );
}
export default Favorite;
