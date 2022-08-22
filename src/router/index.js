import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Scan from "@/views/patient/Scan";
import Account from "@/views/Account";
import Guilde from "@/views/patient/Guilde";
import Profile from "@/views/patient/Profile";
import Reserve from "@/views/patient/Reserve";
import NotFound from "@/views/NotFound";
import Fee from "@/views/patient/Fee";
import EditProfile from "@/views/patient/EditProfile";
import PChat from "@/views/patient/PChat";
import Doctor from "@/views/doctor/Doctor";
import Prescription from "@/views/doctor/Prescription";
import Patient from "../views/patient/Patient";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Patient',
    component: Patient
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/patient/About.vue')
    }
  },
    {
      path:'/scan',
      name:'Scan',
      component:Scan
    },
    {
      path:'/account',
      name:'Account',
      component:Account,
    },
    {
      path:'/guilde',
      name:'Guilde',
      component:Guilde
    }
    ,{
      path:'/reserve',
      name:'Reserve',
      component:Reserve
    },
    {
      path:'/fee',
      name:"Fee",
      component: Fee
    },
    {
      path:'/profile',
      name:'Profile',
      component:Profile
    },
    {
      path:'/editp',
      name:'EditProfile',
      component: EditProfile
    },
    {
      path:'/chat',
      name:'PChat',
      component: PChat,
    },
    {
      path:'/doctor',
      name:'Doctor',
      component: Doctor,
    },
    {
      path:'/order',
      name:'Prescription',
      component: Prescription
    },
    {
      path:'/404',
      name:'NotFound',
      component: NotFound
    },
    {
      path:'*',
      redirect:{
        name:"NotFound"
      }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
