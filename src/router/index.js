import Vue from 'vue'
import Router from 'vue-router'
import InfiniteScroll from '@/components/InfiniteScroll'
import HelloWorld from '@/pages/HelloWorld'
import Task from '@/pages/Task'
import NewTask from '@/components/NewTask'
import NewDeliver from '@/components/NewDeliver'
import NewInstall from '@/components/NewInstall'
import NewTrain from '@/components/NewTrain'
import TaskDetail from '@/pages/TaskDetail'
import NewRecord from '@/pages/NewRecord'
import TaskFixDetail from '@/components/TaskFixDetail'
import FixRecords from '@/components/FixRecords'
import Empty from '@/pages/Empty'

import BindAnke from '@/pages/BindAnke'
import Main from '@/pages/Main'
import Devices from '@/components/Devices'
import DeviceDetail from '@/pages/DeviceDetail'

import Msg from '@/pages/Msg'
import MsgDetail from '@/pages/MsgDetail'

import MyMenu from '@/pages/MyMenu'
import Records from '@/pages/Records'
import ClientRecord from '@/pages/ClientRecord'
import SaleRecord from '@/pages/SaleRecord'
import SaleRegisterDateDetail from '@/pages/SaleRegisterDateDetail'

import NewClient from '@/pages/NewClient'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Empty
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/devices',
      name: 'Devices',
      component: Devices
    },
    {
      path: '/deviceDetail',
      name: 'DeviceDetail',
      component: DeviceDetail
    },
    {
      path: '/task/:id',
      name: 'Task',
      component: Task
    },
    {
      path: '/newTask',
      name:'NewTask',
      component: NewTask
    },
    {
      path: '/newDeliver/:id',
      name:'NewDeliver',
      component: NewDeliver
    },
    {
      path: '/newInstall/:id',
      name:'NewInstall',
      component: NewInstall
    },
    {
      path: '/newTrain/:id',
      name:'NewTrain',
      component: NewTrain
    },
    {
      path: '/scroll',
      name: 'Scroll',
      component: InfiniteScroll
    },
    {
      path: '/task-details/:id',
      name: 'TaskDetail',
      component: TaskDetail,
    },
    {
      path: '/task-details/:id/task-fix-detail/:fixId',
      name: 'TaskFixDetail',
      component: TaskFixDetail
    },
    {
      path: '/task-details/:id/fix-records',
      name: 'FixRecords',
      component: FixRecords
    },
    {
      path: '/new-record',
      name: 'NewRecord',
      component: NewRecord
    },
    {
      path: '/bind-anke',
      name: 'BindAnke',
      component: BindAnke
    },
    {
      path: '/Msg',
      name: 'Msg',
      component: Msg
    },
    {
      path: '/MsgDetail',
      name: 'MsgDetail',
      component: MsgDetail
    },
    {
      path: '/MyMenu',
      name: 'MyMenu',
      component: MyMenu
    },
    {
      path: '/records/:id',
      name: 'Records',
      component: Records
    },
    {
      path: '/ClientRecord',
      name: 'ClientRecord',
      component: ClientRecord
    },
    {
      path: '/SaleRecord',
      name: 'SaleRecord',
      component: SaleRecord
    },
    {
      path: '/SaleRegisterDateDetail',
      name: 'SaleRegisterDateDetail',
      component: SaleRegisterDateDetail
    },
    {
      path: '/NewClient',
      name: 'NewClient',
      component: NewClient
    }
  ]
  // mode: 'history'
})
