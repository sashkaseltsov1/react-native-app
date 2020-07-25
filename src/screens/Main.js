import React from 'react';
import Categories from "./Categories";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Products from "./Products";
import AccessDenied from "./AccessDenied";
import AuthContext from "../context/Auth-context";

const Tab = createMaterialTopTabNavigator();

export default function Main({route}) {
    return (
        <AuthContext.Consumer>
            {value =>
                <Tab.Navigator>
                    <Tab.Screen name="Items" component={value.userData.isAuth ? Products : AccessDenied}/>
                    <Tab.Screen name="Categories" component={value.userData.isAuth ? Categories : AccessDenied}/>
                </Tab.Navigator>
            }
        </AuthContext.Consumer>
    );
}
