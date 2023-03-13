import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default {
    state: {
        // 菜单栏数据
        menuList: [],
        // 权限数据
        permList: [],
        hasRoute: false,
        // 标签栏数据
        editableTabsValue: 'AdminIndex',
        editableTabs: [{
            title: '首页',
            name: 'AdminIndex',

        }
        ],
    },

    mutations: {
        changeRouteStatus(state, hasRoute) {
            state.hasRoute = hasRoute
            sessionStorage.setItem("hasRoute", hasRoute)
        },
        setMenuList(state, menus) {
            state.menuList = menus
        },
        setPermList(state, authoritys) {
            state.permList = authoritys
        },

        addTabs(state,tab) {

            let index=state.editableTabs.findIndex(e=>e.name===tab.name )
            //如果没找到 才添加
            if(index===-1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name,
                });
            }

            state.editableTabsValue =tab.name;
        },

        ///清除状态
        resetState:(state)=>{
            state.menuList=[]
            state.permList=[]
            state.hasRoute=false
            state.editableTabsValue='AdminIndex'
            state. editableTabs= [{
                title: '首页',
                name: 'AdminIndex',

            }]
        }
    },
    actions: {

    },
};
