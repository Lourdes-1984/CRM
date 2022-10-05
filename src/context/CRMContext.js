import React, {useState} from 'react';

const CRMContext = React.createContext([{}, () => {} ]);


const CRMProvider = props => {
    //definir elñ state inicial
    const [state, setState] = useState({
        clientes:[],
        productos:[],
        pedidos: [],
        token : '',
        isLogin: false
    });
    return(
        <CRMContext.Provider value ={[state,setState]}>
            {props.children}
        </CRMContext.Provider>
    );
}


export {CRMContext , CRMProvider}