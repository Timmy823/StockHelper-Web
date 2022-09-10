import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBBtn
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './Stock.css'

const Stock = () => {
    const [showItems, setShowItems] = useState({
        dividend: false,
        company_profile: false
    });

    const accessAPI = async (method, req_url, req_data, error_message) => {
        if (method === 'GET') {
            req_url += '?';
            Object.keys(req_data).map((key) => {
                req_url += key + req_data[key];
            });
        }

        const request = await fetch(req_url, {
            method: method,
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
                    "desc": error_message
                },
                "data": {
                }
            };
        }
    };

    const getDividendInfo = (stock_id) => {
        const req_data = {
            'stock_id': stock_id
        };
        return accessAPI('GET', 'http://localhost:5277/member/getMemberInfo', req_data, '無法取得股利政策');
    };

    const getCompanyProfile = (stock_id) => {
        const req_data = {
            'stock_id': stock_id
        };
        accessAPI('GET', 'http://localhost:5277/member/getCompanyProfile', req_data, '無法取得公司基本資料');
    };

    return (
        <MDBContainer className='stock_mainpage'>
            <div className='quote'>
                <h3> 台積電</h3>
                <h4> 2330 </h4>
            </div>
            <div className='menu'>
                <MDBBtn className='mx-2 px-3 stock-menu-button'>股利政策</MDBBtn>
                <MDBBtn className='mx-2 px-3 stock-menu-button'>公司基本資訊</MDBBtn>
            </div>
            <div className='content'>
                <div className={'sub-content ' + (showItems['dividend'] ? '' : 'hidden')}>
                    <h2>股利政策</h2>
                </div>
                <div className={'sub-content ' + (showItems['company_profile'] ? '' : 'hidden')}>
                    <h2>公司基本資料</h2>
                </div>
            </div>
        </MDBContainer>
    );
}
export default Stock;
