import { atom } from "recoil";

const localStorageEffect = key => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const AppInfomation = atom({
    key:"mustParkingApp",
    default:{
        usersInfo:{
         0:{
            userName:"유민국",
            userId:"jlkim909",
            userPassword:"alsrnr!904",
            userPhoneNum:"010-4992-4193",
            usedTicket:{
                storeName:"E-Mart",
                code:"MT1",
                startTime:"12:05",
                endTime:"15:04"
            },
            paycheck:[
                {
                    storeName:"이디야 전북대점",
                    code:"CE7",
                    num:3,
                    date:"2022.06.05 03:37",
                    time:30
                },
                {
                    storeName:"파스꾸찌 전주DT점",
                    code:"CE7",
                    num:1,
                    date:"2022.06.05 03:37",
                    time:30
                },
                {
                    storeName:"주한장 전북대점",
                    code:"FD6",
                    num:2,
                    date:"2022.06.05 03:37",
                    time:30
                },
            ],
            gift:[
                {
                    storeName:"돈가스집",
                    code:"FD6",
                    num:3,
                    sender:"나종현",
                    date:"2022.06.05 03:37",
                    time:30
                },
                {
                    storeName:"이디야 전북대점",
                    code:"CE7",
                    num:3,
                    sender:"추연주",
                    date:"2022.06.05 03:37",
                    time:30
                },
                {
                    storeName:"E-Mart",
                    code:"MT1",
                    num:5,
                    sender:"나종현",
                    date:"2022.06.05 03:37",
                    time:30
                },
                {
                    storeName:"S-Oil",
                    code:"OL7",
                    num:2,
                    sender:"나종현",
                    date:"2022.06.05 03:37",
                    time:30
                },
                {
                    storeName:"주한장",
                    code:"FD6",
                    num:1,
                    sender:"나종현",
                    date:"2022.06.05 03:37",
                    time:30
                },
                {
                    storeName:"주한장",
                    code:"FD6",
                    num:1,
                    sender:"나종현",
                    date:"2022.06.05 03:37",
                    time:30
                },
                
            ],
            userTicketInfo:[
                {
                    storeName:"이디야 전북대점",
                    code:"CE7"
                },
                {
                    storeName:"파스꾸찌 전주DT점",
                    code:"CE7"
                },
                {
                    storeName:"주한장 전북대점",
                    code:"FD6"
                },
                {
                    storeName:"돈가스집",
                    code:"FD6"
                },
                {
                    storeName:"S-Oil",
                    code:"OL7"
                },
                {
                    storeName:"현대오일",
                    code:"OL7"
                },
                {
                    storeName:"E-Mart",
                    code:"MT1"
                }
            ]
         }
        },
        storeInfo:[]
    },
    effects:[
        localStorageEffect('mustParkingApp'),
    ]
})