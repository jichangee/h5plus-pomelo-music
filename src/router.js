import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import HomeLesson from './views/Home/lesson.vue'
import HomeTeacherDetail from './views/Home/teacher-detail.vue'
import HomeLessonDetail from './views/Home/lesson-detail.vue'
import HomeLessonComment from './views/Home/lesson-comment.vue'
import HomeArticle from './views/Home/article.vue'

import Evaluation from './views/Evaluation'
import EvaluationArticle from './views/Evaluation/article'
import EvaluationShareArticle from './views/Evaluation/share-article.vue'
import EvaluationVideo from './views/Evaluation/video'
import EvaluationVideoPubilsh from './views/Evaluation/video-pubilsh'

import Show from './views/Show'
import ShowPubilsh from './views/Show/pubilsh'


import Mall from './views/Mall'
import MallDetail from './views/Mall/detail'
import MallOrderConfirm from './views/Mall/order-confirm'
import MallOrderFinish from './views/Mall/order-finish'
import MallOrderPay from './views/Mall/order-pay'
import MallCategory from './views/Mall/category'
import MallOrder from './views/Mall/order'
import MallOrderDetail from './views/Mall/order-detail'

import AddressEdit from './views/Address/edit'

import My from './views/My'
import MyProfile from './views/My/profile'
import MyNotify from './views/My/notify'
import MyAssets from './views/My/assets'
import MySetting from './views/My/setting'
import MySettingBlack from './views/My/setting-black'
import MySettingSafety from './views/My/setting-safety'
import MySettingSafetyMobile from './views/My/setting-safety-mobile'
import MySettingFeedback from './views/My/setting-feedback'
import MySettingAbout from './views/My/setting-about'
import MySettingAuth from './views/My/setting-auth'
import MySettingAuthIden from './views/My/setting-auth-iden'

import Passport from './views/Passport'
import PassportMobile from './views/Passport/mobile'
import PassportSMS from './views/Passport/sms'

import User from './views/User'
import UserLike from './views/User/like'
import UserFollow from './views/User/follow'

import Search from './views/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/evaluation'
    },
    {
      path: '/show/index',
      mame: '柚秀',
      component: Show,
    },
    {
      path: '/show/index/pubilsh',
      mame: '柚秀',
      component: ShowPubilsh,
    },
    {
      path: '/home',
      name: '首页',
      component: Home
    },
    {
      path: '/home/lesson',
      name: '全部课程',
      component: HomeLesson
    },
    {
      path: '/home/teacher/detail/:id',
      name: '讲师详情',
      component: HomeTeacherDetail
    },
    {
      path: '/home/lesson/detail/:id',
      name: '课程详情',
      component: HomeLessonDetail
    },
    {
      path: '/home/lesson/comment/:id',
      name: '课程评论',
      component: HomeLessonComment
    },
    {
      path: '/home/article/:id',
      name: '专题',
      component: HomeArticle
    },

    {
      path: '/evaluation',
      mame: '测评',
      component: Evaluation,
    },
    {
      path: '/evaluation/article/:id',
      mame: '测评文章',
      component: EvaluationArticle,
    },
    {
      path: '/evaluation/share/article/:id',
      name: '测评文章',
      component: EvaluationShareArticle
    },
    {
      path: '/evaluation/video/detail/:id',
      mame: '测评视频',
      component: EvaluationVideo,
    },
    {
      path: '/evaluation/video/pubilsh',
      mame: '测评视频 - 发布',
      component: EvaluationVideoPubilsh,
    },
    {
      path: '/mall',
      mame: '商城',
      component: Mall,
    },
    {
      path: '/mall/detail/:id',
      mame: '商品详情',
      component: MallDetail,
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: '/mall/detail/order/confirm',
      mame: '确认订单',
      component: MallOrderConfirm,
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: '/mall/detail/order/pay',
      mame: '选择支付',
      component: MallOrderPay,
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: '/mall/detail/order/finish/:id',
      mame: '完成支付',
      component: MallOrderFinish,
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: '/mall/category/:id',
      mame: '全部商品',
      component: MallCategory,
    },
    {
      path: '/mall/order',
      mame: '我的订单',
      component: MallOrder,
    },
    {
      path: '/mall/order/:id',
      mame: '订单详情',
      component: MallOrderDetail,
    },
    {
      path: '/address/edit',
      mame: '收货地址',
      component: AddressEdit,
      meta: {
        notKeepAlive: true
      }
    },

    {
      path: '/my',
      mame: '我的',
      component: My,
    },
    {
      path: '/my/profile',
      mame: '编辑资料',
      component: MyProfile,
    },
    {
      path: '/my/notify',
      mame: '通知中心',
      component: MyNotify,
    },
    {
      path: '/my/assets',
      mame: '我的资产',
      component: MyAssets,
    },
    {
      path: '/my/setting',
      mame: '设置',
      component: MySetting,
    },
    {
      path: '/my/setting/black',
      mame: '设置-黑名单',
      component: MySettingBlack,
    },
    {
      path: '/my/setting/safety',
      mame: '设置-账号安全',
      component: MySettingSafety,
    },
    {
      path: '/my/setting/safety/mobile',
      mame: '设置-账号安全-更换手机',
      component: MySettingSafetyMobile,
    },
    {
      path: '/my/setting/feedback',
      mame: '设置-反馈',
      component: MySettingFeedback,
    },
    {
      path: '/my/setting/about',
      mame: '设置-关于我们',
      component: MySettingAbout,
    },
    {
      path: '/my/setting/auth',
      mame: '设置-认证',
      component: MySettingAuth,
    },
    {
      path: '/my/setting/auth/iden',
      mame: '设置-认证-身份',
      component: MySettingAuthIden,
    },

    {
      path: '/passport/index',
      mame: '登录',
      component: Passport,
    },
    {
      path: '/passport/mobile',
      mame: '手机登录',
      component: PassportMobile,
    },
    {
      path: '/passport/sms',
      mame: '手机验证码',
      component: PassportSMS,
    },
    {
      path: '/search/index',
      mame: '搜索',
      component: Search,
    },
    {
      path: '/home/user/:id',
      mame: '用户中心',
      component: User,
    },
    {
      path: '/home/user/like/:id',
      mame: 'Ta的关注',
      component: UserLike,
    },
    {
      path: '/home/user/follow/:id',
      mame: 'Ta的粉丝',
      component: UserFollow,
    },
  ]
  // routes: [
  //   {
  //     path: '/evaluation/share/article/:id',
  //     name: '测评文章',
  //     component: EvaluationShareArticle
  //   }
  // ]
})
